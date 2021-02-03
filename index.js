require('dotenv').config(); 
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require('./commands');

const TOKEN = process.env.TOKEN;

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

global.ctflag = false;

function checkStates(message) {
  if (global.ctflag) {
    if (message.author.discriminator == '2163') {
      const command = 'ctsheet'
      console.info(`Called command: ${command}`);
      bot.commands.get(command).execute(message);
      return true;
    }
  }
  return false;
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