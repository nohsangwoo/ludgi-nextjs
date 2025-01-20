import type { Request, Response } from 'express'
import { getServerStatusSync } from '../helper/getServerStatusSyn'
import chalk from 'chalk'

// Express 라우터 핸들러
const ping = async (req: Request, res: Response) => {
  const serverReady = getServerStatusSync() // 상태 업데이트

  console.log(
    chalk.blue('serverReady check in ping api: '),
    chalk.green(serverReady ? 'true' : 'false'),
  )

  if (serverReady) {
    res.send('PONG')
  } else {
    res.send('Server is not ready')
  }
}

export default ping
