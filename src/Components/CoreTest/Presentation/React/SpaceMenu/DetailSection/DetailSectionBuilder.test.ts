import DetailSectionBuilder from "../../../../../Core/Presentation/React/SpaceMenu/DetailSection/DetailSectionBuilder";

describe("DetailSectionBuilder", () => {
  let systemUnderTest: DetailSectionBuilder;

  beforeEach(() => {
    systemUnderTest = new DetailSectionBuilder();
  });

  test("constructor doesn't throw", () => {
    expect(systemUnderTest).toBeDefined();
  });
});
