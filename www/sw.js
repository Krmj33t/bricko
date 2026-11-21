// Bricko offline cache. Bump VERSION when the app changes.
const VERSION="bricko-1.9.0";
const FILES=["./","591.supabase.js","CopyShader.js","EffectComposer.js","GLTFExporter.js","LuminosityHighPassShader.js","OrbitControls.js","RenderPass.js","RoomEnvironment.js","RoundedBoxGeometry.js","STLExporter.js","ShaderPass.js","UnrealBloomPass.js","apple-touch-icon.png","config.js","fflate.js","fonts.css","icon-192.png","icon-512.png","index.html","manifest.webmanifest","supabase.js","three.min.js","fonts/bowlby-one-latin-400-normal.woff2","fonts/dm-mono-latin-400-normal.woff2","fonts/dm-mono-latin-500-normal.woff2","fonts/lexend-latin-400-normal.woff2","fonts/lexend-latin-500-normal.woff2","fonts/lexend-latin-600-normal.woff2","fonts/orbitron-latin-600-normal.woff2","fonts/orbitron-latin-800-normal.woff2","fonts/rajdhani-latin-500-normal.woff2","fonts/rajdhani-latin-600-normal.woff2","fonts/rajdhani-latin-700-normal.woff2"];
self.addEventListener("install",e=>{ e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())); });
self.addEventListener("activate",e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET"||u.origin!==location.origin) return;           // music links, accounts: straight to the network
  e.respondWith(caches.open(VERSION).then(async c=>{
    const hit=await c.match(e.request,{ignoreSearch:true});
    const net=fetch(e.request).then(r=>{ if(r.ok) c.put(e.request,r.clone()); return r; }).catch(()=>hit);
    return hit||net;                                                          // instant from cache, refreshed in the background
  }));
});
