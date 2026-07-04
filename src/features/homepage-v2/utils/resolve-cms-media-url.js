import { resolveApiAssetUrl } from 'src/utils/resolve-api-asset-url';

import { CONFIG } from 'src/global-config';

/** Resolve API storage URLs for `<img src>` (handles relative `/storage/...`). */
export function resolveCmsMediaUrl(url, mediaId = null) {
  const base = (CONFIG.serverUrl ?? '').replace(/\/$/, '');
  const id = typeof mediaId === 'string' ? mediaId.trim() : '';
  if (base && id) {
    // Prefer API delivery so media still loads when direct `/storage` is forbidden by web server.
    return `${base}/api/media/${encodeURIComponent(id)}/file`;
  }

  if (!url || typeof url !== 'string') {
    return '';
  }
  return resolveApiAssetUrl(url);
}
