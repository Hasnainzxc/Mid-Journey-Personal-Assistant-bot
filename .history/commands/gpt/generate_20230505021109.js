const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

const API_ENDPOINT = "https://discord.com/api/v9";
const SERVER_ID = "1094627813367230615";
const CHANNEL_ID = "1094627814088658977";
const APPLICATION_ID = "936929561302675456";
const SALAI_TOKEN = "a923859f34c4a9da6845dc94c41b43da094dbdd1634be72fab9147cdb718e35d";

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

    if (interaction.guildId !== SERVER_ID) {
      console.error(`Request is not going to server ID ${SERVER_ID}`);
      return await interaction.reply(
        "Request has failed; please try again later."
      );
    }

    const channel = interaction.guild.channels.cache.get(interaction.channelId);
    if (!channel || channel.id !== CHANNEL_ID) {
      console.error(`Request is not going to channel ID ${CHANNEL_ID}`);
      return await interaction.reply(
        "Request has failed; please try again later."
      );
    }

    if (interaction.applicationId !== APPLICATION_ID) {
      console.error(`Request is not using application ID ${APPLICATION_ID}`);
      return await interaction.reply(
        "Request has failed; please try again later."
      );
    }

    // Construct the payload to send to the Discord API
    const payload = {
      type: 2,
      application_id: APPLICATION_ID,
      guild_id: SERVER_ID,
      channel_id: CHANNEL_ID,
      session_id: interaction.id,
      data: {
        version: "1077969938624553050",
        id: interaction.id,
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
          id: interaction.id,
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
      await interaction.reply(
        "Request has failed; please try again later."
      );
    }
  },
};
