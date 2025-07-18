import { StoryContext } from '../config/consts'

export type StorySentimentType = 'positive' | 'negative' | 'neutral';
export type StoryContextType = typeof StoryContext[keyof typeof StoryContext];

export interface StoryGenerationProps {
    sentiment: StorySentimentType;
    context?: StoryContextType;
}