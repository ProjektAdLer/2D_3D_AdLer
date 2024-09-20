import { NullEngine, Scene, TransformNode, Vector3 } from "@babylonjs/core";
import StoryNPCPresenter from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCPresenter";
import StoryNPCViewModel, {
  StoryNPCState,
} from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCViewModel";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import { mock, mockDeep } from "jest-mock-extended";
import IStoryElementPresenter from "../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/IStoryElementPresenter";
import { StoryElementType } from "../../../../Core/Domain/Types/StoryElementType";
import ILoggerPort from "../../../../Core/Application/Ports/Interfaces/ILoggerPort";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";

const storyElementPresenterMock = mockDeep<IStoryElementPresenter>();
const loggerMock = mock<ILoggerPort>();

describe("StoryNPCPresenter", () => {
  let systemUnderTest: StoryNPCPresenter;
  let viewModel: StoryNPCViewModel;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IStoryElementPresenter,
    ).toConstantValue(storyElementPresenterMock);
    CoreDIContainer.rebind(CORE_TYPES.ILogger).toConstantValue(loggerMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    viewModel = new StoryNPCViewModel();
    systemUnderTest = new StoryNPCPresenter(viewModel);
  });

  // ANF-ID: [EWE0039]
  test("onFocused sets isInteractable to true", () => {
    viewModel.isInteractable.Value = false;

    systemUnderTest.onFocused();

    expect(viewModel.isInteractable.Value).toBe(true);
  });

  // ANF-ID: [EWE0039]
  test("onUnfocused sets isInteractable to false", () => {
    viewModel.isInteractable.Value = true;

    systemUnderTest.onUnfocused();

    expect(viewModel.isInteractable.Value).toBe(false);
  });

  // ANF-ID: [EZZ0024]
  test("onStoryElementCutSceneTriggered sets state to Idle when another story type cutscene is triggered", () => {
    viewModel.state.Value = StoryNPCState.RandomMovement;
    viewModel.storyType = StoryElementType.Outro;
    systemUnderTest.onStoryElementCutSceneTriggered(StoryElementType.Intro);

    expect(viewModel.state.Value).toBe(StoryNPCState.Idle);
  });

  // ANF-ID: [EZZ0026, EWE0036, EWE0042]
  test("onStoryElementCutSceneTriggered sets state to CutScene when the same story type cutscene is triggered", () => {
    viewModel.state.Value = StoryNPCState.RandomMovement;
    viewModel.storyType = StoryElementType.Intro;
    systemUnderTest.onStoryElementCutSceneTriggered(StoryElementType.Intro);

    expect(viewModel.state.Value).toBe(StoryNPCState.CutScene);
  });

  // ANF-ID: [EZZ0025,EWE0043]
  test("onStoryElementCutSceneFinished sets state to RandomMovement when currently CutScene is set", () => {
    viewModel.state.Value = StoryNPCState.CutScene;
    systemUnderTest.onStoryElementCutSceneFinished();

    expect(viewModel.state.Value).toBe(StoryNPCState.RandomMovement);
  });

  test("changeStateToRandomMovement sets state to RandomMovement", () => {
    viewModel.state.Value = StoryNPCState.Stop;
    systemUnderTest.changeStateFromStopToRandomMovement();
    expect(viewModel.state.Value).toBe(StoryNPCState.RandomMovement);
  });
});
