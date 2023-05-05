const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

const API_ENDPOINT = "https://discord.com/api/v9";
const SERVER_ID = "1094627813367230615";
const CHANNEL_ID = "1094627814088658977";
const APPLICATION_ID = "936929561302675456";
const SALAI_TOKEN =
  "a923859f34c4a9da6845dc94c41b43da094dbdd1634be72fab9147cdb718e35d";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("generate")
    .setDescription("Proxy for Mid-Journey /imagine")
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("description of the image you want to generate")
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const prompt = interaction.options.getString("prompt");
      console.log(prompt);

      // Construct the payload to send to the Discord API
      const payload = {
        type: 2,
        data: {
          content: "Your image is being prepared, please wait a moment...",
        },
      };

      // Send the HTTP POST request to the Discord API
      const response = await axios.post(
        `${API_ENDPOINT}/interactions/${interaction.id}/${interaction.token}/callback`,
        payload,
        {
          headers: {
            Authorization: `Bot ${SALAI_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 400) {
        console.error(response.data);
        await interaction.reply("Request has failed; please try again later.");
      }
    } catch (error) {
      console.error(error);
      await interaction.reply("An error occurred; please try again later.");
    }
  },
};
