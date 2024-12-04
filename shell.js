module.exports = {
  config: {
    name: "shell",
    aliases: [],
    version: "1.0",
    author: "asta",
    role: 0,
    shortDescription: {
      en: "Executes a shell command and returns the output."
    },
    longDescription: {
      en: "Executes a shell command and returns the output. Use with caution!"
    },
    category: "system",
    guide: {
      en: "Use {p}shell <command> to execute a shell command."
    }
  },
  onStart: async function ({ api, message, event, args, usersData, threadsData }) {
    try {
      if (args.length === 0) {
        api.sendMessage("Please provide a shell command to execute.", event.threadID);
        return;
      }

      const command = args.join(" ");
      const output = await executeShellCommand(command);

      api.sendMessage(`Output:\n${output}`, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while executing the shell command.", event.threadID);
    }
  }
};

function executeShellCommand(command) {
  return new Promise((resolve, reject) => {
    const childProcess = require('child_process').exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout + stderr);
      }
    });
  });
}