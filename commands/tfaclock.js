const globals = require('../globals.js');

module.exports = {
  name: 'tfaclock',
  description: 'X days since the last time CBT complained about TFA',
  execute(msg, args) {
    var date = new Date();
    var counter = date.getTime() - globals.tfacounter.getTime();
    counter = counter / (1000 * 3600 * 24);

    if (args[0] == true) {
      msg.channel.send('CBT complained about TFA again! Resetting the clock...');
      globals.tfacounter = date;
    }

    msg.channel.send(`${counter} days since the last time CBT complained about TFA.`);
  },
};
