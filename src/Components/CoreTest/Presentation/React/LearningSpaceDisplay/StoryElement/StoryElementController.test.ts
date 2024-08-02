import { mock } from "jest-mock-extended";
import StoryElementController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElementController";
import StoryElementViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElementViewModel";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IEndStoryElementCutScene from "../../../../../Core/Application/UseCases/EndStoryElementCutScene/IEndStoryElementCutSceneUseCase";
import { StoryElementType } from "../../../../../Core/Domain/Types/StoryElementType";

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

  test("closePanel resets isIntroCutsceneRunning and isOutroCutsceneRunning in viewmodel", () => {
    viewModelMock.isIntroCutsceneRunning.Value = true;
    viewModelMock.isOutroCutsceneRunning.Value = true;
    systemUnderTest = new StoryElementController(viewModelMock);
    systemUnderTest.closePanel();
    expect(viewModelMock.isIntroCutsceneRunning.Value).toBeFalsy();
    expect(viewModelMock.isOutroCutsceneRunning.Value).toBeFalsy();
  });

  test("closePanel calls EndStoryElementCutSceneUseCase when isIntroCutsceneRunning is true", () => {
    viewModelMock.isIntroCutsceneRunning.Value = true;
    systemUnderTest = new StoryElementController(viewModelMock);
    systemUnderTest.closePanel();
    expect(endStoryElementCutSceneUseCaseMock.execute).toBeCalled();
  });

  test("closePanel doesn't call EndStoryElementCutSceneUseCase when isOutroCutsceneRunning is false", () => {
    viewModelMock.isOutroCutsceneRunning.Value = false;
    systemUnderTest = new StoryElementController(viewModelMock);
    systemUnderTest.closePanel();
    expect(endStoryElementCutSceneUseCaseMock.execute).not.toBeCalled();
  });

  //ANF-ID: [EWE0040]
  test("onIntroButtonClicked sets storyTypeToDisplay in viewmodel to Intro", () => {
    viewModelMock.storyTypeToDisplay.Value = StoryElementType.None;
    systemUnderTest = new StoryElementController(viewModelMock);
    systemUnderTest.onIntroButtonClicked();
    expect(viewModelMock.storyTypeToDisplay.Value).toBe(StoryElementType.Intro);
  });

  //ANF-ID: [EWE0040]
  test("onOutroButtonClicked sets storyTypeToDisplay in viewmodel to Outro", () => {
    viewModelMock.storyTypeToDisplay.Value = StoryElementType.None;
    systemUnderTest = new StoryElementController(viewModelMock);
    systemUnderTest.onOutroButtonClicked();
    expect(viewModelMock.storyTypeToDisplay.Value).toBe(StoryElementType.Outro);
  });

  test("backToMenuButtonClicked sets storyTypeToDisplay to IntroOutro", () => {
    viewModelMock.storyTypeToDisplay.Value = StoryElementType.None;
    systemUnderTest = new StoryElementController(viewModelMock);
    systemUnderTest.onBackToSelectionButtonClicked();
    expect(viewModelMock.storyTypeToDisplay.Value).toBe(
      StoryElementType.IntroOutro
    );
  });
});
