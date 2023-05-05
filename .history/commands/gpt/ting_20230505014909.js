const { Client, Intents, MessageEmbed, Collection } = require("discord.js");
const axios = require("axios");

// Set up bot credentials
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const SERVER_ID = "YOUR_SERVER_ID_HERE";
const CHANNEL_ID = "YOUR_CHANNEL_ID_HERE";
const APPLICATION_ID = "YOUR_APPLICATION_ID_HERE";
const SALAI_TOKEN = "YOUR_SALAI_TOKEN_HERE";

// Create a collection to store prompts
const prompts = new Collection();

// Event listener: Bot is ready
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Event listener: Bot receives a message
client.on("messageCreate", async (message) => {
  // Ignore messages from bots and messages without mentions
  if (message.author.bot || !message.mentions.has(client.user.id)) return;

  // Parse message content
  const args = message.content.slice(client.user.id.length + 4).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "generate") {
    const prompt = args.join(" ");

    // Send prompt to Mid-Journey API
    const response = await axios.post(
      "https://api.salai.dev/imagine/v1/generate",
      {
        prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${SALAI_TOKEN}`,
        },
      }
    );

    // Send generated image to Discord channel
    const imageUrl = response.data.url;
    const embed = new MessageEmbed().setImage(imageUrl);
    message.channel.send({ embeds: [embed] });
  } else if (command === "ping") {
    message.reply("Pong!");
  } else if (command === "store") {
    const prompt = args.join(" ");

    // Store prompt in collection
    prompts.set(message.author.id, prompt);

    message.reply("Prompt stored!");
  } else if (command === "recall") {
    const prompt = prompts.get(message.author.id);

    if (!prompt) {
      message.reply("No prompt stored.");
      return;
    }

    // Send stored prompt to Discord channel
    const embed = new MessageEmbed().setDescription(`Prompt: ${prompt}`);
    message.channel.send({ embeds: [embed] });
  }
});

// Event listener: Bot receives an interaction
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = interaction.commandName;

  if (command === "ting") {
    const midjourneyChannel = interaction.guild.channels.cache.find(
      (channel) => channel.name === "midjourney"
    );
    if (!midjourneyChannel) {
      return interaction.reply("Cannot find midjourney channel");
    }

    // Get input prompt from user
    interaction.reply("Please enter your prompt: ");
    const filter = (m) => m.author.id === interaction.user.id;
    const collected = await interaction.channel.awaitMessages({
      filter,
      max: 1,
      time: 10000,
      errors: ["time"],
    });
    const prompt = collected.first().content;

    // Send prompt to midjourney channel
    midjourneyChannel.send(`Prompt from ${interaction.user.username}: ${prompt}`);
  } else if (command === "imagine") {
    // Check if command was invoked in midjourny 
    const midjourneyChannel = interaction.guild.channels.cache.find(
        (channel) => channel.name === "midjourney"
        );
        if (!midjourneyChannel) {
            return interaction.reply("Cannot find midjourney channel");
        }
    }
};

