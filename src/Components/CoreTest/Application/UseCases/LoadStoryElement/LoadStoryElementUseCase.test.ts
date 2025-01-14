import { mock } from "jest-mock-extended";
import LoadStoryElementUseCase from "../../../../Core/Application/UseCases/LoadStoryElement/LoadStoryElementUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IGetUserLocationUseCase from "../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import StoryElementEntity from "../../../../Core/Domain/Entities/StoryElementEntity";
import { StoryElementType } from "../../../../Core/Domain/Types/StoryElementType";
import LearningSpaceEntity from "../../../../Core/Domain/Entities/LearningSpaceEntity";
import StoryElementTO from "../../../../Core/Application/DataTransferObjects/StoryElementTO";
import ILoggerPort from "../../../../Core/Application/Ports/Interfaces/ILoggerPort";
import { LogLevelTypes } from "../../../../Core/Domain/Types/LogLevelTypes";

const worldPortMock = mock<ILearningWorldPort>();
const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();
const entityContainerMock = mock<IEntityContainer>();
const loggerMock = mock<ILoggerPort>();

describe("LoadStoryElementUseCase", () => {
  let systemUnderTest: LoadStoryElementUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock,
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase,
    ).toConstantValue(getUserLocationUseCaseMock);
    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock,
    );
    CoreDIContainer.rebind(CORE_TYPES.ILogger).toConstantValue(loggerMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LoadStoryElementUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("does nothing if storyElementType is None", () => {
    systemUnderTest.execute(StoryElementType.None);

    expect(getUserLocationUseCaseMock.execute).not.toHaveBeenCalled();
  });

  test("should warn and don't call world port, if user is not in learningspace", () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: undefined,
    });

    systemUnderTest.execute(StoryElementType.IntroOutro);

    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      "User is not in a space!",
    );
    expect(worldPortMock.onStoryElementLoaded).not.toHaveBeenCalled();
  });

  test("should warn and don't call world port, if more than one space is found", () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    });

    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 1,
      } as LearningSpaceEntity,
      {
        id: 1,
      } as LearningSpaceEntity,
    ]);

    systemUnderTest.execute(StoryElementType.IntroOutro);

    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      "Found more than one space with spaceID 1 in world 1",
    );
    expect(worldPortMock.onStoryElementLoaded).not.toHaveBeenCalled();
  });

  test("should warn and don't call world port, if no space entities are found", () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    });

    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);

    systemUnderTest.execute(StoryElementType.IntroOutro);

    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      "Could not find a space with spaceID 1 in world 1",
    );
    expect(worldPortMock.onStoryElementLoaded).not.toHaveBeenCalled();
  });

  test("should warn and don't call world port, if no story element is found", () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    });
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 1,
      } as LearningSpaceEntity,
    ]);

    systemUnderTest.execute(StoryElementType.IntroOutro);

    expect(loggerMock.log).toHaveBeenCalledWith(
      LogLevelTypes.WARN,
      expect.stringContaining("Could not find story element of type"),
    );
    expect(worldPortMock.onStoryElementLoaded).not.toHaveBeenCalled();
  });

  test("calls onStoryElementLoaded Port with story texts", () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    });

    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 1,
        storyElements: [
          {
            spaceID: 1,
            introStoryTexts: ["intro"],
            outroStoryTexts: ["outro"],
            modelType: "a-quizbg-defaultnpc",
            storyType: StoryElementType.IntroOutro,
          } as StoryElementEntity,
        ],
      } as LearningSpaceEntity,
    ]);

    systemUnderTest.execute(StoryElementType.Intro);

    expect(worldPortMock.onStoryElementLoaded).toHaveBeenCalledWith({
      introStoryTexts: ["intro"],
      outroStoryTexts: ["outro"],
      modelType: "a-quizbg-defaultnpc",
      storyType: StoryElementType.IntroOutro,
    } as StoryElementTO);
  });

  test("filterEntitiesOfType filter callback returns true if world and space id match", () => {
    let filterResult = false;
    entityContainerMock.filterEntitiesOfType.mockImplementation(
      (_, filterFunction) => {
        filterResult = filterFunction({
          parentWorldID: 1,
          id: 1,
        } as LearningSpaceEntity);

        return [
          {
            parentWorldID: 1,
            id: 1,
          } as LearningSpaceEntity,
        ];
      },
    );

    systemUnderTest["getLearningSpaceEntity"](1, 1);

    expect(filterResult).toBe(true);
  });
});
