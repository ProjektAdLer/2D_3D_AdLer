import HeaderBarBuilder from "../../../../Core/Presentation/React/HeaderBar/HeaderBarBuilder";

describe("HeaderBarBuilder", () => {
  let systemUnderTest: HeaderBarBuilder;

  beforeEach(() => {
    systemUnderTest = new HeaderBarBuilder();
  });

  test("constructor didn't throw error", () => {
    expect(systemUnderTest).toBeDefined();
  });
});
