const globals = require('../globals.js');

module.exports = {
  name: 'catopostturn',
  description: 'Yet another day when Cato doesn\'t post the turn smh',
  execute(msg, args) {
    if (typeof args == 'undefined') {
        // msg.channel.send(globals.catonoturn);
    }
  },
};
