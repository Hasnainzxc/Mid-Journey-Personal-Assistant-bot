const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ting")
    .setDescription("Replies with ting!"),
  async execute(interaction) {
    await interaction.reply(
      "Pong!Dino RESTful API ..."
    );
  },
};
