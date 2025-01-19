import type { Request, Response } from 'express'

// Express 라우터 핸들러
const expresstest = async (req: Request, res: Response) => {
  res.send('Hello Express')
}

export default expresstest
