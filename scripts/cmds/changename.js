module.exports = {
  config: {
    name: "rename",
    aliases: ["ren"],
    version: "1.0",
    author: "asta ichiyukimøri",
    role: 2,
    shortDescription: "Renames the group",
    longDescription: "Renames the group",
    category: "Moderation",
  },
  onStart: async function ({ api, message, event, args, usersData, threadsData }) {
    try {
      if (args.length === 0) {
        api.sendMessage("Please provide a new name for the group", event.threadID);
        return;
      }

      const newName = args.join(" ");
      await api.changeThreadName(event.threadID, newName);
      api.sendMessage(`Group name changed to: ${newName}`, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while renaming the group", event.threadID);
    }
  }
};