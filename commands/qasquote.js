const randomWord = require('random-word');

module.exports = {
  name: 'qasquote',
  description: 'A quote from Qastiel, probably',
  execute(msg, args) {
    var word1 = randomWord();
    // var word2 = randomWord();
    // msg.reply(`\"I once dated a girl who liked ${word1}(s), so ${word1}(s) are good.\" - Qastiel`);

    msg.channel.send(`\"I once dated a girl who liked ${word1}(s), so ${word1}(s) are dumb.\" - Qastiel`);
  },
};
