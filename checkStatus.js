const fs = require('fs');
const axios = require('axios');

const domains = fs.readFileSync('domains.txt', 'utf-8').split('\n');
let htmlContent = '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Status Page</title>\n  <style>\n    body {\n      font-family: Arial, sans-serif;\n      margin: 20px;\n    }\n\n    h1 {\n      color: #333;\n    }\n\n    ul {\n      list-style-type: none;\n      padding: 0;\n    }\n\n    li {\n      margin-bottom: 10px;\n    }\n  </style>\n</head>\n<body>\n  <h1>Status Page</h1>\n  <ul>\n';

async function checkStatus() {
  for (const domain of domains) {
    try {
      const response = await axios.get(`https://${domain}`);
      const status = response.status === 200 ? 'OK' : 'UNKNOWN';
      fs.writeFileSync(`${domain}.txt`, status);
      htmlContent += `    <li><span style="color: ${getStatusColor(status)};">${domain}:</span> <a href="${domain}.txt">Check Status</a></li>\n`;
    } catch (error) {
      fs.writeFileSync(`${domain}.txt`, 'ERROR');
      htmlContent += `    <li><span style="color: red;">${domain}:</span> Check Status</li>\n`;
    }
  }

  htmlContent += '  </ul>\n</body>\n</html>';
  fs.writeFileSync('index.html', htmlContent);
}

function getStatusColor(status) {
  if (status === 'OK') return 'green';
  if (status === 'UNKNOWN') return 'orange';
  return 'red';
}

checkStatus();
