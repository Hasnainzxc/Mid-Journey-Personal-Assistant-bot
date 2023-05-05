const { Client, Intents } = require('discord.js');


const prefix = '/'; // prefix for commands

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

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
console.log(Intents)