import ArrayItemRandomizer from "../../../Core/Presentation/Utils/ArrayItemRandomizer/ArrayItemRandomizer";

let mockItems: string[] = [];
for (let i = 0; i < 100; i++) {
  mockItems.push(`item${i}`);
}

describe("ArrayItemRandomizer", () => {
  let systemUnderTest: ArrayItemRandomizer<string>;

  beforeEach(() => {
    systemUnderTest = new ArrayItemRandomizer(mockItems);
  });

  test("getImport should return an import from the given list without a seed", () => {
    expect(mockItems).toContain(systemUnderTest.getItem());
  });

  test("getImport should return an import from the given list with a empty string as seed", () => {
    expect(mockItems).toContain(systemUnderTest.getItem(""));
  });

  test("getImport should return the same import with the same seed", () => {
    const result1 = systemUnderTest.getItem("mockSeed");
    const result2 = systemUnderTest.getItem("mockSeed");

    expect(mockItems).toContain(result1);
    expect(mockItems).toContain(result2);
    expect(result1).toEqual(result2);
  });
});
