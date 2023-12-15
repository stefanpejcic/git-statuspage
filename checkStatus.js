const fs = require('fs');
const axios = require('axios');

const domains = fs.readFileSync('domains.txt', 'utf-8').split('\n');

async function checkStatus() {
  for (const domain of domains) {
    try {
      const response = await axios.get(`https://${domain}`);
      const status = response.status === 200 ? 'OK' : 'UNKNOWN';
      fs.writeFileSync(`${domain}.txt`, status);
    } catch (error) {
      fs.writeFileSync(`${domain}.txt`, 'ERROR');
    }
  }
}

checkStatus();
