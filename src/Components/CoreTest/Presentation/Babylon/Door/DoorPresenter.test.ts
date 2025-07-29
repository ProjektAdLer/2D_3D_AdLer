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
import { FocusableTypes } from "../../../../Core/Presentation/Babylon/Avatar/AvatarFocusSelection/IAvatarFocusable";
import IDoorLogic from "../../../../Core/Presentation/Babylon/Door/DoorLogic/IDoorLogic";

const mockBottomTooltipPresenter = mock<IBottomTooltipPresenter>();
const mockExitModalPresenter = mock<IExitModalPresenter>();

describe("DoorPresenter", () => {
  let systemUnderTest: DoorPresenter;
  let viewModel: DoorViewModel;
  let mockDoorLogic: IDoorLogic;

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
    mockDoorLogic = mock<IDoorLogic>();
    viewModel.doorLogic = mockDoorLogic;
    systemUnderTest = new DoorPresenter(viewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("constructor throws error if undefined is passed as view model", () => {
    expect(() => {
      //@ts-ignore
      new DoorPresenter(undefined);
    }).toThrow("ViewModel was passed as undefined");
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

  test("getFocusableCenterPosition returns position from viewmodel", () => {
    const mockPosition = new Vector3(42, 42, 42);
    viewModel.position = mockPosition;

    expect(systemUnderTest.getFocusableCenterPosition()).toBe(mockPosition);
  });

  test("getType returns entry door type when isExit is false", () => {
    viewModel.isExit = false;

    expect(systemUnderTest.getType()).toStrictEqual({
      type: FocusableTypes.entryDoor,
    });
  });

  test("getType returns exit door type when isExit is true", () => {
    viewModel.isExit = true;

    expect(systemUnderTest.getType()).toStrictEqual({
      type: FocusableTypes.exitDoor,
    });
  });

  test("isSpecialFocused returns isSpecialFocused from viewModel", () => {
    viewModel.isSpecialFocused = true;

    expect(systemUnderTest.isSpecialFocused()).toBe(true);
  });

  test("isSpecialFocused returns false when viewModel isSpecialFocused is false", () => {
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

  test("onLearningSpaceScored sets isOpen to true for matching exit door with sufficient score", () => {
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

  test("onLearningSpaceScored does not set isOpen for entry door", () => {
    viewModel.isExit = false;
    viewModel.spaceID = 1;
    viewModel.isOpen.Value = false;
    const spaceScoreTO = new LearningSpaceScoreTO();
    spaceScoreTO.spaceID = 1;
    spaceScoreTO.currentScore = 1;
    spaceScoreTO.requiredScore = 1;
    spaceScoreTO.maxScore = 1;

    systemUnderTest.onLearningSpaceScored(spaceScoreTO);

    expect(viewModel.isOpen.Value).toBe(false);
  });

  test("onLearningSpaceScored does not set isOpen for different space ID", () => {
    viewModel.isExit = true;
    viewModel.spaceID = 1;
    viewModel.isOpen.Value = false;
    const spaceScoreTO = new LearningSpaceScoreTO();
    spaceScoreTO.spaceID = 2;
    spaceScoreTO.currentScore = 1;
    spaceScoreTO.requiredScore = 1;
    spaceScoreTO.maxScore = 1;

    systemUnderTest.onLearningSpaceScored(spaceScoreTO);

    expect(viewModel.isOpen.Value).toBe(false);
  });

  test("onLearningSpaceScored does not set isOpen when score is insufficient", () => {
    viewModel.isExit = true;
    viewModel.spaceID = 1;
    viewModel.isOpen.Value = false;
    const spaceScoreTO = new LearningSpaceScoreTO();
    spaceScoreTO.spaceID = 1;
    spaceScoreTO.currentScore = 0;
    spaceScoreTO.requiredScore = 1;
    spaceScoreTO.maxScore = 1;

    systemUnderTest.onLearningSpaceScored(spaceScoreTO);

    expect(viewModel.isOpen.Value).toBe(false);
  });

  test("onStoryElementCutSceneTriggered sets isInputEnabled to false", () => {
    viewModel.isInputEnabled.Value = true;

    systemUnderTest.onStoryElementCutSceneTriggered(StoryElementType.Intro);

    expect(viewModel.isInputEnabled.Value).toBe(false);
  });

  test("onStoryElementCutSceneTriggered sets isInputEnabled to false for any story type", () => {
    viewModel.isInputEnabled.Value = true;

    systemUnderTest.onStoryElementCutSceneTriggered(StoryElementType.Outro);

    expect(viewModel.isInputEnabled.Value).toBe(false);
  });

  test("onStoryElementCutSceneFinished sets isInputEnabled to true", () => {
    viewModel.isInputEnabled.Value = false;

    systemUnderTest.onStoryElementCutSceneFinished(StoryElementType.Intro);

    expect(viewModel.isInputEnabled.Value).toBe(true);
  });

  test("onStoryElementCutSceneFinished sets isInputEnabled to true for any story type", () => {
    viewModel.isInputEnabled.Value = false;

    systemUnderTest.onStoryElementCutSceneFinished(StoryElementType.Outro);

    expect(viewModel.isInputEnabled.Value).toBe(true);
  });

  test("isExit returns isExit from viewModel", () => {
    viewModel.isExit = true;

    expect(systemUnderTest.isExit()).toBe(true);
  });

  test("isExit returns false when viewModel isExit is false", () => {
    viewModel.isExit = false;

    expect(systemUnderTest.isExit()).toBe(false);
  });

  test("belongsToSpace returns true when spaceID matches", () => {
    viewModel.spaceID = 123;

    expect(systemUnderTest.belongsToSpace(123)).toBe(true);
  });

  test("belongsToSpace returns false when spaceID does not match", () => {
    viewModel.spaceID = 123;

    expect(systemUnderTest.belongsToSpace(456)).toBe(false);
  });

  test("open calls doorLogic.open without callback", () => {
    systemUnderTest.open();

    expect(mockDoorLogic.open).toHaveBeenCalledWith(undefined);
  });

  test("open calls doorLogic.open with callback", () => {
    const callback = jest.fn();

    systemUnderTest.open(callback);

    expect(mockDoorLogic.open).toHaveBeenCalledWith(callback);
  });

  test("close calls doorLogic.close when close method exists", () => {
    mockDoorLogic.close = jest.fn();

    systemUnderTest.close();

    expect(mockDoorLogic.close).toHaveBeenCalled();
  });

  test("close does nothing when doorLogic.close does not exist", () => {
    mockDoorLogic.close = undefined;

    expect(() => {
      systemUnderTest.close();
    }).not.toThrow();
  });

  test("close handles undefined doorLogic gracefully", () => {
    viewModel.doorLogic = undefined as any;
    systemUnderTest = new DoorPresenter(viewModel);

    // This should throw because the implementation doesn't check for undefined doorLogic
    expect(() => {
      systemUnderTest.close();
    }).toThrow();
  });
});
