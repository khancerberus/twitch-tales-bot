import tmi from 'tmi.js';
import { envConfig } from './config/env'

let messages: string[] = [];

const client = new tmi.Client({
  channels: [envConfig().twitchChannel],
  options: {
    debug: false
  }
})

client.connect().catch(console.error);

client.on('connected', () => {
  console.log(`\n[+] Conectado a #${envConfig().twitchChannel}\n\n`);
  console.log('Esperando mensajes...\n');
});

client.on('message', (_channel, _tags, message, self) => {
  if (self) return; // Ignore messages from the bot
  if (message.includes('roier')) return;
  messages.push(message);
});

export const getMessages = () => {
    return messages;
}

export const clearMessages = () => {
    messages = [];
}