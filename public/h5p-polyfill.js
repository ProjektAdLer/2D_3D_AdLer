/**
 * H5P Polyfill
 *
 * Provides missing utility functions that some H5P content types expect.
 * This file must be loaded BEFORE any H5P content to ensure the functions
 * are available when needed.
 */

(function () {
  console.log("[H5P Polyfill] Initializing...");

  // Wait for H5P object to be available
  const initPolyfill = function () {
    if (typeof H5P === "undefined") {
      console.log("[H5P Polyfill] H5P not yet available, will retry...");
      return false;
    }

    // Add isEmpty function if missing
    if (!H5P.isEmpty) {
      console.log("[H5P Polyfill] Adding H5P.isEmpty()");
      H5P.isEmpty = function (value) {
        if (value === null || value === undefined) return true;
        if (typeof value === "string") return value.trim() === "";
        if (Array.isArray(value)) return value.length === 0;
        if (typeof value === "object") return Object.keys(value).length === 0;
        return false;
      };
    }

    // Add trim function if missing
    if (!H5P.trim) {
      console.log("[H5P Polyfill] Adding H5P.trim()");
      H5P.trim = function (str) {
        return (str || "").trim();
      };
    }

    console.log("[H5P Polyfill] Polyfill applied successfully");
    return true;
  };

  // Try immediately
  if (initPolyfill()) {
    return;
  }

  // Poll for H5P to become available
  let attempts = 0;
  const maxAttempts = 50; // 5 seconds max
  const pollInterval = setInterval(function () {
    attempts++;

    if (initPolyfill()) {
      clearInterval(pollInterval);
    } else if (attempts >= maxAttempts) {
      console.warn(
        "[H5P Polyfill] H5P object not found after polling, polyfill may not work",
      );
      clearInterval(pollInterval);
    }
  }, 100);
})();
