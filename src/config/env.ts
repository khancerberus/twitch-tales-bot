const {
    NODE_ENV: nodeEnv = 'development',
    TWITCH_CHANNEL: twitchChannel,
    OPENAI_API_KEY: openaiApiKey,
    DISCORD_WEBHOOK_URL: discordWebhookUrl,
} = process.env;

if (!twitchChannel) {
  console.error('Error: TWITCH_CHANNEL environment variable is not set.');
  process.exit(1);
}

if (!openaiApiKey) {
  console.error('Error: OPENAI_API_KEY environment variable is not set.');
  process.exit(1);
}

if (!discordWebhookUrl) {
  console.error('Error: DISCORD_WEBHOOK_URL environment variable is not set.');
  process.exit(1);
}

export const envConfig = () => ({
    nodeEnv,
    twitchChannel,
    openaiApiKey,
    discordWebhookUrl
})