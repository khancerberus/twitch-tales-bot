import { envConfig } from './config/env'

export const sentToHook = async (content: string) => {
    return fetch(envConfig().discordWebhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content
        })
    });
}