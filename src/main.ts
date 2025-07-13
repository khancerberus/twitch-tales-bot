import { generateStory } from './storyteller'
import { analyzeSentiment } from './sentimentAnalyzer'
import { StorySentimentType } from './types/story'
import { StoryContext } from './config/consts'
import { clearMessages, getMessages } from './twitchScrapper'
import { sentToHook } from './discordIntegration'
import { initOverlayAPI } from './api'
import { sentToOverlay } from './overlaySignals'

const INTERVAL = 60000 * 30; // 30 minutes
const context = StoryContext.cyberpunk

console.log('Bienvenido a la interfaz de TwitchTales Bot\n');
initOverlayAPI();

setInterval(async () => {
  const messages = getMessages();
  if (messages.length !== 0) {
    const results = await Promise.all(messages.map(msg => analyzeSentiment(msg)));

    const positiveMessages = results.filter((result: StorySentimentType) => result === 'positive').length;
    const negativeMessages = results.filter((result: StorySentimentType) => result === 'negative').length;
    // const neutralMessages = results.filter((result: StorySentiment) => result === 'neutral').length;

    const sentimentSum = positiveMessages - negativeMessages; // TODO: Adjust arithmetics for neutral messages

    if (sentimentSum > 0) {
      const story = await generateStory({ sentiment: 'positive', context });
      sentToHook(story);
      sentToOverlay(story);
    } else if (sentimentSum < 0) {
      const story = await generateStory({ sentiment: 'negative', context });
      sentToHook(story);
      sentToOverlay(story);
    } else {
      const story = await generateStory({ sentiment: 'neutral', context });
      sentToHook(story);
      sentToOverlay(story);
    }
  }

  clearMessages();
}, INTERVAL);
