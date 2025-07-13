import { StorySentimentType } from './types/story'

const { Container } = require('@nlpjs/core');
const { SentimentAnalyzer } = require('@nlpjs/sentiment');
const { LangEs } = require('@nlpjs/lang-es');

const container = new Container();
container.use(LangEs);
const sentiment = new SentimentAnalyzer({ container });

export async function analyzeSentiment(message: string): Promise<StorySentimentType> {
    const result = await sentiment.process({ locale: 'es', text: message });
    return result.sentiment.vote;
}