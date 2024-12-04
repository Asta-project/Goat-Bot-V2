module.exports = {
  config: {
    name: "setimage",
    aliases: ["setimg"],
    version: "1.0",
    author: "Tawsif",
    role: 2,
    shortDescription: "Changes the group image",
    longDescription: "Changes the group image",
    category: "Moderation",
  },
  onStart: async function ({ api, message, event, args, usersData, threadsData }) {
    try {
      if (message.attachments.length === 0) {
        api.sendMessage("Please attach an image to change the group image", event.threadID);
        return;
      }

      const attachment = message.attachments[0];
      if (attachment.type !== "photo") {
        api.sendMessage("Please attach a photo to change the group image", event.threadID);
        return;
      }

      await api.changeThreadImage(event.threadID, attachment.url);
      api.sendMessage("Group image changed successfully!", event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while changing the group image", event.threadID);
    }
  }
};