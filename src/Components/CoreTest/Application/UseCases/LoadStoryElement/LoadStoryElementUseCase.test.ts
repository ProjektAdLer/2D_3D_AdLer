import { mock } from "jest-mock-extended";
import LoadStoryElementUseCase from "../../../../Core/Application/UseCases/LoadStoryElement/LoadStoryElementUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import { LoadStoryElementType } from "../../../../Core/Domain/Types/LoadStoryElementType";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IGetUserLocationUseCase from "../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import StoryElementEntity from "../../../../Core/Domain/Entities/StoryElementEntity";
import { StoryElementType } from "../../../../Core/Domain/Types/StoryElementType";
import StoryElementTextTO from "../../../../Core/Application/DataTransferObjects/StoryElementTextTO";

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
  afterAll(() => {
    CoreDIContainer.restore();
  });
  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LoadStoryElementUseCase);
  });

  test("should throw, if user is not in learningspace", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: undefined,
    });

    await expect(
      systemUnderTest.executeAsync(LoadStoryElementType.Intro)
    ).rejects.toThrow("User is not in a space");
  });

  test("should throw, if more than 2 story-elements are found", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    });

    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        spaceID: 1,
        storyTexts: ["test1"],
        elementModel: "a_npc_defaultnpc",
        type: StoryElementType.Intro,
      } as StoryElementEntity,
      {
        spaceID: 1,
        storyTexts: ["test2"],
        elementModel: "a_npc_defaultnpc",
        type: StoryElementType.Intro,
      } as StoryElementEntity,
      {
        spaceID: 1,
        storyTexts: ["test3"],
        elementModel: "a_npc_defaultnpc",
        type: StoryElementType.Outro,
      } as StoryElementEntity,
    ]);

    await expect(
      systemUnderTest.executeAsync(LoadStoryElementType.Intro)
    ).rejects.toThrow("Found more than two stories with spaceID");
  });

  test("should throw if no story entities are found", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    });

    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);

    await expect(
      systemUnderTest.executeAsync(LoadStoryElementType.Intro)
    ).rejects.toThrow("Could not find a story in space with spaceID");
  });

  test("calls onStoryElementLoaded Port with intro text only in TO", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    });

    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        spaceID: 1,
        storyTexts: ["intro"],
        elementModel: "a_npc_defaultnpc",
        type: StoryElementType.Intro,
      } as StoryElementEntity,
      {
        spaceID: 1,
        storyTexts: ["outro"],
        elementModel: "a_npc_defaultnpc",
        type: StoryElementType.Outro,
      } as StoryElementEntity,
    ]);

    await systemUnderTest.executeAsync(LoadStoryElementType.Intro);
    expect(worldPortMock.onStoryElementLoaded).toHaveBeenCalledWith({
      introTexts: ["intro"],
      outroTexts: undefined,
    } as StoryElementTextTO);
  });

  test("calls onStoryElementLoaded Port with outro text only in TO", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    });

    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        spaceID: 1,
        storyTexts: ["intro"],
        elementModel: "a_npc_defaultnpc",
        type: StoryElementType.Intro,
      } as StoryElementEntity,
      {
        spaceID: 1,
        storyTexts: ["outro"],
        elementModel: "a_npc_defaultnpc",
        type: StoryElementType.Outro,
      } as StoryElementEntity,
    ]);

    await systemUnderTest.executeAsync(LoadStoryElementType.Outro);
    expect(worldPortMock.onStoryElementLoaded).toHaveBeenCalledWith({
      introTexts: undefined,
      outroTexts: ["outro"],
    } as StoryElementTextTO);
  });

  test("calls onStoryElementLoaded Port with intro and outro text in TO", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    });

    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        spaceID: 1,
        storyTexts: ["intro"],
        elementModel: "a_npc_defaultnpc",
        type: StoryElementType.Intro,
      } as StoryElementEntity,
      {
        spaceID: 1,
        storyTexts: ["outro"],
        elementModel: "a_npc_defaultnpc",
        type: StoryElementType.Outro,
      } as StoryElementEntity,
    ]);

    await systemUnderTest.executeAsync(LoadStoryElementType.IntroOutro);
    expect(worldPortMock.onStoryElementLoaded).toHaveBeenCalledWith({
      introTexts: ["intro"],
      outroTexts: ["outro"],
    } as StoryElementTextTO);
  });
});
