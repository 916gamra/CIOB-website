import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;
  const HOST = '0.0.0.0';

  // API Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Serve original public asset resources (e.g., pdfs, images) from the static folder
  const staticCiobPath = path.join(process.cwd(), 'ciob', 'www.ciobmaroc.ma');
  app.use(express.static(staticCiobPath));

  if (process.env.NODE_ENV !== 'production') {
    // Mount Vite development middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve bundled React static site builds from dist
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`CIOB Maroc SPA Server listening on http://${HOST}:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to trigger internal server boots:', error);
});
