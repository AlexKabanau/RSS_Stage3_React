import express from 'express';
import { createServer as createViteServer } from 'vite';

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;

async function startServer() {
  const app = express();

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: 'ssr' }
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.get('*', async (req, res) => {
    res.send('<h1>React Router SSR App</h1>'); // Позже сюда вставим рендеринг
  });

  app.listen(port, () => {
    console.log(`🔥 Server running at http://localhost:${port}`);
  });
}

startServer();
