const globals = require('../globals.js');

module.exports = {
  name: 'stevdraw',
  description: 'Tells stev to draw something at 8PM PST. Automatically called at start of day.',
  execute(client) {
    if (typeof client == 'Client') {
        client.setInterval( () =>
        {
          const thedate = new Date();
          thedate = convertTZ(thedate, 'America/Los_Angeles');
          if ( thedate.getHours() === 20 && thedate.getMinutes() === 0)
          {
            globals.drawchannel.send(`${globals.stevuser}, go draw something u little bitch`);
          }
          console.log(`stev time check : ${thedate}`);
        }, 60000) // check every minute
    }
  },
};
