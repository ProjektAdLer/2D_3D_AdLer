import SideBarBuilder from "../../../../../Core/Presentation/React/LearningSpaceDisplay/SideBar/SideBarBuilder";

describe("SideBarBuilder", () => {
  let systemUnderTest: SideBarBuilder;

  beforeEach(() => {
    systemUnderTest = new SideBarBuilder();
  });

  test("constructor didn't throw error", () => {
    expect(systemUnderTest).toBeDefined();
  });
});
