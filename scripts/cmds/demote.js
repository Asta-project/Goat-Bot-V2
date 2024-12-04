module.exports = {
  config: {
    name: "demote",
    aliases: [],
    version: "1.0",
    author: "asta ichiyukimøri",
    role: 2,
    shortDescription: "Demotes an admin to a regular user",
    longDescription: "Demotes an admin to a regular user",
    category: "Moderation",
  },
  onStart: async function ({ api, message, event, args, usersData, threadsData }) {
    try {
      if (args.length === 0) {
        api.sendMessage("Please mention the admin you want to demote", event.threadID);
        return;
      }

      const mention = args[0];
      const userId = mention.replace("@", "");

      api.removeAdminFromGroup(userId, event.threadID);
      api.sendMessage(`@${userId} has been demoted to a regular user`, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while demoting the admin", event.threadID);
    }
  }
};