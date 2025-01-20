import fs from 'fs';
import path from 'path';

const statusFilePath = path.join(process.cwd(), 'server-status.json');

export function updateServerStatusSync(status: boolean) {
    const data = { serverReady: status };
    try {
        fs.writeFileSync(statusFilePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`✅ Server status updated to: ${status}`);
    } catch (error) {
        console.error('❌ Failed to update server status:', error);
    }
}
