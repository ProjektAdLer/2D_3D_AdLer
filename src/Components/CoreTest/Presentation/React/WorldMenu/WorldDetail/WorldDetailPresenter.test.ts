import WorldDetailPresenter from "../../../../../Core/Presentation/React/WorldMenu/WorldDetail/WorldDetailPresenter";
import WorldDetailViewModel from "../../../../../Core/Presentation/React/WorldMenu/WorldDetail/WorldDetailViewModel";
import WorldTO from "../../../../../Core/Application/DataTransferObjects/WorldTO";

describe("WorldDetailPresenter", () => {
  let systemUnderTest: WorldDetailPresenter;

  beforeEach(() => {
    systemUnderTest = new WorldDetailPresenter(new WorldDetailViewModel());
  });

  test("onWorldLoaded should set viewModel data", () => {
    systemUnderTest.onWorldLoaded({
      worldName: "test",
      spaces: [{ id: 1, name: "test", isCompleted: false }],
      worldGoal: "test",
      description: "test",
    });

    expect(systemUnderTest["viewModel"].spaces.Value).toEqual([
      { id: 1, name: "test", isCompleted: false },
    ]);
    expect(systemUnderTest["viewModel"].name.Value).toEqual("test");
    expect(systemUnderTest["viewModel"].goals.Value).toEqual("test");
    expect(systemUnderTest["viewModel"].description.Value).toEqual("test");
  });
});
