
**Prometheus를 활용한 HTTP API 모니터링 강의 스크립트**를 작성한 예시입니다. 이 내용은 **Prometheus**와 **Next.js**를 활용해 API 호출 데이터를 수집하고 시각화하는 과정을 설명하는 데 중점을 둡니다.

---

## **Prometheus를 활용한 HTTP API 모니터링**

### **1. 개요**

이번 강의에서는 **Prometheus**와 **Next.js**를 활용하여 HTTP API의 요청 데이터를 수집하고 모니터링하는 방법을 배웁니다.  
이를 통해 API의 요청 횟수, 처리 시간, 상태 코드 등을 실시간으로 관찰할 수 있습니다.

---

### **2. Prometheus란?**

- Prometheus는 **오픈 소스 모니터링 및 경고 시스템**입니다.
- 주기적으로 데이터를 **Pull 방식**으로 수집하여 분석하거나 시각화할 수 있습니다.
- 이번 강의에서는 Prometheus가 HTTP API 데이터를 수집하고, Grafana를 사용해 데이터를 시각화합니다.

---

### **3. 환경 설정**

1. **Next.js API 준비**:

   - Next.js에서 `/api/example`이라는 엔드포인트를 생성하여 Prometheus가 데이터를 수집할 수 있도록 준비합니다.
   - 메트릭 데이터는 `/api/metrics` 엔드포인트를 통해 제공됩니다.

2. **Prometheus 설정**:

   - Prometheus는 `prometheus.yml` 설정 파일을 통해 `/api/metrics` 데이터를 수집합니다.
   - 설정 예:
     ```yaml
     scrape_configs:
       - job_name: 'nextjs'
         static_configs:
           - targets: ['ludgi-app:2000']
         metrics_path: '/api/metrics'
     ```

3. **Grafana 연동**:
   - Grafana는 Prometheus 데이터를 활용해 요청 횟수, 처리 시간, 상태 코드 등의 시각화를 제공합니다.

---

### **4. 요청 데이터 수집**

#### **API 예제**

`/api/example` 엔드포인트는 클라이언트가 요청할 때마다 Prometheus 메트릭을 기록합니다.

코드 예:

```javascript
import { NextApiRequest, NextApiResponse } from 'next'
import prometheusClient from '@/lib/server/prometheus'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const end = prometheusClient.register
    .getSingleMetric('http_request_duration_seconds')
    ?.startTimer()

  try {
    res.status(200).json({ message: 'API is working!' })
    end?.({
      method: req.method,
      route: '/api/example',
      status_code: res.statusCode,
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
    end?.({
      method: req.method,
      route: '/api/example',
      status_code: 500,
    })
  }
}
```

---

### **5. Prometheus 메트릭 설명**

Prometheus가 수집하는 주요 메트릭은 다음과 같습니다:

#### **메트릭 이름: `http_request_duration_seconds`**

- Prometheus의 **Histogram 메트릭**으로 요청 처리 시간에 대한 정보를 제공합니다.
- 주요 세부 메트릭:
  1. **`http_request_duration_seconds_count`**:
     - 요청 횟수를 누적 기록합니다.
  2. **`http_request_duration_seconds_sum`**:
     - 요청 처리 시간의 합계를 제공합니다.
  3. **`http_request_duration_seconds_bucket`**:
     - 요청 처리 시간이 특정 범위(버킷)에 속하는 요청의 수를 기록합니다.

#### **실시간 데이터 확인**

Prometheus 웹 UI([http://localhost:9090](http://localhost:9090))에서 다음과 같은 쿼리를 통해 데이터를 확인할 수 있습니다:

1. 요청 횟수 확인:
   ```promql
   http_request_duration_seconds_count
   ```
2. 평균 처리 시간 계산:
   ```promql
   rate(http_request_duration_seconds_sum[5m]) / rate(http_request_duration_seconds_count[5m])
   ```

---

### **6. Grafana 대시보드 구성**

1. **Prometheus 데이터 소스 추가**:
   - Grafana에 Prometheus를 데이터 소스로 추가합니다:
     - URL: `http://ludgi-prometheus:9090`.
2. **대시보드 생성**:
   - 요청 횟수 시각화:
     - 쿼리: `http_request_duration_seconds_count`.
     - 시각화: **Bar Chart** 또는 **Time Series**.
   - 평균 요청 처리 시간 시각화:
     - 쿼리:
       ```promql
       rate(http_request_duration_seconds_sum[5m]) / rate(http_request_duration_seconds_count[5m])
       ```
     - 시각화: **Line Chart**.

---

### **7. HTTP 상태 코드 이해**

- API 요청마다 상태 코드가 기록됩니다. 일반적인 상태 코드는 다음과 같습니다:
  - **`200`**: 요청 성공.
  - **`304`**: 클라이언트가 캐시된 리소스를 사용했으며, 서버에서 데이터를 다시 보낼 필요가 없음.
  - **`4xx/5xx`**: 요청 실패(클라이언트/서버 에러).

Prometheus에서 상태 코드별 요청 분포를 확인하려면 다음 쿼리를 실행합니다:

```promql
http_request_duration_seconds_count{status_code=~"2.."}
```

---

### **8. 정리**

- Prometheus는 Next.js의 `/api/metrics`에서 데이터를 수집해 HTTP 요청에 대한 정보를 기록합니다.
- Grafana를 활용하면 요청 횟수, 처리 시간, 상태 코드 등을 직관적으로 확인할 수 있습니다.
- 이를 통해 시스템의 성능을 모니터링하고 병목 현상을 분석할 수 있습니다.

---

### **추가 설명 요청**

위 스크립트는 강의 자료로 사용할 수 있도록 간단히 정리한 내용입니다. 추가적으로 다루고 싶은 내용이나 수정이 필요하면 말씀해주세요! 😊
