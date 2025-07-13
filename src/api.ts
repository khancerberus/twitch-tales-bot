import express from 'express';
import { overlaySignal } from './overlaySignals'

export const initOverlayAPI = () => {
  const app = express();
  
  app.get('/', (_req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    overlaySignal.on('newStory', (content: string) => {
      res.write(content);
    });
  })

  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
  })
}