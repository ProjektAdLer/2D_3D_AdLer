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
import { FocusableTypes } from "../../../../Core/Presentation/Babylon/Avatar/AvatarFocusSelection/IAvatarFocusable";

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

  test("FocusableCenterPosition returns parent node position from viewmodel", () => {
    viewModel.parentNode = new TransformNode(
      "parent",
      new Scene(new NullEngine()),
    );
    viewModel.parentNode.position = new Vector3(1, 2, 3);

    expect(systemUnderTest.getFocusableCenterPosition()).toEqual(
      new Vector3(1, 2, 3),
    );
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
    systemUnderTest.onStoryElementCutSceneFinished(StoryElementType.Intro);

    expect(viewModel.state.Value).toBe(StoryNPCState.RandomMovement);
  });

  test("changeStateToRandomMovement sets state to RandomMovement", () => {
    viewModel.state.Value = StoryNPCState.Stop;
    systemUnderTest.changeStateFromStopToRandomMovement();
    expect(viewModel.state.Value).toBe(StoryNPCState.RandomMovement);
  });

  test("changeStateFromStopToRandomMovement does not change state when not Stop", () => {
    viewModel.state.Value = StoryNPCState.Idle;
    systemUnderTest.changeStateFromStopToRandomMovement();
    expect(viewModel.state.Value).toBe(StoryNPCState.Idle);
  });

  test("getType returns outroStory for Outro story type", () => {
    viewModel.storyType = StoryElementType.Outro;

    const result = systemUnderTest.getType();

    expect(result.type).toBe(FocusableTypes.outroStory);
  });

  test("getType returns introStory for Intro story type", () => {
    viewModel.storyType = StoryElementType.Intro;

    const result = systemUnderTest.getType();

    expect(result.type).toBe(FocusableTypes.introStory);
  });

  test("getType returns introStory for IntroOutro story type", () => {
    viewModel.storyType = StoryElementType.IntroOutro;

    const result = systemUnderTest.getType();

    expect(result.type).toBe(FocusableTypes.introStory);
  });

  test("isSpecialFocused returns viewModel isSpecialFocused value", () => {
    viewModel.isSpecialFocused = true;

    expect(systemUnderTest.isSpecialFocused()).toBe(true);

    viewModel.isSpecialFocused = false;

    expect(systemUnderTest.isSpecialFocused()).toBe(false);
  });

  test("onSpecialFocused sets isSpecialFocused to true", () => {
    viewModel.isSpecialFocused = false;

    systemUnderTest.onSpecialFocused();

    expect(viewModel.isSpecialFocused).toBe(true);
  });

  test("onSpecialUnfocused sets isSpecialFocused to false", () => {
    viewModel.isSpecialFocused = true;

    systemUnderTest.onSpecialUnfocused();

    expect(viewModel.isSpecialFocused).toBe(false);
  });

  test("onStoryElementCutSceneTriggered sets currentlyRunningSequence for matching story type", () => {
    viewModel.storyType = StoryElementType.IntroOutro;

    systemUnderTest.onStoryElementCutSceneTriggered(StoryElementType.Intro);

    expect(viewModel.currentlyRunningSequence).toBe(StoryElementType.Intro);
    expect(viewModel.state.Value).toBe(StoryNPCState.CutScene);
  });

  test("onStoryElementCutSceneTriggered logs info message for matching story type", () => {
    viewModel.storyType = StoryElementType.Intro;

    systemUnderTest.onStoryElementCutSceneTriggered(StoryElementType.Intro);

    expect(loggerMock.log).toHaveBeenCalledWith(
      expect.any(String), // LogLevelTypes.INFO
      expect.stringContaining("cutscene triggered"),
    );
  });

  test("onStoryElementCutSceneFinished sets introWasTriggered for IntroOutro NPC", () => {
    viewModel.state.Value = StoryNPCState.CutScene;
    viewModel.storyType = StoryElementType.IntroOutro;
    viewModel.introWasTriggered = false;

    systemUnderTest.onStoryElementCutSceneFinished(StoryElementType.Intro);

    expect(viewModel.introWasTriggered).toBe(true);
  });

  test("onStoryElementCutSceneFinished sets state to ExitRoom when exitAfterIntro is true", () => {
    viewModel.state.Value = StoryNPCState.CutScene;
    viewModel.exitAfterIntro = true;

    systemUnderTest.onStoryElementCutSceneFinished(StoryElementType.Intro);

    expect(viewModel.state.Value).toBe(StoryNPCState.ExitRoom);
  });

  test("onStoryElementCutSceneFinished sets state to ExitRoom when exitAfterOutro is true", () => {
    viewModel.state.Value = StoryNPCState.CutScene;
    viewModel.exitAfterOutro = true;

    systemUnderTest.onStoryElementCutSceneFinished(StoryElementType.Outro);

    expect(viewModel.state.Value).toBe(StoryNPCState.ExitRoom);
  });

  test("onStoryElementCutSceneFinished sets state to RandomMovement when no exit condition", () => {
    viewModel.state.Value = StoryNPCState.CutScene;
    viewModel.exitAfterIntro = false;
    viewModel.exitAfterOutro = false;

    systemUnderTest.onStoryElementCutSceneFinished(StoryElementType.Intro);

    expect(viewModel.state.Value).toBe(StoryNPCState.RandomMovement);
  });

  test("onStoryElementCutSceneFinished does not change state when not in CutScene", () => {
    viewModel.state.Value = StoryNPCState.Idle;

    systemUnderTest.onStoryElementCutSceneFinished(StoryElementType.Intro);

    expect(viewModel.state.Value).toBe(StoryNPCState.Idle);
  });

  test("onStoryElementCutSceneFinished logs info message about state change", () => {
    viewModel.state.Value = StoryNPCState.CutScene;
    viewModel.storyType = StoryElementType.Intro;

    systemUnderTest.onStoryElementCutSceneFinished(StoryElementType.Intro);

    expect(loggerMock.log).toHaveBeenCalledWith(
      expect.any(String), // LogLevelTypes.INFO
      expect.stringContaining("cutscene finished"),
    );
  });

  test("onStoryElementCutSceneFinished logs info message about introWasTriggered flag", () => {
    viewModel.state.Value = StoryNPCState.CutScene;
    viewModel.storyType = StoryElementType.IntroOutro;

    systemUnderTest.onStoryElementCutSceneFinished(StoryElementType.Intro);

    expect(loggerMock.log).toHaveBeenCalledWith(
      expect.any(String), // LogLevelTypes.INFO
      expect.stringContaining("introWasTriggered flag set"),
    );
  });

  test("onStoryElementCutSceneTriggered handles IntroOutro story type with Outro sequence", () => {
    viewModel.storyType = StoryElementType.IntroOutro;

    systemUnderTest.onStoryElementCutSceneTriggered(StoryElementType.Outro);

    expect(viewModel.currentlyRunningSequence).toBe(StoryElementType.Outro);
    expect(viewModel.state.Value).toBe(StoryNPCState.CutScene);
  });

  test("getType gets correct type if its an outro", () => {
    viewModel.storyType = StoryElementType.Outro;

    expect(systemUnderTest.getType()).toStrictEqual({ type: 2 });
  });
  test("getType gets correct type if its not an outro", () => {
    viewModel.storyType = StoryElementType.Intro;

    expect(systemUnderTest.getType()).toStrictEqual({ type: 1 });
  });
  test("isSpecialFocused returns isSpecialfocused from viewModel", () => {
    viewModel.isSpecialFocused = true;

    expect(systemUnderTest.isSpecialFocused()).toBe(true);
  });
  test("onSpecialFocused sets isSpecialFocused to true", () => {
    viewModel.isSpecialFocused = false;

    systemUnderTest.onSpecialFocused();

    expect(viewModel.isSpecialFocused).toBe(true);
  });
  test("onSpecialUnfocused sets isSpecialFocused to false", () => {
    viewModel.isSpecialFocused = true;

    systemUnderTest.onSpecialUnfocused();

    expect(viewModel.isSpecialFocused).toBe(false);
  });
});
