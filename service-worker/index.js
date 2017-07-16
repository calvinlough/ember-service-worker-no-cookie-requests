import { PATTERNS } from 'ember-service-worker-no-cookie-requests/service-worker/config';
import { createUrlRegEx, urlMatchesAnyPattern } from 'ember-service-worker/service-worker/url-utils';

const PATTERN_REGEX = PATTERNS.map(createUrlRegEx);

self.addEventListener('fetch', (event) => {
  let request = event.request;
  if (request.method !== 'GET' || !/^https?/.test(request.url)) {
    return;
  }

  if (urlMatchesAnyPattern(request.url, PATTERN_REGEX)) {
    event.respondWith(
      fetch(event.request.url, { credentials: 'omit' })
    );
  }
});
