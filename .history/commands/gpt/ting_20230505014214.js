cconst { SlashCommandBuilder } = require("discord.js");
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
      
  if (command === 'ting') {
    const midjourneyChannel = client.channels.cache.find(channel => channel.name === 'midjourney');
    if (!midjourneyChannel) return console.log('Cannot find midjourney channel');

    // get input prompt
    const filter = m => m.author.id === message.author.id;
    message.channel.send('Please enter your prompt: ');
    const collected = await message.channel.awaitMessages({ filter, max: 1, time: 10000, errors: ['time'] });
    const prompt = collected.first().content;

    // send prompt to midjourney channel
    midjourneyChannel.send(`Prompt from ${message.author.username}: ${prompt}`);
  }

  if (command === 'imagine') {
    // check if command was invoked in midjourney channel
    if (message.channel.name !== 'midjourney') return console.log('Cannot execute prompt in this channel');

    // get prompt from previous message
    const prompt = message.reference?.messageID && await message.channel.messages.fetch(message.reference.messageID).then(msg => msg.content);

    // execute prompt
    console.log(`Executing prompt: ${prompt}`);
  }
});

client.login('a923859f34c4a9da6845dc94c41b43da094dbdd1634be72fab9147cdb718e35d');
}