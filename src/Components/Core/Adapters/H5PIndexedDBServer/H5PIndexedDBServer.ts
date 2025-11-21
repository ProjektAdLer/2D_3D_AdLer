/**
 * H5P IndexedDB Server
 *
 * Registers a Service Worker that intercepts H5P file requests and serves them
 * from IndexedDB instead of the network.
 *
 * This allows H5P content imported via MBZ to work without requiring files
 * to be in the public folder.
 */
export default class H5PIndexedDBServer {
  private static instance: H5PIndexedDBServer;
  private serviceWorkerRegistration: ServiceWorkerRegistration | null = null;
  private isReady = false;

  private constructor() {}

  static getInstance(): H5PIndexedDBServer {
    if (!H5PIndexedDBServer.instance) {
      H5PIndexedDBServer.instance = new H5PIndexedDBServer();
    }
    return H5PIndexedDBServer.instance;
  }

  /**
   * Initialize the H5P IndexedDB Server by registering the Service Worker
   */
  async init(): Promise<void> {
    if (this.isReady) {
      console.log("[H5P IndexedDB Server] Already initialized");
      return;
    }

    if (!("serviceWorker" in navigator)) {
      console.warn(
        "[H5P IndexedDB Server] Service Workers not supported in this browser",
      );
      return;
    }

    try {
      // Register Service Worker
      const registration = await navigator.serviceWorker.register(
        "/h5p-indexeddb-worker.js",
        {
          scope: "/",
        },
      );

      this.serviceWorkerRegistration = registration;

      console.log(
        "[H5P IndexedDB Server] Service Worker registered successfully",
      );

      // Wait for Service Worker to be active
      await this.waitForServiceWorkerActive(registration);

      this.isReady = true;
      console.log("[H5P IndexedDB Server] Ready");
    } catch (error) {
      console.error(
        "[H5P IndexedDB Server] Failed to register Service Worker:",
        error,
      );
      throw error;
    }
  }

  /**
   * Wait for Service Worker to become active
   */
  private async waitForServiceWorkerActive(
    registration: ServiceWorkerRegistration,
  ): Promise<void> {
    return new Promise((resolve) => {
      if (registration.active) {
        resolve();
        return;
      }

      const worker = registration.installing || registration.waiting;
      if (worker) {
        worker.addEventListener("statechange", () => {
          if (worker.state === "activated") {
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }

  /**
   * Get the base URL for accessing H5P files from IndexedDB
   * Format: /indexeddb/world/{worldID}/elements/{elementID}
   */
  getH5PBaseUrl(worldID: number, elementID: number): string {
    return `/indexeddb/world/${worldID}/elements/${elementID}`;
  }

  /**
   * Get the full URL for a specific H5P file from IndexedDB
   */
  getH5PFileUrl(worldID: number, elementID: number, filename: string): string {
    return `${this.getH5PBaseUrl(worldID, elementID)}/${filename}`;
  }

  /**
   * Check if the server is ready
   */
  ready(): boolean {
    return this.isReady;
  }

  /**
   * Unregister the Service Worker (for cleanup)
   */
  async unregister(): Promise<void> {
    if (this.serviceWorkerRegistration) {
      await this.serviceWorkerRegistration.unregister();
      this.serviceWorkerRegistration = null;
      this.isReady = false;
      console.log("[H5P IndexedDB Server] Service Worker unregistered");
    }
  }
}
