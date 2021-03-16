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
function convertTZ(date, tzString) {
  return new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', {timeZone: tzString}));   
}

bot.on('ready', () => {
  console.log('I am ready!');

  globals.ctflag = false;
  // let tmp = new Date();
  globals.catoday = 0;

  globals.tfacounter = new Date();
});

function checkStates(message) {
  let flag = false;
  if (globals.ctflag) {
    if (message.author.discriminator == globals.ctdiscrim) {
      const command = 'ctsheet';
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
      const command = 'gudsleep';
      console.info(`Called command: ${command}`);
      bot.commands.get(command).execute(message);
      flag = true
    }
  }
  if (message.author.discriminator == globals.catodiscrim) {
    var tmp = new Date();
    if (globals.catoday != (convertTZ(tmp, 'Europe/Berlin')).getDate()) {
      globals.catoday = (convertTZ(tmp, 'Europe/Berlin')).getDate();
      const command = 'catopostturn';
      console.info(`Called command: ${command}, date = ${globals.catoday}`);
      bot.commands.get(command).execute(message);
      flag = true
    }
  }

  var now = new Date();
  if (now.getTime() - globals.tfacounter.getTime() > 1000 ) {
    for (var keyword in globals.tfakeywords) {
      if (message.content.includes(keyword)) {
        const command = 'tfaclock';
        console.info(`Called command: ${command}`);
        bot.commands.get(command).execute(message, true);
        flag = true
      }
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