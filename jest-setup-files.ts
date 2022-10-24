import "reflect-metadata";

import "jest-webgl-canvas-mock";

global.structuredClone = (val) => JSON.parse(JSON.stringify(val));
