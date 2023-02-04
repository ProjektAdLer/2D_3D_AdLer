import WorldDetailBuilder from "../../../../../Core/Presentation/React/WorldMenu/WorldDetail/WorldDetailBuilder";

describe("WorldDetailBuilder", () => {
  let systemUnderTest: WorldDetailBuilder;

  beforeEach(() => {
    systemUnderTest = new WorldDetailBuilder();
  });

  test("constructor doesn't throw", () => {
    expect(systemUnderTest).toBeDefined();
  });
});
