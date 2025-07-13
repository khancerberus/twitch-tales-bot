import tmi from 'tmi.js';

const { Container } = require('@nlpjs/core');
const { SentimentAnalyzer } = require('@nlpjs/sentiment');
const { LangEs } = require('@nlpjs/lang-es');

const container = new Container();
container.use(LangEs);
const sentiment = new SentimentAnalyzer({ container });

const channel = process.env.TWITCH_CHANNEL;
if (!channel) {
  console.error('Error: TWITCH_CHANNEL environment variable is not set.');
  process.exit(1);
}

const INTERVAL = 30000;
let messages: string[] = []

const client = new tmi.Client({
  channels: [channel],
  options: {
    debug: false
  }
})

console.log('Bienvenido a la interfaz de TwitchTales Bot\n');
console.log(`Conectando al canal: ${channel}`);

client.connect().catch(console.error);

client.on('connected', (addr, port) => {
  console.log(`Conectado a ${addr}:${port} #${channel}`);
});

client.on('message', (_channel, _tags, message, self) => {
  if (self) return; // Ignore messages from the bot
  if (message.includes('roier')) return;
  messages.push(message);
});


setInterval(async () => {
  if (messages.length !== 0) {
    console.log(messages);
    
    const results = await Promise.all(messages.map(msg => sentiment.process({ locale: 'es', text: msg })))

    const positiveMessages = results.filter(result => result.sentiment.vote === 'positive').length;
    const negativeMessages = results.filter(result => result.sentiment.vote === 'negative').length;
    const neutralMessages = results.filter(result => result.sentiment.vote === 'neutral').length;

    console.log('positive:', positiveMessages);
    console.log('negative:', negativeMessages);
    console.log('neutral:', neutralMessages);

    const sentimentSum = positiveMessages - negativeMessages;

    if (sentimentSum > 0) {
      console.log(`Sentiment score: ${sentimentSum} (Positive) ${sentimentSum}`);
    }
    else if (sentimentSum < 0) {
      console.log(`Sentiment score: ${sentimentSum} (Negative) ${sentimentSum}`);
    }
    else {
      console.log(`Sentiment score: ${sentimentSum} (Neutral) ${sentimentSum}`);
    }
  }

  messages = []; // Clear messages after logging
}, INTERVAL);
