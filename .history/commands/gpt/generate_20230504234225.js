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
    const prompt = interaction.options.getString("prompt");
    console.log(prompt);

    // Construct the payload to send to the Discord API
    const payload = {
      type: 2,
      application_id: APPLICATION_ID,
      guild_id: interaction.guildId,
      channel_id: interaction.channelId,
      data: {
        name: "imagine",
        options: [
          {
            name: "prompt",
            value: prompt,
          },
        ],
      },
    };
    const session_id = interaction.id;

    try {
      // Send the HTTP POST request to the Discord API
      const response = await axios.post(`${API_ENDPOINT}/interactions/${session_id}/${interaction.token}/callback`, payload, {
        headers: {
          Authorization: `Bot ${SALAI_TOKEN}`,
        },
      });
      console.log(response.data);
      await interaction.reply(
        "Your image is being prepared, please wait a moment..."
      );
    } catch (error) {
      console.error(error.response.data);
      await interaction.reply("Request has failed; please try again later.");
    }
  },
};
