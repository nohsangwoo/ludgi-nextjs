const fs = require('fs');
const path = require('path');

const statusFilePath = path.join(process.cwd(), 'server-status.json');

function resetServerStatus() {
  const data = { serverReady: false };

  try {
    fs.writeFileSync(statusFilePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log('✅ Server status reset to false');
  } catch (error) {
    console.error('❌ Failed to reset server status:', error);
  }
}

resetServerStatus();
