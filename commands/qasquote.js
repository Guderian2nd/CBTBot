const sentencer = require('sentencer');

module.exports = {
  name: 'qasquote',
  description: 'A quote from Qastiel, probably',
  execute(msg, args) {
    var coin = Math.random();
    if (coin < 0.5) {
      var noun = sentencer.make('{{ noun }}');
      if (coin < 0.25) {
        msg.channel.send(`\"I once dated a girl who liked ${noun}(s), so I hate ${noun}(s).\" - Qastiel`);
      } else {
        msg.channel.send(`\"I once dated a girl who liked ${noun}(s), so ${noun}(s) are dumb.\" - Qastiel`);
      }
    } else {
      var an_adjective = sentencer.make('{{ an_adjective }}');
      var adjective = an_adjective.split(/ +/g);
      msg.channel.send(`\"I once dated ${an_adjective} girl, so I hate ${adjective[1]} people.\" - Qastiel`);
    }
  },
};
