self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request.url, { credentials: 'omit' })
  );
});
