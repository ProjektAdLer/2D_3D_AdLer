import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import AvatarPresenter from "../../../../Core/Presentation/Babylon/Avatar/AvatarPresenter";
import AvatarViewModel from "../../../../Core/Presentation/Babylon/Avatar/AvatarViewModel";
import { mock } from "jest-mock-extended";
import CharacterAnimationActions from "../../../../Core/Presentation/Babylon/CharacterAnimator/CharacterAnimationActions";

describe("AvatarPresenter", () => {
  let systemUnderTest: AvatarPresenter;

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.get<AvatarPresenter>(
      PORT_TYPES.IAvatarPort
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

  test("onLearningElementLoaded calls the applyAction method of the animationStateMachine member of the viewModel member", () => {
    const viewModel = new AvatarViewModel();
    viewModel.characterAnimator = mock();
    systemUnderTest.ViewModel = viewModel;

    systemUnderTest.onLearningElementLoaded(null);

    expect(viewModel.characterAnimator.transition).toBeCalledTimes(1);
    expect(viewModel.characterAnimator.transition).toBeCalledWith(
      CharacterAnimationActions.InteractionStarted
    );
  });
});
