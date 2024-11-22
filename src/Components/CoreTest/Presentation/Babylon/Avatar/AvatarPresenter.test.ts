import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import AvatarPresenter from "../../../../Core/Presentation/Babylon/Avatar/AvatarPresenter";
import AvatarViewModel from "../../../../Core/Presentation/Babylon/Avatar/AvatarViewModel";
import { mock } from "jest-mock-extended";
import CharacterAnimationActions from "../../../../Core/Presentation/Babylon/CharacterAnimator/CharacterAnimationActions";
import { Vector3 } from "@babylonjs/core";

describe("AvatarPresenter", () => {
  let systemUnderTest: AvatarPresenter;
  let viewModel: AvatarViewModel;

  beforeEach(() => {
    viewModel = new AvatarViewModel();
    systemUnderTest = new AvatarPresenter(viewModel);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test("AvatarPosition getter return parent node position from viewmodel", () => {
    viewModel.parentNode = mock();
    viewModel.parentNode.position = new Vector3(1, 2, 3);

    expect(systemUnderTest.AvatarPosition).toEqual(new Vector3(1, 2, 3));
  });

  //ANF-ID:[EWE0036,EWE0042]
  test("onStoryElementCutSceneTriggered sets the inputEnabled member of the viewModel member to false", () => {
    viewModel.inputEnabled.Value = true;

    systemUnderTest.onStoryElementCutSceneTriggered();

    expect(viewModel.inputEnabled.Value).toBe(false);
  });

  //ANF-ID:[EWE0043]
  test("onStoryElementCutSceneFinished sets the inputEnabled member of the viewModel member to true", () => {
    viewModel.inputEnabled.Value = false;

    systemUnderTest.onStoryElementCutSceneFinished();

    expect(viewModel.inputEnabled.Value).toBe(true);
  });

  test("onLearningElementLoaded calls the applyAction method of the animationStateMachine member of the viewModel member", () => {
    viewModel.characterAnimator = mock();

    systemUnderTest.onLearningElementLoaded(null);

    expect(viewModel.characterAnimator.transition).toHaveBeenCalledTimes(1);
    expect(viewModel.characterAnimator.transition).toHaveBeenCalledWith(
      CharacterAnimationActions.InteractionStarted,
    );
  });
});
