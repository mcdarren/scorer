/* Match history for the self-hosted Scorebook: kept in this browser's IndexedDB.
   The app asks the browser to keep this storage (navigator.storage.persist). */
(function(){
  const NAME = 'scorebook', VER = 1, OS = 'matches';
  let dbp = null;
  function open(){
    if (dbp) return dbp;
    dbp = new Promise((res, rej) => {
      const r = indexedDB.open(NAME, VER);
      r.onupgradeneeded = () => { if (!r.result.objectStoreNames.contains(OS)) r.result.createObjectStore(OS, { keyPath:'id' }); };
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
    return dbp;
  }
  function tx(mode, fn){
    return open().then(db => new Promise((res, rej) => {
      const t = db.transaction(OS, mode), st = t.objectStore(OS);
      const out = fn(st);
      t.oncomplete = () => res(out && out.result !== undefined ? out.result : undefined);
      t.onerror = () => rej(t.error); t.onabort = () => rej(t.error);
    }));
  }
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch(_){}
  window.BOOK_STORE = {
    label: 'Saved on this phone',
    all(){ return tx('readonly', st => st.getAll()); },
    put(m){ return tx('readwrite', st => st.put(m)); },
    del(id){ return tx('readwrite', st => st.delete(id)); }
  };
})();
