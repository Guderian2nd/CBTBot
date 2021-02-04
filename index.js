require('dotenv').config(); 
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require('./commands');

const TOKEN = process.env.TOKEN;

const globals = require('./globals.js');

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

globals.ctflag = false;

bot.on('ready', () => {
  console.log('I am ready!');
});
function checkStates(message) {
  let flag = false;
  if (globals.ctflag) {
    if (message.author.discriminator == globals.ctdiscrim) {
      const command = 'ctsheet'
      console.info(`Called command: ${command}`);
      bot.commands.get(command).execute(message);
      flag = true
    }
  }
  if (message.author.discriminator == globals.guddiscrim) {
    var date = new Date();
    var hours = date.getUTCHours();
    hours = (hours + 9) % 24;

    if (2 <= hours && hours <= 7) {
      const command = 'gudsleep'
      console.info(`Called command: ${command}`);
      bot.commands.get(command).execute(message);
      flag = true
    }
  }
  return flag;
}

bot.on('message', msg => {
  if (msg.author.bot) return;
  if (msg.content.indexOf(process.env.PREFIX) !== 0) {
    checkStates(msg);
    return;
  }

  const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  console.info(`Called command: ${command}`);

  if (!bot.commands.has(command)) return;

  try {
    bot.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('there was an error trying to execute that command!');
  }
}
);

bot.login(TOKEN);