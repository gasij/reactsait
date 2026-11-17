import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('out');
if (!fs.existsSync(path.join(root, 'index.html'))) {
  console.error('Build the site first: npm run build');
  process.exit(1);
}
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8' };
const server = http.createServer((request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405, { Allow: 'GET, HEAD' }).end(); return; }
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
  catch { response.writeHead(400).end(); return; }
  const requested = path.resolve(root, '.' + pathname);
  if (requested !== root && !requested.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
  const candidates = [requested, path.join(requested, 'index.html'), requested + '.html'];
  let file = candidates.find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  const status = file ? 200 : 404;
  file ||= path.join(root, '404.html');
  if (!fs.existsSync(file)) { response.writeHead(404).end(); return; }
  response.writeHead(status, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  if (request.method === 'HEAD') response.end();
  else fs.createReadStream(file).pipe(response);
});
const port = Number(process.env.PORT || 3000);
server.listen(port, process.env.HOST || '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));
