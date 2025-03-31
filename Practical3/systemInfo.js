import os from 'os';
import fs from 'fs';
import path from 'path';

// Get system information
const systemInfo = {
    osType: os.type(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    cpuInfo: os.cpus(),
};

// Format system info as text
const systemInfoText = `
OS Type: ${systemInfo.osType}
Total Memory: ${systemInfo.totalMemory} bytes
Free Memory: ${systemInfo.freeMemory} bytes
CPU Details: ${JSON.stringify(systemInfo.cpuInfo, null, 2)}
`;

// Ensure logs directory exists
const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Save system info to a log file
const logFilePath = path.join(logDir, 'system-info.txt');
fs.writeFileSync(logFilePath, systemInfoText);

console.log("✅ System information saved to:", logFilePath);
console.log(systemInfoText);
