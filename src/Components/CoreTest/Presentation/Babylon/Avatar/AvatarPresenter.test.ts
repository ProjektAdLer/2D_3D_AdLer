import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import AvatarPresenter from "../../../../Core/Presentation/Babylon/Avatar/AvatarPresenter";
import AvatarViewModel from "../../../../Core/Presentation/Babylon/Avatar/AvatarViewModel";
import { mock } from "jest-mock-extended";
import CharacterAnimationActions from "../../../../Core/Presentation/Babylon/CharacterAnimator/CharacterAnimationActions";
import { Vector3 } from "@babylonjs/core";

describe("AvatarPresenter", () => {
  let systemUnderTest: AvatarPresenter;

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get<AvatarPresenter>(
      PORT_TYPES.IAvatarPort,
    );
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test("ViewModel setter sets the private viewModel member", () => {
    const viewModel = new AvatarViewModel();
    systemUnderTest.ViewModel = viewModel;
    expect(systemUnderTest["viewModel"]).toBe(viewModel);
  });

  test("AvatarPosition getter return parent node position from viewmodel", () => {
    const viewModel = new AvatarViewModel();
    viewModel.parentNode = mock();
    viewModel.parentNode.position = new Vector3(1, 2, 3);
    systemUnderTest.ViewModel = viewModel;

    expect(systemUnderTest.AvatarPosition).toEqual(new Vector3(1, 2, 3));
  });

  //ANF-ID:[EWE0036,EWE0042]
  test("onStoryElementCutSceneTriggered sets the inputEnabled member of the viewModel member to false", () => {
    const viewModel = new AvatarViewModel();
    viewModel.inputEnabled.Value = true;
    systemUnderTest.ViewModel = viewModel;

    systemUnderTest.onStoryElementCutSceneTriggered();

    expect(viewModel.inputEnabled.Value).toBe(false);
  });

  //ANF-ID:[EWE0043]
  test("onStoryElementCutSceneFinished sets the inputEnabled member of the viewModel member to true", () => {
    const viewModel = new AvatarViewModel();
    viewModel.inputEnabled.Value = false;
    systemUnderTest.ViewModel = viewModel;

    systemUnderTest.onStoryElementCutSceneFinished();

    expect(viewModel.inputEnabled.Value).toBe(true);
  });

  test("onLearningElementLoaded calls the applyAction method of the animationStateMachine member of the viewModel member", () => {
    const viewModel = new AvatarViewModel();
    viewModel.characterAnimator = mock();
    systemUnderTest.ViewModel = viewModel;

    systemUnderTest.onLearningElementLoaded(null);

    expect(viewModel.characterAnimator.transition).toBeCalledTimes(1);
    expect(viewModel.characterAnimator.transition).toBeCalledWith(
      CharacterAnimationActions.InteractionStarted,
    );
  });
});
