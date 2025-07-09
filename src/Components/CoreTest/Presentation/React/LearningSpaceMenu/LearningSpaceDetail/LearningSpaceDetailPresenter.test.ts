import LearningSpaceDetailPresenter from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceDetail/LearningSpaceDetailPresenter";
import LearningSpaceDetailViewModel from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceDetail/LearningSpaceDetailViewModel";
import LearningSpaceTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceTO";
import { GradingStyle } from "../../../../../Core/Domain/Types/GradingStyle";
import { LearningElementModelTypeEnums } from "../../../../../Core/Domain/LearningElementModels/LearningElementModelTypes";
import LearningElementTO from "../../../../../Core/Application/DataTransferObjects/LearningElementTO";
import { LearningSpaceThemeType } from "../../../../../Core/Domain/Types/LearningSpaceThemeTypes";

describe("LearningSpaceDetailPresenter", () => {
  let systemUnderTest: LearningSpaceDetailPresenter;

  beforeEach(() => {
    systemUnderTest = new LearningSpaceDetailPresenter(
      new LearningSpaceDetailViewModel(),
    );
  });

  test("onLearningWorldLoaded should set viewModel data", () => {
    systemUnderTest.onLearningWorldLoaded({
      gradingStyle: GradingStyle.point,
    });

    expect(systemUnderTest["viewModel"].completionDisplay).toContain(
      GradingStyle.point,
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
          model: LearningElementModelTypeEnums.TextElementModelTypes.Bookshelf1,
          type: "h5p",
          description: "Test Description 1",
          goals: ["TestGoal"],
          value: 1,
          hasScored: true,
          parentWorldID: 42,
          theme: LearningSpaceThemeType.Arcade,
          isScoreable: true,
          isRequired: null,
          estimatedTimeInMinutes: 10,
          difficulty: {
            baseXP: 10,
            multiplicator: 1,
            difficultyType: 0,
          },
        },
        {
          id: 2,
          name: "Test Element 2",
          parentSpaceID: 42,
          type: "text",
          description: "Test Description 1",
          goals: ["TestGoal"],
          model: LearningElementModelTypeEnums.TextElementModelTypes.Bookshelf1,
          value: 1,
          hasScored: false,
          parentWorldID: 42,
          theme: LearningSpaceThemeType.Arcade,
          isScoreable: true,
          isRequired: true,
          estimatedTimeInMinutes: 10,
          difficulty: {
            baseXP: 20,
            multiplicator: 2,
            difficultyType: 0,
          },
        },
      ],
    };

    systemUnderTest.onLearningSpaceLoaded(spaceTO);

    expect(systemUnderTest["viewModel"].id.Value).toEqual(spaceTO.id);
    expect(systemUnderTest["viewModel"].name.Value).toEqual(spaceTO.name);
    expect(systemUnderTest["viewModel"].description.Value).toEqual(
      spaceTO.description,
    );
    expect(systemUnderTest["viewModel"].goals.Value).toEqual(spaceTO.goals);
    expect(systemUnderTest["viewModel"].isAvailable.Value).toEqual(
      spaceTO.isAvailable,
    );
    expect(systemUnderTest["viewModel"].requiredPoints.Value).toEqual(
      spaceTO.requiredScore,
    );
    expect(systemUnderTest["viewModel"].elements.Value).toEqual([
      {
        type: "h5p",
        name: "Test Element 1",
        hasScored: true,
        points: 1,
        isRequired: null,
        difficultyInfo: {
          baseXP: 10,
          multiplicator: 1,
          difficultyType: 0,
        },
        estimatedTimeInMinutes: 10,
      },
      {
        type: "text",
        name: "Test Element 2",
        hasScored: false,
        points: 1,
        isRequired: true,
        difficultyInfo: {
          baseXP: 20,
          multiplicator: 2,
          difficultyType: 0,
        },
        estimatedTimeInMinutes: 10,
      },
    ]);
  });

  test("onLearningSpaceLoaded sets data in the view model even if no ElementTO is present", () => {
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
      elements: [null],
    };

    systemUnderTest.onLearningSpaceLoaded(spaceTO);

    expect(systemUnderTest["viewModel"].id.Value).toEqual(spaceTO.id);
    expect(systemUnderTest["viewModel"].name.Value).toEqual(spaceTO.name);
    expect(systemUnderTest["viewModel"].description.Value).toEqual(
      spaceTO.description,
    );
    expect(systemUnderTest["viewModel"].goals.Value).toEqual(spaceTO.goals);
    expect(systemUnderTest["viewModel"].isAvailable.Value).toEqual(
      spaceTO.isAvailable,
    );
    expect(systemUnderTest["viewModel"].requiredPoints.Value).toEqual(
      spaceTO.requiredScore,
    );
    expect(systemUnderTest["viewModel"].elements.Value).toEqual([]);
  });
});
