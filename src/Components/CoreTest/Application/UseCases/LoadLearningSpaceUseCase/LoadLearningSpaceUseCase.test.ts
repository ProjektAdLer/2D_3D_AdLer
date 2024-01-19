import { mock } from "jest-mock-extended";
import LearningSpaceScoreTO from "../../../../Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import ICalculateLearningSpaceScoreUseCase, {
  IInternalCalculateLearningSpaceScoreUseCase,
} from "../../../../Core/Application/UseCases/CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import LoadLearningSpaceUseCase from "../../../../Core/Application/UseCases/LoadLearningSpace/LoadLearningSpaceUseCase";
import ILoadLearningWorldUseCase from "../../../../Core/Application/UseCases/LoadLearningWorld/ILoadLearningWorldUseCase";
import ISetUserLocationUseCase from "../../../../Core/Application/UseCases/SetUserLocation/ISetUserLocationUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import LearningSpaceEntity from "../../../../Core/Domain/Entities/LearningSpaceEntity";
import LearningWorldEntity from "../../../../Core/Domain/Entities/LearningWorldEntity";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import { ConstructorReference } from "../../../../Core/Types/EntityManagerTypes";
import ICalculateLearningSpaceAvailabilityUseCase from "../../../../Core/Application/UseCases/CalculateLearningSpaceAvailability/ICalculateLearningSpaceAvailabilityUseCase";
import LearningSpaceAvailabilityTO from "../../../../Core/Application/DataTransferObjects/LearningSpaceAvailabilityTO";
import { BooleanIDNode } from "../../../../Core/Application/UseCases/CalculateLearningSpaceAvailability/Parser/BooleanSyntaxTree";
import { StoryElementType } from "../../../../Core/Domain/Types/StoryElementType";
import { LearningElementModelTypeEnums } from "../../../../Core/Domain/LearningElementModels/LearningElementModelTypes";

const entityContainerMock = mock<IEntityContainer>();
const loadWorldMock = mock<ILoadLearningWorldUseCase>();
const worldPortMock = mock<ILearningWorldPort>();
const calculateSpaceScoreMock =
  mock<IInternalCalculateLearningSpaceScoreUseCase>();
const setUserLocationUseCaseMock = mock<ISetUserLocationUseCase>();
const calculateLearningSpaceAvailabilityUseCaseMock =
  mock<ICalculateLearningSpaceAvailabilityUseCase>();

