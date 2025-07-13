
import { StoryContext } from './config/consts'
import type { StoryContextType, StorySentimentType } from './types/story'

export interface StoryGenerationProps {
    sentiment: StorySentimentType;
    context?: StoryContextType;
}

const Stories = {
    positive: '✅En la neón-bruma de la urbe, una comunidad virtual comparte ideas, arte y apoyo incondicional, reinventando esperanza y amistad mientras afuera llueven luces y sueños eléctricos.',
    negative: '✖️Rin intenta enviar un mensaje pidiendo ayuda, pero sólo recibe respuestas automáticas. Las luces de su habitación parpadean. En la comunidad virtual, nadie parece real ya. Rin se siente invisible.',
    neutral: '😐Las calles digitales se llenan de spam y engaños. Rin observa cómo sus contactos caen víctimas del robo de identidad. El silencio virtual es tan pesado como el hormigón húmedo de la ciudad.'
}

export function generateStory({ sentiment, context = StoryContext.urban }: StoryGenerationProps): string {
    console.log(`Generating story for sentiment: ${sentiment} in context: ${context}`);
    return Stories[sentiment];
}