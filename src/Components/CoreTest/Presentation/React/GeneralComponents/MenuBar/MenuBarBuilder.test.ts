import MenuBarBuilder from "../../../../../Core/Presentation/React/GeneralComponents/MenuBar/MenuBarBuilder";

describe("MenuBarBuilder", () => {
  let systemUnderTest: MenuBarBuilder;

  beforeEach(() => {
    systemUnderTest = new MenuBarBuilder();
  });

  test("constructor didn't throw error", () => {
    expect(systemUnderTest).toBeDefined();
  });
});
