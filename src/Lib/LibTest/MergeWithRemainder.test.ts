import { mergeObjectsWithRemainder } from "../MergeWithRemainder";

describe("MergeWithReamainder", () => {
  it("should merge two objects with a remainder", () => {
    const obj1 = {
      a: 1,
      b: 2,
      c: 3,
    };

    const obj2 = {
      a: 2,
      b: 3,
    };

    const result = mergeObjectsWithRemainder(Object, obj1, obj2);

    expect(result).toEqual({
      a: 2,
      b: 3,
      c: 3,
    });
  });
});