describe("LoadSpaceUseCase", () => {
  let systemUnderTest: LoadLearningSpaceUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind<ILoadLearningWorldUseCase>(
      USECASE_TYPES.ILoadLearningWorldUseCase
    ).toConstantValue(loadWorldMock);
    CoreDIContainer.rebind<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).toConstantValue(worldPortMock);
    CoreDIContainer.rebind<IInternalCalculateLearningSpaceScoreUseCase>(
      USECASE_TYPES.ICalculateLearningSpaceScoreUseCase
    ).toConstantValue(calculateSpaceScoreMock);
    CoreDIContainer.rebind<ISetUserLocationUseCase>(
      USECASE_TYPES.ISetUserLocationUseCase
    ).toConstantValue(setUserLocationUseCaseMock);
    CoreDIContainer.rebind<ICalculateLearningSpaceAvailabilityUseCase>(
      USECASE_TYPES.ICalculateLearningSpaceAvailabilityUseCase
    ).toConstantValue(calculateLearningSpaceAvailabilityUseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LoadLearningSpaceUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should load learningspace when LearningWorld Entity is already present", async () => {
    const worldEntity: LearningWorldEntity = new LearningWorldEntity();
    worldEntity.spaces = [
      {
        id: 1,
        name: "Space 1",
        introStory: null,
        outroStory: null,
      } as LearningSpaceEntity,
    ];
    worldEntity.id = 1;
    entityContainerMock.filterEntitiesOfType.mockReturnValue([worldEntity]);

    const spaceScoreTO: LearningSpaceScoreTO = {
      currentScore: 0,
      requiredScore: 0,
      maxScore: 0,
      spaceID: 1,
    };
    calculateSpaceScoreMock.internalExecute.mockReturnValue(spaceScoreTO);

    const spaceAvailabilityTO: LearningSpaceAvailabilityTO = {
      isAvailable: true,
      requirementsString: "1",
      requirementsSyntaxTree: new BooleanIDNode(1),
    };
    calculateLearningSpaceAvailabilityUseCaseMock.internalExecute.mockReturnValue(
      spaceAvailabilityTO
    );

    await systemUnderTest.executeAsync({ spaceID: 1, worldID: 1 });

    expect(worldPortMock.onLearningSpaceLoaded).toHaveBeenCalledWith(
      expect.objectContaining(worldEntity.spaces[0])
    );
  });

  test("should load space when World Entity is not present", async () => {
    const worldEntity: LearningWorldEntity = new LearningWorldEntity();
    worldEntity.spaces = [
      {
        id: 1,
        name: "Space 1",
        introStory: null,
        outroStory: null,
      } as LearningSpaceEntity,
    ];
    worldEntity.id = 2;
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([]);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([worldEntity]);

    const spaceScoreTO: LearningSpaceScoreTO = {
      currentScore: 0,
      requiredScore: 0,
      maxScore: 0,
      spaceID: 1,
    };
    calculateSpaceScoreMock.internalExecute.mockReturnValue(spaceScoreTO);

    const spaceAvailabilityTO: LearningSpaceAvailabilityTO = {
      isAvailable: true,
      requirementsString: "1",
      requirementsSyntaxTree: new BooleanIDNode(1),
    };
    calculateLearningSpaceAvailabilityUseCaseMock.internalExecute.mockReturnValue(
      spaceAvailabilityTO
    );

    await systemUnderTest.executeAsync({ spaceID: 1, worldID: 2 });

    expect(worldPortMock.onLearningSpaceLoaded).toHaveBeenCalledWith(
      expect.objectContaining(worldEntity.spaces[0])
    );
  });

  test("should throw error when space is not found", async () => {
    const worldEntity: LearningWorldEntity = new LearningWorldEntity();
    worldEntity.spaces = [
      {
        id: 1,
        name: "Space 1",
        introStory: null,
        outroStory: null,
      } as LearningSpaceEntity,
    ];
    worldEntity.id = 1;
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([worldEntity]);

    await expect(async () =>
      systemUnderTest.executeAsync({ spaceID: 2, worldID: 1 })
    ).rejects.toBe("SpaceEntity with 2 not found");
  });

  test("sets user location via SetUserLocationUseCase", async () => {
    const worldEntity: LearningWorldEntity = new LearningWorldEntity();
    worldEntity.spaces = [
      {
        id: 1,
        name: "Space 1",
        introStory: null,
        outroStory: null,
      } as LearningSpaceEntity,
    ];
    worldEntity.id = 1;
    entityContainerMock.filterEntitiesOfType.mockReturnValue([worldEntity]);

    const spaceScoreTO: LearningSpaceScoreTO = {
      currentScore: 0,
      requiredScore: 0,
      maxScore: 0,
      spaceID: 1,
    };
    calculateSpaceScoreMock.internalExecute.mockReturnValue(spaceScoreTO);

    const spaceAvailabilityTO: LearningSpaceAvailabilityTO = {
      isAvailable: true,
      requirementsString: "1",
      requirementsSyntaxTree: new BooleanIDNode(1),
    };
    calculateLearningSpaceAvailabilityUseCaseMock.internalExecute.mockReturnValue(
      spaceAvailabilityTO
    );

    await systemUnderTest.executeAsync({ spaceID: 1, worldID: 1 });

    expect(setUserLocationUseCaseMock.execute).toHaveBeenCalledWith({
      spaceID: 1,
      worldID: 1,
    });
  });

  test("getWorldEntity should return true for matching worldIDs", async () => {
    let filterReturn: boolean;
    entityContainerMock.filterEntitiesOfType.mockImplementationOnce(
      <T>(
        entityType: ConstructorReference<T>,
        filter: (entity: T) => boolean
      ) => {
        let entity = new entityType();
        //@ts-ignore entityType is allways WorldEntity and has a worldID
        entity.id = 1;

        filterReturn = filter(entity);
        return [{}];
      }
    );

    systemUnderTest["getLearningWorldEntity"](1);

    // @ts-ignore TS does not know about the mock
    expect(filterReturn).toBe(true);
  });

  test("toTO converts intro StoryElementEntity to StoryElementTO", () => {
    const spaceEntity = new LearningSpaceEntity();
    spaceEntity.id = 1;
    spaceEntity.name = "Space 1";
    spaceEntity.introStory = {
      spaceID: 1,
      storyTexts: ["Intro Text"],
      storyType: StoryElementType.Intro,
      modelType: LearningElementModelTypeEnums.QuizElementModelTypes.DefaultNPC,
    };
    spaceEntity.outroStory = null;

    const spaceTO = systemUnderTest["toTO"](spaceEntity);

    expect(spaceTO.introStory?.modelType).toStrictEqual(
      spaceEntity.introStory?.modelType
    );
    expect(spaceTO.introStory?.storyTexts).toStrictEqual(
      spaceEntity.introStory?.storyTexts
    );
    expect(spaceTO.introStory?.storyType).toStrictEqual(
      spaceEntity.introStory?.storyType
    );
  });

  test("toTO converts outro StoryElementEntity to StoryElementTO", () => {
    const spaceEntity = new LearningSpaceEntity();
    spaceEntity.id = 1;
    spaceEntity.name = "Space 1";
    spaceEntity.introStory = null;
    spaceEntity.outroStory = {
      spaceID: 1,
      storyTexts: ["Outro Text"],
      storyType: StoryElementType.Outro,
      modelType: LearningElementModelTypeEnums.QuizElementModelTypes.DefaultNPC,
    };

    const spaceTO = systemUnderTest["toTO"](spaceEntity);

    expect(spaceTO.outroStory?.modelType).toStrictEqual(
      spaceEntity.outroStory?.modelType
    );
    expect(spaceTO.outroStory?.storyTexts).toStrictEqual(
      spaceEntity.outroStory?.storyTexts
    );
    expect(spaceTO.outroStory?.storyType).toStrictEqual(
      spaceEntity.outroStory?.storyType
    );
  });
});
