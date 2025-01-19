// Prometheus 클라이언트 라이브러리 임포트
import type { Registry, Histogram } from 'prom-client'
import * as promClient from 'prom-client'

// Prometheus 클라이언트의 커스텀 인터페이스 정의
// 우리가 사용할 메트릭들의 타입을 명시
interface CustomPrometheusClient {
  register: Registry // 모든 메트릭을 저장하고 관리하는 레지스트리
  httpRequestDurationMicroseconds: Histogram<string> // HTTP 요청 시간을 측정하는 히스토그램
  customApiLatency: Histogram<string> // 커스텀 API 응답 시간을 측정하는 히스토그램
}

// TypeScript에게 전역 객체(global)에 prometheusClient가 존재한다고 알림
declare global {
  // eslint-disable-next-line no-var
  var prometheusClient: CustomPrometheusClient | undefined
}

// 싱글톤 패턴: 클라이언트가 없을 때만 새로 생성
// Next.js가 개발 환경에서 여러 번 리로드되어도 단 하나의 인스턴스만 유지
if (!global.prometheusClient) {
  // Prometheus의 기본 메트릭 수집 설정
  // (메모리 사용량, CPU 사용량 등 Node.js 기본 메트릭)
  const collectDefaultMetrics = promClient.collectDefaultMetrics
  collectDefaultMetrics()

  // HTTP 요청 지속 시간을 측정하기 위한 커스텀 히스토그램 메트릭 정의
  const httpRequestDurationMicroseconds = new promClient.Histogram({
    name: 'http_request_duration_seconds', // 메트릭 이름
    help: 'Duration of HTTP requests in seconds', // 메트릭 설명
    labelNames: ['method', 'route', 'status_code'], // 레이블(태그)들
    buckets: [0.1, 0.2, 0.5, 1, 2, 5], // 측정할 시간 구간(초 단위)
  })

  const customApiLatency = new promClient.Histogram({
    name: 'my_api_response_time', // 커스텀 이름
    help: '우리 API의 응답 시간 측정',
    labelNames: ['api_name', 'method'],
    buckets: [0.1, 0.5, 1, 2],
  })

  // 전역 객체에 Prometheus 클라이언트 저장
  // 이렇게 하면 애플리케이션 전체에서 동일한 인스턴스 사용 가능
  global.prometheusClient = {
    ...promClient,
    httpRequestDurationMicroseconds,
    customApiLatency,
  } as CustomPrometheusClient
}

// 기존에 생성된 클라이언트가 있으면 그것을 사용하고,
// 없으면 새로운 promClient를 사용
export default (global.prometheusClient || promClient) as CustomPrometheusClient
