import LearningRoomDetailBuilder from "../../../../../Core/Presentation/React/LearningRoomMenu/LearningRoomDetail/LearningRoomDetailBuilder";

describe("LearningRoomDetailBuilder", () => {
  let systemUnderTest: LearningRoomDetailBuilder;

  beforeEach(() => {
    systemUnderTest = new LearningRoomDetailBuilder();
  });

  test("constructor doesn't throw", () => {
    expect(systemUnderTest).toBeDefined();
  });
});
