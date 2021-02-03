module.exports = {
  name: 'ctsheet',
  description: 'CT write your damn sheet!',
  execute(msg, args) {
    if (typeof args == 'undefined') {
      if (global.ctflag) {
        //msg.reply(':CTSheet:, test');
        msg.channel.send('<:CTSheet:779498877158031372>');
      }
    } else if (msg.author.discriminator == '2163') {
      msg.channel.send('<:CTSheet:779498877158031372>');
      return;
    } else if (args[0] == 'on') {
      global.ctflag = true;
      //msg.reply('Now telling CT to write his sheet.');
      msg.channel.send('Now telling CT to write his sheet.');
    } else if (args[0] == 'off') {
      global.ctflag = false;
      //msg.reply('Stopping telling CT to write his sheet.');
      msg.channel.send('Now stopping telling CT to write his sheet.');
    } else {
      msg.reply('Arguments must either be on or off!');
      //msg.channel.send('Arguments must either be on, off, or none!');
    }
  },
};
