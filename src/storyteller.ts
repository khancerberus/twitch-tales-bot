
import type { StoryGenerationProps } from './types/story';
import { StoryContext } from './config/consts';
import { envConfig } from './config/env'
import { Stories } from './mock/stories'
import OpenAI from 'openai';

const model = 'gpt-4.1';
let previousResponseId: string | null | undefined // TODO: Handle previous response ID by a file or database to maintain state across restarts

const openai = new OpenAI({
    apiKey: envConfig().openaiApiKey
});

export async function generateStory({ sentiment, context = StoryContext.urban }: StoryGenerationProps): Promise<string> {
    if (envConfig().nodeEnv === 'development') {
        console.log(`Generating story for sentiment: ${sentiment} in context: ${context}`);
        return Stories[sentiment];
    } else {
        const sentimentPropmt = sentiment === 'positive' ? 'positiva' : sentiment === 'negative' ? 'negativa' : 'neutral';
        const creationOption = previousResponseId != null ? 'Continua la historia anterior' : 'Crea una historia nueva';
        const response = await openai.responses.create({
            model,
            input: `${creationOption} sobre gente que vive en un mundo ${context} y que sea ${sentimentPropmt}`,
            instructions: 'Sin explicaciones, solo la historia. Maximo 200 caracteres. Usa el nombre de una ciudad solo si es necesario. No uses guiones. Sobre una comunidad de twitch pero sin mencionarla. Pon un emoji al principio de la historia relacionado con el sentimiento. Usa entre los personajes Serenity, Nitsuga o Caami, selecciona solo uno por historia, según el tono o la situación (puedes incluir otros si lo amerita). Puedes contar el lore de cada uno de ellos por separado pero si interactuan entre ellos, que sea de forma natural.',
            max_output_tokens: 60,
            previous_response_id: previousResponseId
        })

        previousResponseId = response.id;

        return response.output_text
    }
}