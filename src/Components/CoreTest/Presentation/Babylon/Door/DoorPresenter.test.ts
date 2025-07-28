import DoorPresenter from "../../../../Core/Presentation/Babylon/Door/DoorPresenter";
import DoorViewModel from "../../../../Core/Presentation/Babylon/Door/DoorViewModel";
import LearningSpaceScoreTO from "../../../../Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import { mock } from "jest-mock-extended";
import IBottomTooltipPresenter from "../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import IExitModalPresenter from "../../../../Core/Presentation/React/LearningSpaceDisplay/ExitModal/IExitModalPresenter";
import { Vector3 } from "@babylonjs/core";
import { StoryElementType } from "../../../../Core/Domain/Types/StoryElementType";

const mockBottomTooltipPresenter = mock<IBottomTooltipPresenter>();
const mockExitModalPresenter = mock<IExitModalPresenter>();

describe("DoorPresenter", () => {
  let systemUnderTest: DoorPresenter;
  let viewModel: DoorViewModel;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IBottomTooltipPresenter,
    ).toConstantValue(mockBottomTooltipPresenter);
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IExitModalPresenter,
    ).toConstantValue(mockExitModalPresenter);
  });

  beforeEach(() => {
    viewModel = new DoorViewModel();
    systemUnderTest = new DoorPresenter(viewModel);
  });

  test("constructor throws error if undefined is passed as view model", () => {
    expect(() => {
      //@ts-ignore
      new DoorPresenter(undefined);
    }).toThrow();
  });

  test("onFocused sets isInteractable to true", () => {
    viewModel.isInteractable.Value = false;

    systemUnderTest.onFocused();

    expect(viewModel.isInteractable.Value).toBe(true);
  });

  test("onUnfocused sets isInteractable to false", () => {
    viewModel.isInteractable.Value = true;

    systemUnderTest.onUnfocused();

    expect(viewModel.isInteractable.Value).toBe(false);
  });

  test("FocusableCenterPosition getter return position from viewmodel", () => {
    const mockPosition = new Vector3(42, 42, 42);
    viewModel.position = mockPosition;

    expect(systemUnderTest.getFocusableCenterPosition()).toBe(mockPosition);
  });

  test("onLearningSpaceScored sets isOpen to true if space id is matching, isExit is true and current score is greater than or equal to required score", () => {
    viewModel.isExit = true;
    viewModel.spaceID = 1;
    const spaceScoreTO = new LearningSpaceScoreTO();
    spaceScoreTO.spaceID = 1;
    spaceScoreTO.currentScore = 1;
    spaceScoreTO.requiredScore = 1;
    spaceScoreTO.maxScore = 1;

    systemUnderTest.onLearningSpaceScored(spaceScoreTO);

    expect(viewModel.isOpen.Value).toBe(true);
  });

  //ANF-ID: [EWE0036, EWE0042]
  test("onStoryElementCutSceneTriggered sets isInputEnabled to false if a story element intro or outro cutscene is triggered", () => {
    viewModel.isInputEnabled.Value = true;

    systemUnderTest.onStoryElementCutSceneTriggered(StoryElementType.None);

    expect(viewModel.isInputEnabled.Value).toBe(false);
  });

  //ANF-ID: [EWE0043]
  test("onStoryElementCutSceneTriggered sets isInputEnabled to true if any story element cutscene is finished", () => {
    viewModel.isInputEnabled.Value = false;

    systemUnderTest.onStoryElementCutSceneFinished();

    expect(viewModel.isInputEnabled.Value).toBe(true);
  });

  test("getType gets correct type if its an entry door", () => {
    viewModel.isExit = false;

    expect(systemUnderTest.getType()).toStrictEqual({ type: 3 });
  });
  test("getType gets correct type if its an exit door", () => {
    viewModel.isExit = true;

    expect(systemUnderTest.getType()).toStrictEqual({ type: 4 });
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
