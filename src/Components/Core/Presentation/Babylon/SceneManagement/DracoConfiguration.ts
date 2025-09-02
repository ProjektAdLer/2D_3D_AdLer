import "@babylonjs/loaders/glTF";

// Declare the global BABYLON namespace with DracoCompression
declare global {
  namespace BABYLON {
    namespace DracoCompression {
      const Configuration: {
        decoder: {
          wasmUrl: string;
          wasmBinaryUrl: string;
          fallbackUrl: string;
        };
      };
    }
  }
}

/**
 * Configures Draco compression to use local files instead of CDN
 * This fixes offline support by pointing to locally hosted Draco files
 */
export function configureDracoForOfflineUse(): void {
  // Wait for BABYLON to be available
  if (typeof BABYLON !== "undefined" && BABYLON.DracoCompression) {
    // Configure Draco decoder to use local files instead of CDN
    BABYLON.DracoCompression.Configuration.decoder.wasmUrl =
      "/draco/draco_wasm_wrapper_gltf.js";
    BABYLON.DracoCompression.Configuration.decoder.wasmBinaryUrl =
      "/draco/draco_decoder_gltf.wasm";
    BABYLON.DracoCompression.Configuration.decoder.fallbackUrl =
      "/draco/draco_decoder_gltf.js";

    console.log(
      "Draco compression configured for offline use with local files",
    );
  } else {
    console.warn(
      "BABYLON.DracoCompression not available - configuration skipped",
    );
  }
}
