import LearningSpaceDetailPresenter from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceDetail/LearningSpaceDetailPresenter";
import LearningSpaceDetailViewModel from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceDetail/LearningSpaceDetailViewModel";
import LearningSpaceTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceTO";

describe("LearningSpaceDetailPresenter", () => {
  let systemUnderTest: LearningSpaceDetailPresenter;

  beforeEach(() => {
    systemUnderTest = new LearningSpaceDetailPresenter(
      new LearningSpaceDetailViewModel(),
    );
  });

  test("onLearningWorldLoaded should set viewModel data", () => {
    systemUnderTest.onLearningWorldLoaded({
      spaces: [{ id: 1, name: "test" }],
    });

    expect(systemUnderTest["viewModel"].spaces.Value).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, name: "test" }),
      ]),
    );
  });

  test("onLearningWorldLoaded should set isCompleted of a space to false, if currentScore is lower than requiredScore", () => {
    systemUnderTest.onLearningWorldLoaded({
      spaces: [{ id: 1, name: "test", currentScore: 0, requiredScore: 42 }],
    });

    expect(systemUnderTest["viewModel"].spaces.Value).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, name: "test", isCompleted: false }),
      ]),
    );
  });

  test("onLearningWorldLoaded should set isCompleted of a space to true, if currentScore is higher/equal than requiredScore", () => {
    systemUnderTest.onLearningWorldLoaded({
      spaces: [{ id: 1, name: "test", currentScore: 42, requiredScore: 42 }],
    });

    expect(systemUnderTest["viewModel"].spaces.Value).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, name: "test", isCompleted: true }),
      ]),
    );
  });

  test("onLearningSpaceLoaded sets data in the view model", () => {
    const spaceTO: LearningSpaceTO = {
      id: 42,
      description: "description",
      goals: ["goals"],
      requiredScore: 42,
      currentScore: 0,
      maxScore: 42,
      isAvailable: true,
      requirementsString: "",
      requirementsSyntaxTree: null,
      name: "Test Space",
      elements: [
        {
          id: 1,
          name: "Test Element 1",
          parentSpaceID: 42,
          type: "h5p",
          description: "Test Description 1",
          goals: ["TestGoal"],
          value: 1,
          hasScored: false,
          parentWorldID: 42,
        },
        {
          id: 2,
          name: "Test Element 2",
          parentSpaceID: 42,
          type: "text",
          description: "Test Description 1",
          goals: ["TestGoal"],
          value: 1,
          hasScored: false,
          parentWorldID: 42,
        },
      ],
    };

    systemUnderTest.onLearningSpaceLoaded(spaceTO);

    expect(systemUnderTest["viewModel"].name.Value).toEqual(spaceTO.name);
    expect(systemUnderTest["viewModel"].description.Value).toEqual(
      spaceTO.description,
    );
    expect(systemUnderTest["viewModel"].goals.Value).toEqual(spaceTO.goals);
    expect(systemUnderTest["viewModel"].requiredPoints.Value).toEqual(
      spaceTO.requiredScore,
    );
    expect(systemUnderTest["viewModel"].elements.Value).toEqual([
      {
        type: "h5p",
        name: "Test Element 1",
        hasScored: false,
        points: 1,
        isRequired: undefined,
      },
      {
        type: "text",
        name: "Test Element 2",
        hasScored: false,
        points: 1,
        isRequired: undefined,
      },
      // ["h5p", "Test Element 1", false, 1, undefined],
      // ["text", "Test Element 2", false, 1, undefined],
    ]);
  });
});
