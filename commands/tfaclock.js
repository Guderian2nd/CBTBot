const globals = require('../globals.js');

module.exports = {
  name: 'tfaclock',
  description: 'X days since the last time CBT complained about TFA',
  execute(msg, args) {
    var date = new Date();
    var counter = date.getTime() - globals.tfacounter.getTime();
    counter = date.getTime() - globals.tfacounter.getTime();
    counter = counter / (1000 * 3600 * 24);
    counter = Math.floor(counter);

    if (args[0] == 'reset') {
      msg.channel.send(`CBT complained about TFA again! Resetting the clock...The record this time was ${counter} days.`);
      globals.tfacounter = date;
      msg.channel.send('0 days since the last time CBT complained about TFA.');
    }
    else {
      msg.channel.send(`${counter} days since the last time CBT complained about TFA.`);
    }
  },
};
