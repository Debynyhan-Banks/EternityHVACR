// Local, built-output fixture server. All API requests are refused unless the
// browser test intercepts them; no credentials or external service is needed.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import worker from '../dist/server/index.js';
const root = resolve('dist/client');
const types = { '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.json': 'application/json' };
async function asset(request) {
  const pathname = new URL(request.url).pathname;
  const path = resolve(root, `.${decodeURIComponent(pathname)}`);
  if (!path.startsWith(`${root}/`)) return new Response('Not found', { status: 404 });
  try { return new Response(await readFile(path), { headers: { 'content-type': types[extname(path)] ?? 'application/octet-stream' } }); }
  catch { return new Response('Not found', { status: 404 }); }
}
const server = createServer(async (req, res) => {
  try {
    if (req.url.startsWith('/api/')) { res.writeHead(501); res.end('Tests must mock API calls'); return; }
    const request = new Request(`https://eternityhvacr.com${req.url}`, { headers: req.headers });
    let response = await asset(request);
    if (response.status === 404) response = await worker.fetch(request, { ASSETS: { fetch: asset } }, { waitUntil() {}, passThroughOnException() {} });
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch { res.writeHead(500); res.end('Local fixture error'); }
});
server.listen(4179, '127.0.0.1');
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
