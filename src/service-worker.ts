/* eslint-env serviceworker */
/* global ServiceWorkerGlobalScope */

/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

import { build, files, version } from '$service-worker';

const CACHE = `shell-${version}`;
const ASSETS = [...build, ...files];
const ASSET_SET = new Set(ASSETS);
const SCOPE_PATH = new URL(self.registration.scope).pathname.replace(/\/$/, '');

const toAssetPath = (pathname: string) => {
  if (!SCOPE_PATH || SCOPE_PATH === '/') {
    return pathname;
  }

  if (pathname.startsWith(SCOPE_PATH)) {
    const trimmed = pathname.slice(SCOPE_PATH.length);
    return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  }

  return pathname;
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
      )
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);

  const assetPath = toAssetPath(url.pathname);
  if (url.origin === self.location.origin && ASSET_SET.has(assetPath)) {
    event.respondWith(caches.match(event.request));
    return;
  }

  event.respondWith(
    caches.open(CACHE).then((cache) =>
      fetch(event.request)
        .then((response) => {
          if (response.ok && url.protocol.startsWith('http')) {
            cache.put(event.request, response.clone());
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(event.request);
          if (cached) {
            return cached;
          }
          throw new Error('Network request failed and no cache available.');
        })
    )
  );
});
