const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

const API_ENDPOINT = "https://discord.com/api/v9";
const SERVER_ID = "1094627813367230615";
const CHANNEL_ID = "1094627814088658977";
const APPLICATION_ID = "936929561302675456";
const SALAI_TOKEN =
  "a923859f34c4a9da6845dc94c41b43da094dbdd1634be72fab9147cdb718e35d";
  const prompt = interaction.options.getString("prompt");


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
      application_id: "936929561302675456",
      guild_id: SERVER_ID,
      channel_id: CHANNEL_ID,
      session_id: "2fb980f65e5c9a77c96ca01f2c242cf6",
      data: {
        version: "1077969938624553050",
        id: "938956540159881230",
        name: "imagine",
        type: 1,
        options: [
          {
            type: 3,
            name: "prompt",
            value: prompt,
          },
        ],
        application_command: {
          id: "938956540159881230",
          application_id: APPLICATION_ID,
          version: "1077969938624553050",
          default_permission: true,
          default_member_permissions: null,
          type: 1,
          nsfw: false,
          name: "imagine",
          description: "Create images with Midjourney",
          dm_permission: true,
          options: [
            {
              type: 3,
              name: "prompt",
              description: "The prompt to imagine",
              required: true,
            },
          ],
        },
        attachments: [],
      },
    };
    

    try {
      // Send the HTTP POST request to the Discord API
      const response = await axios.post(`${API_ENDPOINT}/interactions`, payload, {
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
