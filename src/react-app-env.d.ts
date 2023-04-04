/// <reference types="react-scripts" />

// Images
declare module "*.jpg";
declare module "*.png";
declare module "*.env";

// 3D types
declare module "*.glb";
declare module "*.stl";

declare module "*.jpeg";
declare module "*.gif";
declare module "*.mp4";

// Babylon Navigation Plugin Dependency
declare module "recast-detour";

// h5p standalone plugin
declare module "h5p-standalone";

interface Window {
  _env_: { API_URL: string? }?;
}
