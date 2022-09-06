import LearningRoomSelectionBuilder from "../../../../Core/Presentation/React/LearningRoomSelection/LearningRoomSelectionBuilder";

describe("HeaderBarBuilder", () => {
  let systemUnderTest: LearningRoomSelectionBuilder;

  beforeEach(() => {
    systemUnderTest = new LearningRoomSelectionBuilder();
  });

  test("constructor didn't throw error", () => {
    expect(systemUnderTest).toBeDefined();
  });
});
