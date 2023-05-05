const { Client, Intents, MessageAttachment } = require("discord.js");
const axios = require("axios");
require("dotenv").config();



const SALAI_TOKEN = process.env.SALAI_TOKEN;
const MIDJOURNEY_CHANNEL_ID = "1094627814088658977"; // Replace with your channel ID

const command = {
  name: "generate",
  description: "Generate an image using Mid-Journey",
  options: [
    {
      name: "prompt",
      type: "STRING",
      description: "The prompt to use for generating the image",
      required: true,
    },
  ],
};

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand() || interaction.commandName !== "generate") {
    return;
  }

  const prompt = interaction.options.getString("prompt");

  try {
    const response = await axios.post(
      `https://discord.com/api/v9/channels/${MIDJOURNEY_CHANNEL_ID}/messages`,
      {
        content: `/imagine ${prompt}`,
      },
      {
        headers: {
          Authorization: `Bot ${SALAI_TOKEN}`,
        },
      }
    );

    const messageId = response.data.id;

    const filter = (message) =>
      message.author.id === "847439971553501992" &&
      message.content.startsWith("Here is your image");

    const collector = interaction.channel.createMessageCollector({
      filter,
      time: 15000,
    });

    collector.on("collect", (message) => {
      const attachments = message.attachments;
      if (attachments.size > 0) {
        const attachment = attachments.first();
        const attachmentUrl = attachment.url;
        const imageAttachment = new MessageAttachment(attachmentUrl);
        interaction.reply({ files: [imageAttachment] });
      } else {
        interaction.reply("Failed to generate image. Please try again later.");
      }
    });

    collector.on("end", (collected) => {
      if (collected.size === 0) {
        interaction.reply("Failed to generate image. Please try again later.");
      }
    });
  } catch (error) {
    console.error(error);
    interaction.reply("Failed to generate image. Please try again later.");
  }
});

client.login(process.env.DISCORD_TOKEN);
