const os = require('os');
const si = require('systeminformation');

module.exports = {
  config: {
    name: "stats",
    aliases: [],
    version: "1.0",
    author: "Asta ichiyukimøri",
    role: 0,
    shortDescription: {
      en: "Displays bot stats and system information"
    },
    longDescription: {
      en: "Displays bot stats, system information, and uptime."
    },
    category: "system",
    guide: {
      en: "Use {p}stats to display bot stats and system information."
    }
  },
  onStart: async function ({ api, message, event, args, usersData, threadsData }) {
    try {
      const latency = Date.now() - message.timestamp;
      const sysInfo = await si.system();
      const cpuInfo = await si.cpu();
      const memInfo = await si.mem();
      const nodeInfo = process.versions.node;
      const v8Info = process.versions.v8;
      const users = await User.countDocuments();
      const report = ` ╭━━━〔 Bot Status 〕━━━╮ 
│ 
• Latency: ${latency}ms 
• Uptime: ${formatUptime(process.uptime() * 1000)} 
• CPU Cores: ${os.cpus().length} 
• CPU Model: ${cpuInfo.model} 
• CPU Speed: ${cpuInfo.speed} GHz 
│ 
╰━━━〔 Bot Status 〕━━━╯ 
╭━━━〔 Memory Usage 〕━━━╮ 
│ 
• Total: ${formatBytes(memInfo.total)} 
• Used: ${formatBytes(memInfo.active)} 
• Free: ${formatBytes(memInfo.free)} 
│ 
╰━━━〔 Memory Usage 〕━━━╯ 
╭━━━〔 System Info 〕━━━╮ 
│ 
• Platform: ${os.platform()} (${os.arch()}) 
• Hostname: ${os.hostname()} 
• Node.js: ${nodeInfo} 
• V8 Engine: ${v8Info} 
• OS: ${getOSInfo()} 
│ 
╰━━━〔 System Info 〕━━━╯ 
╭━━━〔 Bot Information 〕━━━╮ 
│ 
• Admin: "https://www.facebook.com/femi.gbemi.58"
│ 
╰━━━〔 Bot Information 〕━━━╯ `;

      let msg = await message.reply("LOADING.\n[█▒▒▒▒▒▒▒▒▒]");
      await new Promise(resolve => setTimeout(resolve, 800));
      await api.editMessage("LOADING...\n[████▒▒▒▒▒▒]", msg.messageID);
      await new Promise(resolve => setTimeout(resolve, 800));
      await api.editMessage("LOADING...\n[████████▒▒]", msg.messageID);
      await new Promise(resolve => setTimeout(resolve, 800));
      await api.editMessage("LOADING...\n[██████████]", msg.messageID);
      await new Promise(resolve => setTimeout(resolve, 800));
      await api.editMessage(report, msg.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while retrieving data.", event.threadID);
    }
  }
};

function formatBytes(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${units[index]}`;
}

function formatUptime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  return `${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`;
}

function getOSInfo() {
  return `${os.type()} ${os.release()} ${os.arch()}`;
}