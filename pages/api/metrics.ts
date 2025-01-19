import type { NextApiRequest, NextApiResponse } from 'next';
import prometheusClient from '@/lib/server/prometheus';

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  try {
    // 비동기 메트릭 데이터를 처리
    const metrics = await prometheusClient.register.metrics();

    // 적절한 Content-Type 헤더 설정
    res.setHeader('Content-Type', prometheusClient.register.contentType);

    // 메트릭 데이터를 응답으로 반환
    res.end(metrics);
  } catch (error) {
    console.error('Error generating metrics:', error);
    res.status(500).send('Internal Server Error');
  }
}
