import { DracoCompression } from "@babylonjs/core/Meshes/Compression/dracoCompression.js";

const dir = "../draco";

DracoCompression.Configuration.decoder.wasmUrl = `${dir}/draco_wasm_wrapper_gltf.js`;
DracoCompression.Configuration.decoder.wasmBinaryUrl = `${dir}/draco_decoder_gltf.wasm`;
DracoCompression.Configuration.decoder.fallbackUrl = `${dir}/draco_decoder_gltf.js`;
