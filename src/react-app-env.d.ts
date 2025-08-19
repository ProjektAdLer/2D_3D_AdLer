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
declare module "*.webm";
declare module "*.mov";

// Babylon Navigation Plugin Dependency
declare module "recast-detour";

// h5p standalone plugin
declare module "h5p-standalone";

// Process environment variables for React environment
declare const process: {
  env: {
    NODE_ENV: string;
    PUBLIC_URL?: string;
    REACT_APP_IS_SHOWCASE?: string;
    [key: string]: string | undefined;
  };
};

// Fix for inversify decorator_utils module that no longer exists in newer versions
declare module "inversify/lib/annotation/decorator_utils" {
  export type DecoratorTarget = object;
}

interface Window {
  _env_: { API_URL: string?; MOODLE_URL?: string? }?;
}
