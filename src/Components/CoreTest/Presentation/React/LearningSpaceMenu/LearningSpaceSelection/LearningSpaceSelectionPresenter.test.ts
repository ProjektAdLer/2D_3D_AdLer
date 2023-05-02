import LearningSpaceSelectionPresenter from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceSelection/LearningSpaceSelectionPresenter";
import LearningSpaceSelectionViewModel from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceSelection/LearningSpaceSelectionViewModel";
import LearningWorldTO from "../../../../../Core/Application/DataTransferObjects/LearningWorldTO";
import { BooleanIDNode } from "../../../../../Core/Application/UseCases/CalculateLearningSpaceAvailability/Parser/BooleanSyntaxTree";

describe("LearningSpaceSelectionPresenter", () => {
  let systemUnderTest: LearningSpaceSelectionPresenter;

  beforeEach(() => {
    systemUnderTest = new LearningSpaceSelectionPresenter(
      new LearningSpaceSelectionViewModel()
    );
  });

  test("onLearningWorldLoaded sets a new data set in the VM for each space", () => {
    const worldTO: LearningWorldTO = {
      id: 1,
      name: "Test World",
      description: "Test World Description",
      goals: ["Test World Goals"],
      spaces: [
        {
          id: 1,
          name: "Test Space 1",
          elements: [],
          description: "Test Space 1 Description",
          goals: ["Test Space 1 Goals"],
          requiredScore: 0,
          currentScore: 0,
          maxScore: 0,
          requirementsString: "",
          requirementsSyntaxTree: null,
          isAvailable: true,
        },
        {
          id: 2,
          name: "Test Space 2",
          elements: [],
          description: "Test Space 1 Description",
          goals: ["Test Space 1 Goals"],
          requiredScore: 0,
          currentScore: 0,
          maxScore: 0,
          requirementsString: "",
          requirementsSyntaxTree: null,
          isAvailable: true,
        },
      ],
    };

    systemUnderTest.onLearningWorldLoaded(worldTO);

    expect(systemUnderTest["viewModel"].spaces.Value).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, name: "Test Space 1" }),
        expect.objectContaining({ id: 2, name: "Test Space 2" }),
      ])
    );
  });

  test("onLearningWorldLoaded should set isAvailable to true if currentScore is less than requiredScore for the required space", () => {
    const worldTO: LearningWorldTO = {
      id: 1,
      name: "Test World",
      description: "Test World Description",
      goals: ["Test World Goals"],
      spaces: [
        {
          id: 1,
          name: "Test Space 1",
          elements: [],
          description: "Test Space 1 Description",
          goals: ["Test Space 1 Goals"],
          requiredScore: 1,
          currentScore: 1,
          maxScore: 1,
          requirementsString: "",
          requirementsSyntaxTree: null,
          isAvailable: true,
        },
        {
          id: 2,
          name: "Test Space 2",
          elements: [],
          description: "Test Space 1 Description",
          goals: ["Test Space 1 Goals"],
          requiredScore: 0,
          currentScore: 0,
          maxScore: 0,
          requirementsString: "(1)",
          requirementsSyntaxTree: new BooleanIDNode(1),
          isAvailable: true,
        },
      ],
    };

    systemUnderTest.onLearningWorldLoaded(worldTO);

    expect(systemUnderTest["viewModel"].spaces.Value).toEqual([
      expect.objectContaining({ id: 1 }),
      expect.objectContaining({ id: 2, isAvailable: true }),
    ]);
  });

  test("onLearningWorldLoaded should set isAvailable to false if currentScore is smaller than requiredScore for the required space", () => {
    const worldTO: LearningWorldTO = {
      id: 1,
      name: "Test World",
      description: "Test World Description",
      goals: ["Test World Goals"],
      spaces: [
        {
          id: 1,
          name: "Test Space 1",
          elements: [],
          description: "Test Space 1 Description",
          goals: ["Test Space 1 Goals"],
          requiredScore: 1,
          currentScore: 0,
          maxScore: 1,
          requirementsString: "",
          requirementsSyntaxTree: null,
          isAvailable: true,
        },
        {
          id: 2,
          name: "Test Space 2",
          elements: [],
          description: "Test Space 1 Description",
          goals: ["Test Space 1 Goals"],
          requiredScore: 0,
          currentScore: 0,
          maxScore: 0,
          requirementsString: "(1)",
          requirementsSyntaxTree: new BooleanIDNode(1),
          isAvailable: false,
        },
      ],
    };

    systemUnderTest.onLearningWorldLoaded(worldTO);

    expect(systemUnderTest["viewModel"].spaces.Value).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1 }),
        expect.objectContaining({ id: 2, isAvailable: false }),
      ])
    );
  });

  test("onLearningWorldLoaded should set isCompleted to true if currentScore is greater than requiredScore", () => {
    const worldTO: LearningWorldTO = {
      id: 1,
      name: "Test World",
      description: "Test World Description",
      goals: ["Test World Goals"],
      spaces: [
        {
          id: 1,
          name: "Test Space 1",
          elements: [],
          description: "Test Space 1 Description",
          goals: ["Test Space 1 Goals"],
          requiredScore: 1,
          currentScore: 2,
          maxScore: 3,
          requirementsString: "",
          requirementsSyntaxTree: null,
          isAvailable: true,
        },
      ],
    };

    systemUnderTest.onLearningWorldLoaded(worldTO);

    expect(systemUnderTest["viewModel"].spaces.Value).toEqual([
      expect.objectContaining({ id: 1, isCompleted: true }),
    ]);
  });

  test("sorting should sort completed spaces in front of incompleted ones", () => {
    const worldTO: LearningWorldTO = {
      id: 1,
      name: "Test World",
      description: "Test World Description",
      goals: ["Test World Goals"],
      spaces: [
        {
          id: 1,
          name: "Test Space 1",
          elements: [],
          description: "Test Space 1 Description",
          goals: ["Test Space 1 Goals"],
          requiredScore: 1,
          currentScore: 0,
          maxScore: 1,
          requirementsString: "(2)",
          requirementsSyntaxTree: new BooleanIDNode(2),
          isAvailable: true,
        },
        {
          id: 2,
          name: "Test Space 2",
          elements: [],
          description: "Test Space 1 Description",
          goals: ["Test Space 1 Goals"],
          requiredScore: 0,
          currentScore: 0,
          maxScore: 0,
          requirementsString: "",
          requirementsSyntaxTree: null,
          isAvailable: true,
        },
        {
          id: 3,
          name: "Test Space 1",
          elements: [],
          description: "Test Space 1 Description",
          goals: ["Test Space 1 Goals"],
          requiredScore: 1,
          currentScore: 0,
          maxScore: 1,
          requirementsString: "(2)",
          requirementsSyntaxTree: new BooleanIDNode(2),
          isAvailable: true,
        },
      ],
    };

    systemUnderTest.onLearningWorldLoaded(worldTO);

    expect(systemUnderTest["viewModel"].spaces.Value).toMatchObject([
      { id: 2 },
      { id: 1 },
      { id: 3 },
    ]);
  });

  test("sorting should sort available spaces in front of locked ones", () => {
    const worldTO: LearningWorldTO = {
      id: 1,
      name: "Test World",
      description: "Test World Description",
      goals: ["Test World Goals"],
      spaces: [
        {
          id: 1,
          name: "Test Space 1",
          elements: [],
          description: "Test Space 1 Description",
          goals: ["Test Space 1 Goals"],
          requiredScore: 1,
          currentScore: 0,
          maxScore: 1,
          requirementsString: "(2)",
          requirementsSyntaxTree: new BooleanIDNode(2),
          isAvailable: false,
        },
        {
          id: 2,
          name: "Test Space 2",
          elements: [],
          description: "Test Space 2 Description",
          goals: ["Test Space 2 Goals"],
          requiredScore: 1,
          currentScore: 0,
          maxScore: 1,
          requirementsString: "",
          requirementsSyntaxTree: null,
          isAvailable: true,
        },
        {
          id: 3,
          name: "Test Space 3",
          elements: [],
          description: "Test Space 3 Description",
          goals: ["Test Space 3 Goals"],
          requiredScore: 1,
          currentScore: 0,
          maxScore: 1,
          requirementsString: "(2)",
          requirementsSyntaxTree: new BooleanIDNode(2),
          isAvailable: false,
        },
      ],
    };

    systemUnderTest.onLearningWorldLoaded(worldTO);

    expect(systemUnderTest["viewModel"].spaces.Value).toMatchObject([
      { id: 2 },
      { id: 1 },
      { id: 3 },
    ]);
  });
});
