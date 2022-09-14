import DetailSectionBuilder from "../../../../../Core/Presentation/React/RoomMenu/DetailSection/DetailSectionBuilder";

describe("DetailSectionBuilder", () => {
  let systemUnderTest: DetailSectionBuilder;

  beforeEach(() => {
    systemUnderTest = new DetailSectionBuilder();
  });

  test("constructor doesn't throw", () => {
    expect(systemUnderTest).toBeDefined();
  });
});
