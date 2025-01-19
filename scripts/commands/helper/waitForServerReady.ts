import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const PING_URL = `http://localhost:${PORT}/api/ping`;

const waitForServerReady = async () => {
  console.log(`🔄 Delaying server check by 2 seconds...`);
  await new Promise(resolve => setTimeout(resolve, 2000)); // 초기 2초 대기

  console.log(`🔄 Checking server status at ${PING_URL}...`);
  while (true) {
    try {
      const response = await axios.get(PING_URL);
      console.log('response: ', response.data);
      if (response.data === 'PONG') {
        console.log('✅ Server is ready!');
        break;
      }
    } catch (error) {
      console.log('❌ Server is not ready yet');
    }
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기
  }
};

export default waitForServerReady;
