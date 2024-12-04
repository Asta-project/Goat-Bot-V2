module.exports = {
  config: {
    name: "leave",
    aliases: [],
    version: "1.0",
    author: "Tawsif",
    role: 2,
    shortDescription: "Makes the bot leave the group",
    longDescription: "Makes the bot leave the group",
    category: "Moderation",
  },
  onStart: async function ({ api, message, event, args, usersData, threadsData }) {
    try {
      api.sendMessage("Goodbye!", event.threadID);
      api.leaveGroup(event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while leaving the group", event.threadID);
    }
  }
};