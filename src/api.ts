import express from 'express';

const app = express();

app.get('/', (_req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.write('data: Hello, world!\n\n');
  res.write('data: This is a Server-Sent Event.\n\n');
  res.write('data: Another message.\n\n');
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})