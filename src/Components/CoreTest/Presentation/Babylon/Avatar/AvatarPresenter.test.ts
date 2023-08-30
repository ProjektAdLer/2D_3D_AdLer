import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import AvatarPresenter from "../../../../Core/Presentation/Babylon/Avatar/AvatarPresenter";
import AvatarViewModel, {
  AvatarAnimationAction,
  AvatarAnimationState,
} from "../../../../Core/Presentation/Babylon/Avatar/AvatarViewModel";
import { IStateMachine } from "../../../../Core/Presentation/Babylon/Avatar/StateMachine";
import { mock } from "jest-mock-extended";

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
    viewModel.animationStateMachine =
      mock<IStateMachine<AvatarAnimationState, AvatarAnimationAction>>();
    systemUnderTest.ViewModel = viewModel;

    systemUnderTest.onLearningElementLoaded(null);

    expect(viewModel.animationStateMachine.applyAction).toBeCalledTimes(1);
  });
});
