import HeaderBarBuilder from "../../../../../Core/Presentation/React/RoomMenu/HeaderBar/HeaderBarBuilder";

describe("HeaderBarBuilder", () => {
  let systemUnderTest: HeaderBarBuilder;

  beforeEach(() => {
    systemUnderTest = new HeaderBarBuilder();
  });

  test("constructor didn't throw error", () => {
    expect(systemUnderTest).toBeDefined();
  });
});
