import "reflect-metadata";
import "@testing-library/jest-dom";
import "fake-indexeddb/auto";

import { config } from "./src/config";
import { toBeNullOrEqual } from "./src/Components/CoreTest/JestExtensions/toBeNullOrAny";
import { expect } from "@jest/globals";
import { toBeOneOf } from "jest-extended";

// The Backend gets constructed at some points in the tests, so we need to set
// the config values before the tests are run.
config.serverURL = "http://localhost:1337";

// matcher extensions
expect.extend({
  toBeNullOrEqual: toBeNullOrEqual,
  toBeOneOf: toBeOneOf,
});
declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Same as toEqual matcher but also allows null.
       */
      toBeNullOrEqual<T = any>(expected: T): R;
    }
  }
}

global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

// From React-Flow docs (https://reactflow.dev/docs/guides/testing/):
// To make sure that the tests are working, it's important that you are using
// this implementation of ResizeObserver and DOMMatrixReadOnly
class ResizeObserver {
  callback: globalThis.ResizeObserverCallback;

  constructor(callback: globalThis.ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {
    this.callback([{ target } as globalThis.ResizeObserverEntry], this);
  }

  unobserve() {}

  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

class DOMMatrixReadOnly {
  m22: number;
  constructor(transform: string) {
    const scale = transform?.match(/scale\(([1-9.])\)/)?.[1];
    this.m22 = scale !== undefined ? +scale : 1;
  }
}
// @ts-ignore
global.DOMMatrixReadOnly = DOMMatrixReadOnly;

Object.defineProperties(global.HTMLElement.prototype, {
  offsetHeight: {
    get() {
      return parseFloat(this.style.height) || 1;
    },
  },
  offsetWidth: {
    get() {
      return parseFloat(this.style.width) || 1;
    },
  },
});

(global.SVGElement as any).prototype.getBBox = () => ({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
});

export {};
