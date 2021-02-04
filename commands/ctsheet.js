const globals = require('../globals.js');

module.exports = {
  name: 'ctsheet',
  description: 'CT write your damn sheet!',
  execute(msg, args) {
    if (typeof args == 'undefined') {
      if (globals.ctflag) {
        //msg.reply(':CTSheet:, test');
        msg.channel.send(globals.ctsheet);
      }
    } else if (msg.author.discriminator == globals.ctdiscrim) {
      msg.channel.send(globals.ctsheet);
      return;
    } else if (args[0] == 'on') {
      globals.ctflag = true;
      //msg.reply('Now telling CT to write his sheet.');
      msg.channel.send('Now telling CT to write his sheet.');
    } else if (args[0] == 'off') {
      globals.ctflag = false;
      //msg.reply('Stopping telling CT to write his sheet.');
      msg.channel.send('Now stopping telling CT to write his sheet.');
    } else {
      msg.reply('Arguments must either be on or off!');
      //msg.channel.send('Arguments must either be on, off, or none!');
    }
  },
};
