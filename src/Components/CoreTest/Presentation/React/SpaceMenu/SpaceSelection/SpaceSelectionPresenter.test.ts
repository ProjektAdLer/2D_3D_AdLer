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

  test("onScoreChanged should set isComplete of its spaces", () => {
    systemUnderTest["viewModel"].spaces.Value = [
      [42, "Test Space 1", false, false],
    ];
    systemUnderTest["viewModel"].requirementsList.Value = [[42, []]];
    systemUnderTest.onScoreChanged(42, 42, 42, 42);
    expect(systemUnderTest["viewModel"].spaces.Value).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([42, "Test Space 1", true, true]),
      ])
    );
  });
  test("onScoreChanged should return if lookup is undefined", () => {
    systemUnderTest["viewModel"].spaces.Value = [
      [1, "Test Space 1", false, false],
    ];
    systemUnderTest.onScoreChanged(42, 42, 42, 42);
    expect(systemUnderTest["viewModel"].spaces.Value).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([1, "Test Space 1", false, false]),
      ])
    );
  });
  test("onScoreChanged should not set isComplete, if requiredScore is too high", () => {
    systemUnderTest["viewModel"].spaces.Value = [
      [42, "Test Space 1", false, false],
    ];
    systemUnderTest["viewModel"].requirementsList.Value = [[42, []]];
    systemUnderTest.onScoreChanged(42, 43, 42, 42);
    expect(systemUnderTest["viewModel"].spaces.Value).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([42, "Test Space 1", true, false]),
      ])
    );
  });
  test("onScoreChanged should not set isAvailable, if no SpaceRequirement correspends with spaceId", () => {
    systemUnderTest["viewModel"].spaces.Value = [
      [42, "Test Space 1", false, false],
    ];
    systemUnderTest["viewModel"].requirementsList.Value = [[1, []]];
    systemUnderTest.onScoreChanged(42, 43, 42, 42);
    expect(systemUnderTest["viewModel"].spaces.Value).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([42, "Test Space 1", false, false]),
      ])
    );
  });
  test("onScoreChanged should set isAvailable (requiredSpace defined)", () => {
    systemUnderTest["viewModel"].spaces.Value = [
      [42, "Test Space 1", false, false],
      [1, "Test Space 2", true, true],
    ];
    systemUnderTest["viewModel"].requirementsList.Value = [[42, [1]]];
    systemUnderTest.onScoreChanged(42, 43, 42, 42);
    expect(systemUnderTest["viewModel"].spaces.Value).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([42, "Test Space 1", true, false]),
      ])
    );
  });
  test("onScoreChanged should throw error if requiredSpace is undefined", () => {
    systemUnderTest["viewModel"].spaces.Value = [
      [42, "Test Space 1", false, false],
      [1, "Test Space 2", true, true],
    ];
    systemUnderTest["viewModel"].requirementsList.Value = [[42, [5]]];
    expect(() => systemUnderTest.onScoreChanged(42, 43, 42, 42)).toThrowError(
      "Required space not found"
    );
  });

  test("spaceDataLoaded should push new information into the requirementsList, if Room with establised id is given", () => {
    const vmBefore = systemUnderTest["viewModel"];
    systemUnderTest["viewModel"].spaces.Value = [
      [42, "Test Space 1", false, false],
      [1, "Test Space 2", true, true],
    ];
    const worldTO: WorldTO = {
      worldName: "Test World",
      worldGoal: "Test World Goal",
      description: "Test World Description",
      goals: "Test World Goals",
      spaces: [
        {
          id: 42,
          name: "Test Space 1",
          elements: [],
          description: "Test Space 1 Description",
          goals: "Test Space 1 Goals",
          requiredPoints: 0,
          requirements: [1, 42],
        },
        {
          id: 42,
          name: "Test Space 1",
          elements: [],
          description: "Test Space 1 Description",
          goals: "Test Space 1 Goals",
          requiredPoints: 0,
          requirements: [20, 42],
        },
      ],
    };

    systemUnderTest.onWorldLoaded(worldTO);

    expect(systemUnderTest["viewModel"]).toEqual(vmBefore);
  });
});
