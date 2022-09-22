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
      spaces: [
        {
          id: 1,
          name: "Test Space 1",
          elements: [],
        },
        {
          id: 2,
          name: "Test Space 2",
          elements: [],
        },
      ],
    };

    systemUnderTest.onWorldLoaded(worldTO);

    expect(systemUnderTest["viewModel"].spaceIDs.Value).toEqual([1, 2]);
    expect(systemUnderTest["viewModel"].spaceTitles.Value).toEqual([
      "Test Space 1",
      "Test Space 2",
    ]);
  });
});
