const globals = require('../globals.js');
function convertTZ(date, tzString) {
  return new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', { timeZone: tzString }));
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


module.exports = {
  name: 'stevdraw',
  description: 'Tells stev to draw something at 8PM PST. Automatically called at start of day.',
  execute(client, args) {
    if (typeof args == 'undefined')
    {
      const tmp = client.user.discriminator;
      if (tmp === '8715') 
      {
        console.log(`stev client is ready`);
        if (typeof client.stevinterval == 'undefined')
        {
          console.log('no existing interval');
          client.stevinterval = setInterval( () =>
          {
            let thedate = new Date();
            thedate = convertTZ(thedate, 'America/Los_Angeles');
            if ( thedate.getHours() === 20 && thedate.getMinutes() === 0)
            {
              if (globals.stevdrawflag)
              {
                globals.drawchannel.send(`${globals.stevuser}, okay i see that u posted something today with an attached image which may or may not be something you drew but i'm still gonna tell u to draw`);
              }
              else 
              {
                const randnum = getRandomInt(0,3);
                switch (randnum)
                {
                  case 0 :
                    globals.drawchannel.send(`${globals.stevuser}, if you don't draw something reaps will cuck your non-existent gf`);
                    break;
                  case 1 :
                    globals.drawchannel.send(`${globals.stevuser}, ct could probably write more sheets in the time in takes u to draw something`);
                    break;
                  case 2 :
                    globals.drawchannel.send(`${globals.stevuser}, at this rate cato will have the next boco update ready before you start drawing`);
                    break;
                  default :
                    globals.drawchannel.send(`${globals.stevuser}, go draw something u little bitch`);
                }
              }
              clearInterval(client.stevinterval);
            }
            console.log(`stev time check : ${thedate}`);
          }, 60000) // check every minute
        }
      }
    }
    else
    {
      if (client.author.id === globals.stevid)
      {
        if (client.channelId === globals.drawchannel.id)
        {
          if (client.attachments.size > 0) 
          {
            globals.stevdrawflag = true;
          }
        }
      }
    }
  },
};
