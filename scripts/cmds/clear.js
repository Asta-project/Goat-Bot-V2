module.exports = {
  config: {
    name: "purge",
    aliases: [],
    version: "1.0",
    author: "Tawsif",
    role: 2,
    shortDescription: "Deletes all messages in a thread",
    longDescription: "Deletes all messages in a thread",
    category: "Moderation",
  },
  onStart: async function ({ api, message, event, args, usersData, threadsData }) {
    try {
      api.sendMessage("Purging messages...", event.threadID);
      await api.deleteAllMessagesInThread(event.threadID);
      api.sendMessage("Messages purged!", event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while deleting messages", event.threadID);
    }
  }
};