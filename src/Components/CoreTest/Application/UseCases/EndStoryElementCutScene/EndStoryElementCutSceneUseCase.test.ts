import { mock } from "jest-mock-extended";
import EndStoryElementCutSceneUseCase from "../../../../Core/Application/UseCases/EndStoryElementCutScene/EndStoryElementCutSceneUseCase";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import IGetUserLocationUseCase from "../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import StoryElementEntity from "../../../../Core/Domain/Entities/StoryElementEntity";
import { StoryElementType } from "../../../../Core/Domain/Types/StoryElementType";

const entityContainerMock = mock<IEntityContainer>();
const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();
const learnignWorldPortMock = mock<ILearningWorldPort>();

describe("EndStoryElementCutSceneUseCase", () => {
  let systemUnderTest: EndStoryElementCutSceneUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock,
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase,
    ).toConstantValue(getUserLocationUseCaseMock);
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      learnignWorldPortMock,
    );
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(EndStoryElementCutSceneUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  //ANF-ID: [EWE0043]
  test("execute() should call onStoryElementCutSceneFinished() on the world port when story element exists", () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    });
    entityContainerMock.filterEntitiesOfType.mockReturnValue([{}]);

    systemUnderTest.execute({ storyType: StoryElementType.Intro });

    expect(learnignWorldPortMock.onStoryElementCutSceneFinished).toBeCalledWith(
      StoryElementType.Intro,
    );
  });

  //ANF-ID: [EWE0043]
  test("execute() should not call onStoryElementCutSceneFinished() on the world port when story element does not exist", () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    });
    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);

    systemUnderTest.execute({ storyType: StoryElementType.Intro });

    expect(
      learnignWorldPortMock.onStoryElementCutSceneFinished,
    ).not.toBeCalled();
  });

  test("filterEntitiesOfType callback should return true when story element is in the same world and space as the user", () => {
    getUserLocationUseCaseMock.execute.mockReturnValue({
      worldID: 1,
      spaceID: 1,
    });
    const storyElement = {
      worldID: 1,
      spaceID: 1,
    };
    let filterResult;
    entityContainerMock.filterEntitiesOfType.mockImplementation(
      (entityType, callback) => {
        filterResult = callback(storyElement as StoryElementEntity);
        return [storyElement];
      },
    );
    systemUnderTest.execute({ storyType: StoryElementType.Intro });

    expect(filterResult).toBe(true);
  });
});
