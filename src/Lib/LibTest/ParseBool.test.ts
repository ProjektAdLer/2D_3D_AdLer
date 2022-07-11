import { parseBool } from "../ParseBool";

describe("parseBool", () => {
  it("should return true when input is true in string", () => {
    expect(parseBool("true")).toBe(true);
  });

  it("should return true when input is true in boolean", () => {
    expect(parseBool(true)).toBe(true);
  });

  it("should return false when input is false in string", () => {
    expect(parseBool("false")).toBe(false);
  });

  it("should return false when input is false in boolean", () => {
    expect(parseBool(false)).toBe(false);
  });
});
