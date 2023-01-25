import "reflect-metadata";

import "jest-webgl-canvas-mock";

import "@testing-library/jest-dom";

global.structuredClone = (val) => JSON.parse(JSON.stringify(val));
