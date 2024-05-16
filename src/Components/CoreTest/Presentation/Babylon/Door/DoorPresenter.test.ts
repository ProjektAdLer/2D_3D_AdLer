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
      PRESENTATION_TYPES.IBottomTooltipPresenter
    ).toConstantValue(mockBottomTooltipPresenter);
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IExitModalPresenter
    ).toConstantValue(mockExitModalPresenter);
  });

  beforeEach(() => {
    systemUnderTest = new DoorPresenter(new DoorViewModel());
  });

  test("constructor throws error if undefined is passed as view model", () => {
    expect(() => {
      //@ts-ignore
      new DoorPresenter(undefined);
    }).toThrowError();
  });

  test("onAvatarPositionChanged sets isInteractable to true if avatar is within interaction radius", () => {
    viewModel = new DoorViewModel();
    viewModel.position = new Vector3(0, 0, 0);
    systemUnderTest = new DoorPresenter(viewModel);

    systemUnderTest.onAvatarPositionChanged(viewModel.position, 1);

    expect(viewModel.isInteractable.Value).toBe(true);
  });

  test("onAvatarPositionChanged sets isInteractable to false if avatar is outside interaction radius", () => {
    viewModel = new DoorViewModel();
    viewModel.isInteractable.Value = true;
    viewModel.position = new Vector3(0, 0, 0);
    systemUnderTest = new DoorPresenter(viewModel);

    systemUnderTest.onAvatarPositionChanged(new Vector3(42, 42, 42), 0);

    expect(viewModel.isInteractable.Value).toBe(false);
  });

  test("onLearningSpaceScored sets isOpen to true if space id is matching, isExit is true and current score is greater than or equal to required score", () => {
    viewModel = new DoorViewModel();
    viewModel.isExit = true;
    viewModel.spaceID = 1;
    systemUnderTest = new DoorPresenter(viewModel);
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
    viewModel = new DoorViewModel();
    viewModel.isInputEnabled.Value = true;
    systemUnderTest = new DoorPresenter(viewModel);

    systemUnderTest.onStoryElementCutSceneTriggered(StoryElementType.None);

    expect(viewModel.isInputEnabled.Value).toBe(false);
  });

  //ANF-ID: [EWE0043]
  test("onStoryElementCutSceneTriggered sets isInputEnabled to true if any story element cutscene is finished", () => {
    viewModel = new DoorViewModel();
    viewModel.isInputEnabled.Value = false;
    systemUnderTest = new DoorPresenter(viewModel);

    systemUnderTest.onStoryElementCutSceneFinished();

    expect(viewModel.isInputEnabled.Value).toBe(true);
  });
});
