import { expect } from "@jest/globals";
import type { MatcherFunction } from "expect";

export const toBeNullOrEqual: MatcherFunction<[expected: any]> = function (
  received: unknown,
  expected: unknown
) {
  try {
    expect(received).toEqual(expected);
    return {
      message: () => `Ok`,
      pass: true,
    };
  } catch (error) {
    return received === null
      ? {
          message: () => `Ok`,
          pass: true,
        }
      : {
          message: () =>
            `Expected ${received} to equal ${expected} or null. ` +
            error.message,
          pass: false,
        };
  }
};
