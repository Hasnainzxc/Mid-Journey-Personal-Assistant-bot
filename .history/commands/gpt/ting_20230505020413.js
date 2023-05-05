const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("TING")
    .setDescription("Replies with TING!"),
  async execute(interaction) {
    await interaction.reply(
      "TING!Dino RESTful API ..."
    );
  },
};
