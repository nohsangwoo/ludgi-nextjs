import { NextApiRequest, NextApiResponse } from 'next'
import prometheusClient from '@/lib/server/prometheus'
import client from 'prom-client'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 요청이 시작될 때 타이머 시작
  // startTimer()는 나중에 호출될 때 경과 시간을 자동으로 계산
  const timer = (
    prometheusClient.httpRequestDurationMicroseconds as client.Histogram<string>
  ).startTimer()

  const customTimer = (
    prometheusClient.customApiLatency as client.Histogram<string>
  ).startTimer()

  try {
    // 실제 API 비즈니스 로직
    res.status(200).json({ message: 'API is working!' })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  } finally {
    // API 처리가 완료된 후(성공/실패 모두) 타이머 종료
    // 메트릭에 요청 방법, 경로, 상태 코드와 함께 소요 시간 기록
    timer({
      // labelNames에 정의된 레이블과 일치해야함
      method: req.method || 'UNKNOWN',
      route: '/api/example',
      status_code: res.statusCode.toString(),
    })

    customTimer({
      // labelNames에 정의된 레이블과 일치해야함
      method: req.method || 'UNKNOWN',
      api_name: '/api/example',
    })
  }
}
