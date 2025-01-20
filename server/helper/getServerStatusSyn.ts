import fs from 'fs'
import path from 'path'
const statusFilePath = path.join(process.cwd(), 'server-status.json')

export function getServerStatusSync(): boolean {
  try {
    const data = JSON.parse(fs.readFileSync(statusFilePath, 'utf-8'))
    return data.serverReady
  } catch (error) {
    console.error('❌ Failed to read server status:', error)
    return false
  }
}
