import { HPL_IMAGES } from '../assets/images';

// Persistent in-memory cache to prevent mobile WebKit / Chrome garbage collection
const _imageCache = new Map<string, HTMLImageElement>();

/**
 * High-Priority Critical Assets needed immediately on first view
 */
const CRITICAL_KEYS: (keyof typeof HPL_IMAGES)[] = [
  'hero',
  'heroBanner',
  'timelineHeader',
  'timelineChampions',
  'about',
  'podium',
  'register',
  'shirvaLogo',
  'smvitmLogo',
  'isteLogo',
  'igniteLogo',
  'ieeeLogo',
  'codeTrooperLogo',
  'aikyaLogo'
];

function preloadSingleImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    if (_imageCache.has(src)) {
      resolve(_imageCache.get(src)!);
      return;
    }

    const img = new Image();
    img.decoding = 'async';
    img.src = src;

    // Retain strong reference in RAM
    _imageCache.set(src, img);

    if ('decode' in img && typeof img.decode === 'function') {
      img.decode()
        .then(() => resolve(img))
        .catch(() => {
          img.onload = () => resolve(img);
          img.onerror = () => resolve(img);
        });
    } else {
      img.onload = () => resolve(img);
      img.onerror = () => resolve(img);
    }
  });
}

/**
 * Universal Mobile & Desktop High-Performance Image Preloader & GPU Decoder
 * - Tier 1: Immediately loads critical hero banners and sponsor logos.
 * - Tier 2: Batches secondary page illustrations during idle frames so mobile bandwidth remains free.
 */
export async function preloadAllImages(): Promise<void> {
  const allEntries = Object.entries(HPL_IMAGES).filter(
    (entry): entry is [string, string] => typeof entry[1] === 'string'
  );

  // 1. Tier 1: Critical Images (Load first & decode into GPU memory)
  const criticalUrls = allEntries
    .filter(([key]) => CRITICAL_KEYS.includes(key as any))
    .map(([, url]) => url);

  const secondaryUrls = allEntries
    .filter(([key]) => !CRITICAL_KEYS.includes(key as any))
    .map(([, url]) => url);

  // Load critical images concurrently
  await Promise.all(criticalUrls.map(preloadSingleImage));

  // 2. Tier 2: Secondary Images (Batched during idle time on mobile & desktop)
  const loadSecondaryBatch = () => {
    // Process in batches of 4 to prevent mobile HTTP pipeline saturation
    const batchSize = 4;
    let index = 0;

    const processNextBatch = () => {
      if (index >= secondaryUrls.length) return;
      const batch = secondaryUrls.slice(index, index + batchSize);
      index += batchSize;

      Promise.all(batch.map(preloadSingleImage)).then(() => {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(processNextBatch, { timeout: 300 });
        } else {
          setTimeout(processNextBatch, 80);
        }
      });
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(processNextBatch, { timeout: 400 });
    } else {
      setTimeout(processNextBatch, 100);
    }
  };

  loadSecondaryBatch();
}
