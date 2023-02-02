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

  test("onWorldLoaded sets a new data set in the VM for each space", () => {
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
          requiredScore: 0,
          currentScore: 0,
          maxScore: 0,
          requirements: [],
        },
        {
          id: 2,
          name: "Test Space 2",
          elements: [],
          description: "Test Space 1 Description",
          goals: "Test Space 1 Goals",
          requiredScore: 0,
          currentScore: 0,
          maxScore: 0,
          requirements: [],
        },
      ],
    };

    systemUnderTest.onWorldLoaded(worldTO);

    expect(systemUnderTest["viewModel"].spaces.Value).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, name: "Test Space 1" }),
        expect.objectContaining({ id: 2, name: "Test Space 2" }),
      ])
    );
  });

  test("onWorldLoaded should throw error if requiredSpace is undefined", () => {
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
          requiredScore: 0,
          currentScore: 0,
          maxScore: 0,
          requirements: [],
        },
        {
          id: 2,
          name: "Test Space 2",
          elements: [],
          description: "Test Space 1 Description",
          goals: "Test Space 1 Goals",
          requiredScore: 0,
          currentScore: 0,
          maxScore: 0,
          requirements: [42],
        },
      ],
    };

    expect(() => systemUnderTest.onWorldLoaded(worldTO)).toThrowError(
      "Required space not found"
    );
  });

  test("onWorldLoaded should set isAvailable to true if currentScore is less than requiredScore for the required space", () => {
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
          requiredScore: 1,
          currentScore: 1,
          maxScore: 1,
          requirements: [],
        },
        {
          id: 2,
          name: "Test Space 2",
          elements: [],
          description: "Test Space 1 Description",
          goals: "Test Space 1 Goals",
          requiredScore: 0,
          currentScore: 0,
          maxScore: 0,
          requirements: [1],
        },
      ],
    };

    systemUnderTest.onWorldLoaded(worldTO);

    expect(systemUnderTest["viewModel"].spaces.Value).toEqual([
      expect.objectContaining({ id: 1 }),
      expect.objectContaining({ id: 2, isAvailable: true }),
    ]);
  });

  test("onWorldLoaded should set isAvailable to false if currentScore is smaller than requiredScore for the required space", () => {
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
          requiredScore: 1,
          currentScore: 0,
          maxScore: 1,
          requirements: [],
        },
        {
          id: 2,
          name: "Test Space 2",
          elements: [],
          description: "Test Space 1 Description",
          goals: "Test Space 1 Goals",
          requiredScore: 0,
          currentScore: 0,
          maxScore: 0,
          requirements: [1],
        },
      ],
    };

    systemUnderTest.onWorldLoaded(worldTO);

    expect(systemUnderTest["viewModel"].spaces.Value).toEqual([
      expect.objectContaining({ id: 1 }),
      expect.objectContaining({ id: 2, isAvailable: false }),
    ]);
  });

  test("onWorldLoaded should set isCompleted to true if currentScore is greater than requiredScore", () => {
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
          requiredScore: 1,
          currentScore: 2,
          maxScore: 3,
          requirements: [],
        },
      ],
    };

    systemUnderTest.onWorldLoaded(worldTO);

    expect(systemUnderTest["viewModel"].spaces.Value).toEqual([
      expect.objectContaining({ id: 1, isCompleted: true }),
    ]);
  });
});
