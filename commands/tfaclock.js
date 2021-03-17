const globals = require('../globals.js');

module.exports = {
  name: 'tfaclock',
  description: 'X days since the last time CBT complained about TFA',
  execute(msg, args) {
    var date = new Date();
    var counter = date.getTime() - globals.tfacounter.getTime();
    counter = date.getTime() - globals.tfacounter.getTime();
    counter = counter / (1000 * 3600);
    counter = Math.floor(counter);

    var hours = counter % 24;
    var days = Math.floor(counter / 24)

    if (args[0] == 'reset') {
      msg.channel.send(`CBT complained about TFA again! Resetting the clock...The record this time was ${days} day(s), ${hours} hour(s).`);
      globals.tfacounter = date;
      msg.channel.send('0 day(s), 0 hour(s) since the last time CBT complained about TFA.');
    }
    else {
      msg.channel.send(`${days} day(s), ${hours} hour(s) since the last time CBT complained about TFA.`);
    }
  },
};
