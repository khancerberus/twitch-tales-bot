import { EventEmitter } from 'stream'

export const overlaySignal = new EventEmitter();

export const sentToOverlay = async (content: string) => {
    overlaySignal.emit('newStory', content);
}