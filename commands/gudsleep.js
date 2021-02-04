const globals = require('../globals.js');

module.exports = {
  name: 'gudsleep',
  description: 'Guderian go to sleep',
  execute(msg, args) {
    if (typeof args == 'undefined') {
        msg.channel.send(globals.koreanworkinghours);
    }
  },
};
