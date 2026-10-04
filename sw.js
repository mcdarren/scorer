/* Offline support for the 14.1 Scorebook. Version changes whenever any app file changes. */
const CACHE = 'scorebook-a861854d20';
const ASSETS = ['./', 'store.js', 'jspdf.umd.min.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'];
// Cloudflare Pages answers /index.html with a redirect to /. Safari refuses a page that a service worker
// serves from a redirected response, so every response is copied into a clean one before it is cached or served.
const clean = r => (!r || !r.redirected) ? r : r.blob().then(b => new Response(b, { status: r.status, statusText: r.statusText, headers: r.headers }));
const PAGE = './';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(ASSETS.map(a => fetch(a, { cache: 'reload' }).then(clean).then(r => { if (r && r.ok) return c.put(a, r); }).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE && k.startsWith('scorebook-') ).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // the app page: try the network first so updates arrive, fall back to the saved copy offline
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(clean).then(r => {
      if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(PAGE, c)); }
      return r;
    }).catch(() => caches.match(PAGE).then(clean).then(hit => hit || Response.error())));
    return;
  }
  // Google Fonts: keep a copy so the typefaces work offline too
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open('scorebook-fonts').then(c => c.match(req).then(hit => hit || fetch(req).then(r => { c.put(req, r.clone()); return r; }))));
    return;
  }
  if (url.origin === location.origin) e.respondWith(caches.match(req).then(hit => hit || fetch(req)).then(clean));
});
