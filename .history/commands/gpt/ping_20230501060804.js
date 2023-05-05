const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    await interaction.reply(
      "Pong!Dino Ipsum is a lorem ipsum for dinosaur lovers and anyone who needs meaningless filler text for prototyping web pages. Dino Ipsum provides a RESTful API ..."
    );
  },
};
