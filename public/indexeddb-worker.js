/**
 * Service Worker for serving files from IndexedDB
 *
 * This worker intercepts requests to learning content files (H5P, PDFs, images, etc.)
 * and serves them from IndexedDB instead of the network. This allows content imported
 * via MBZ to work without being in the public folder.
 *
 * URL Format: /indexeddb/world/{worldID}/elements/{elementID}/{filename}
 */

const CACHE_NAME = "indexeddb-cache-v3"; // Increment to force update
const DB_NAME = "adler-offline-storage"; // Must match LocalStore.ts
const DB_VERSION = 1;

// Helper to open IndexedDB
async function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Helper to get file from IndexedDB
async function getFileFromIndexedDB(worldID, path) {
  try {
    const db = await openDatabase();
    const tx = db.transaction(["files"], "readonly");
    const store = tx.objectStore("files");

    // Key format matches LocalStore: "{worldID}/{path}"
    const key = `${worldID}/${path}`;

    const request = store.get(key);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const result = request.result;
        if (result && result.blob) {
          resolve(result.blob);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("[IndexedDB Worker] Error reading from IndexedDB:", error);
    return null;
  }
}

// Listen for fetch events
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only intercept requests to /indexeddb/ path
  if (!url.pathname.startsWith("/indexeddb/")) {
    return;
  }

  event.respondWith(handleIndexedDBRequest(event.request));
});

async function handleIndexedDBRequest(request) {
  const url = new URL(request.url);

  // Parse URL: /indexeddb/world/{worldID}/elements/{elementID}/{filename}
  const pathParts = url.pathname.split("/").filter((p) => p);

  if (
    pathParts.length < 5 ||
    pathParts[0] !== "indexeddb" ||
    pathParts[1] !== "world"
  ) {
    return new Response("Invalid IndexedDB path", { status: 400 });
  }

  const worldID = pathParts[2];
  const remainingPath = pathParts.slice(3).join("/"); // e.g., "elements/5/index.html"

  try {
    const blob = await getFileFromIndexedDB(worldID, remainingPath);

    if (blob) {
      // Determine content type from file extension
      const extension = remainingPath.split(".").pop().toLowerCase();
      const contentTypes = {
        html: "text/html",
        json: "application/json",
        js: "application/javascript",
        css: "text/css",
        png: "image/png",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        gif: "image/gif",
        svg: "image/svg+xml",
        webp: "image/webp",
        mp4: "video/mp4",
        mp3: "audio/mpeg",
        webm: "video/webm",
        ogg: "audio/ogg",
        wav: "audio/wav",
        pdf: "application/pdf",
        woff: "font/woff",
        woff2: "font/woff2",
        ttf: "font/ttf",
      };

      const contentType = contentTypes[extension] || "application/octet-stream";

      return new Response(blob, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Access-Control-Allow-Origin": "*",
        },
      });
    } else {
      return new Response("File not found in IndexedDB", { status: 404 });
    }
  } catch (error) {
    console.error("[IndexedDB Worker] Error:", error);
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}

// Install event
self.addEventListener("install", (event) => {
  console.log("[IndexedDB Worker] Installing v3...");
  self.skipWaiting(); // Force immediate activation
});

// Activate event
self.addEventListener("activate", (event) => {
  console.log("[IndexedDB Worker] Activating v3...");
  event.waitUntil(
    // Clean up old caches
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name)),
        );
      })
      .then(() => {
        return self.clients.claim();
      }),
  );
});
