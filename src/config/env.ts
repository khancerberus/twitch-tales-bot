const {
  TWITCH_CHANNEL: twitchChannel,
  DISCORD_WEBHOOK_URL: discordWebhookUrl,
} = process.env;

if (!twitchChannel) {
  console.error('Error: TWITCH_CHANNEL environment variable is not set.');
  process.exit(1);
}

if (!discordWebhookUrl) {
  console.error('Error: DISCORD_WEBHOOK_URL environment variable is not set.');
  process.exit(1);
}

export const envConfig = () => ({
    twitchChannel,
    discordWebhookUrl
})