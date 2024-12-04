module.exports = {
  config: {
    name: "tagall",
    aliases: ["tag"],
    version: "1.0",
    author: "asta ichiyukimøri",
    role: 2,
    shortDescription: "Tags all members in the group",
    longDescription: "Tags all members in the group",
    category: "Moderation",
  },
  onStart: async function ({ api, message, event, args, usersData, threadsData }) {
    try {
      const threadInfo = await api.getThreadInfo(event.threadID);
      const members = threadInfo.participantIDs;

      let tagList = "";
      for (const member of members) {
        tagList += `@${member} `;
      }

      api.sendMessage(`Hello everyone! ${tagList}`, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while tagging all members", event.threadID);
    }
  }
};