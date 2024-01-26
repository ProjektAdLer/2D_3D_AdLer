import { mock } from "jest-mock-extended";
import StoryElementController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElementController";
import StoryElementViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElementViewModel";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IEndStoryElementCutScene from "../../../../../Core/Application/UseCases/EndStoryElementCutScene/IEndStoryElementCutSceneUseCase";

const viewModelMock = new StoryElementViewModel();
const endStoryElementCutSceneUseCaseMock = mock<IEndStoryElementCutScene>();

describe("StoryElementController", () => {
  let systemUnderTest: StoryElementController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IEndStoryElementCutScene>(
      USECASE_TYPES.IEndStoryElementCutSceneUseCase
    ).toConstantValue(endStoryElementCutSceneUseCaseMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("closePanel sets isOpen in viewmodel to false", () => {
    viewModelMock.isOpen.Value = true;
    systemUnderTest = new StoryElementController(viewModelMock);
    systemUnderTest.closePanel();
    expect(viewModelMock.isOpen.Value).toBeFalsy();
  });

  test("increasePageId increases pageId in viewmodel by 1", () => {
    viewModelMock.pageId.Value = 0;
    systemUnderTest = new StoryElementController(viewModelMock);
    systemUnderTest.increasePageId();
    expect(viewModelMock.pageId.Value).toBe(1);
  });

  test("decreasePageId decreases pageId in viewmodel by 1", () => {
    viewModelMock.pageId.Value = 10;
    systemUnderTest = new StoryElementController(viewModelMock);
    systemUnderTest.decreasePageId();
    expect(viewModelMock.pageId.Value).toBe(9);
  });
});
