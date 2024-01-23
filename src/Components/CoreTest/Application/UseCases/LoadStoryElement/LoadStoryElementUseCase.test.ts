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
import StoryElementTextTO from "../../../../Core/Application/DataTransferObjects/StoryElementTextTO";
import LearningSpaceEntity from "../../../../Core/Domain/Entities/LearningSpaceEntity";
import StoryElementTO from "../../../../Core/Application/DataTransferObjects/StoryElementTO";

const worldPortMock = mock<ILearningWorldPort>();
const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();
const entityContainerMock = mock<IEntityContainer>();

describe("LoadStoryElementUseCase", () => {
  let systemUnderTest: LoadStoryElementUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock
    );

    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase
    ).toConstantValue(getUserLocationUseCaseMock);

    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LoadStoryElementUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should throw, if user is not in learningspace", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: undefined,
    });

    await expect(() => systemUnderTest.execute()).toThrow(
      "User is not in a space"
    );
  });

  test("should throw, if more than one space is found", () => {
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

    expect(() => systemUnderTest.execute()).toThrow(
      "Found more than one space with spaceID"
    );
  });

  test("should throw if no space entities are found", () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    });

    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);

    expect(() => systemUnderTest.execute()).toThrow(
      "Could not find a space with spaceID"
    );
  });

  test("calls onStoryElementLoaded Port with story texts", () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    });

    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 1,
        storyElement: {
          spaceID: 1,
          introStoryTexts: ["intro"],
          outroStoryTexts: ["outro"],
          modelType: "a_npc_defaultnpc",
          storyType: StoryElementType.IntroOutro,
        } as StoryElementEntity,
      } as LearningSpaceEntity,
    ]);

    systemUnderTest.execute();

    expect(worldPortMock.onStoryElementLoaded).toHaveBeenCalledWith({
      introStoryTexts: ["intro"],
      outroStoryTexts: ["outro"],
      modelType: "a_npc_defaultnpc",
      storyType: StoryElementType.IntroOutro,
    } as StoryElementTO);
  });
});
