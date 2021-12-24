const globals = require('../globals.js');
function convertTZ(date, tzString) {
  return new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', { timeZone: tzString }));
}

module.exports = {
  name: 'stevdraw',
  description: 'Tells stev to draw something at 8PM PST. Automatically called at start of day.',
  execute(client) {
    const tmp = client.user.discriminator;
    if (tmp === '8715') 
    {
      console.log(`stev client is ready`);
      if (typeof client.stevinterval == 'undefined')
      {
        console.log('no existing interval');
        client.stevinterval = setInterval( () =>
        {
          const thedate = new Date();
          thedate = convertTZ(thedate, 'America/Los_Angeles');
          if ( thedate.getHours() === 20 && thedate.getMinutes() === 0)
          {
            globals.drawchannel.send(`${globals.stevuser}, go draw something u little bitch`);
            clearInterval(client.stevinterval);
          }
          console.log(`stev time check : ${thedate}`);
        }, 60000) // check every minute
      }
    }
  },
};
