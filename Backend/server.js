// Simple, dependency-free Node.js HTTP server for backend practice
const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/' || url.pathname === '/api/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'online',
      message: 'Git & GitHub Practice Backend API is running smoothly!',
      timestamp: new Date().toISOString()
    }, null, 2));
  } else if (url.pathname === '/api/contributors') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([
      { name: 'Umar Adnan', role: 'Maintainer' },
      { name: 'Ibrahim Adnan', role: 'Contributor' },
      { name: 'Tayyab Yahya', role: 'Contributor' }
    ], null, 2));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Practice server running at http://localhost:${PORT}`);
});
