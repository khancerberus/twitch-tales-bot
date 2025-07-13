import express from 'express';
import cors from 'cors';
import { overlaySignal } from './overlaySignals'

export const initOverlayAPI = () => {
  const app = express();

  app.use(cors({
    origin: '*',
    methods: ['GET']
  }));
  
  app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    res.write('Twitch Tales Bot Overlay API\n\n');

    overlaySignal.on('newStory', (content: string) => {
      res.write(`data: ${content}\n\n`);
    });

    req.on('close', () => {
      res.end();
    });
  })

  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
  })
}