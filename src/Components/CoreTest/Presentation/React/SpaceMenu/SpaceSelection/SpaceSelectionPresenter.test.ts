import WorldTO from "../../../../../Core/Application/DataTransferObjects/WorldTO";
import SpaceSelectionPresenter from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/SpaceSelectionPresenter";
import SpaceSelectionViewModel from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/SpaceSelectionViewModel";

describe("SpaceSelectionPresenter", () => {
  let systemUnderTest: SpaceSelectionPresenter;

  beforeEach(() => {
    systemUnderTest = new SpaceSelectionPresenter(
      new SpaceSelectionViewModel()
    );
  });

  test("onWorldLoaded sets new values in the view model", () => {
    const worldTO: WorldTO = {
      worldName: "Test World",
      worldGoal: "Test World Goal",
      description: "Test World Description",
      goals: "Test World Goals",
      spaces: [
        {
          id: 1,
          name: "Test Space 1",
          elements: [],
          description: "Test Space 1 Description",
          goals: "Test Space 1 Goals",
          requiredPoints: 0,
          requirements: [],
        },
        {
          id: 2,
          name: "Test Space 2",
          elements: [],
          description: "Test Space 1 Description",
          goals: "Test Space 1 Goals",
          requiredPoints: 0,
          requirements: [],
        },
      ],
    };

    systemUnderTest.onWorldLoaded(worldTO);

    expect(systemUnderTest["viewModel"].spaces.Value).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([1, "Test Space 1"]),
        expect.arrayContaining([2, "Test Space 2"]),
      ])
    );
  });

  test("should set Winning Condition of its spaces", () => {
    systemUnderTest.onScoreChanged(42, 42, 42, 42);
    expect(systemUnderTest["viewModel"].spacesCompleted.Value).toEqual(
      expect.arrayContaining([expect.arrayContaining([42, true])])
    );
  });

  test("should do NOTHING, on Space Data Loaded", () => {
    const vmBefore = systemUnderTest["viewModel"];

    systemUnderTest.onSpaceDataLoaded(undefined);

    expect(systemUnderTest["viewModel"]).toEqual(vmBefore);
  });
});
