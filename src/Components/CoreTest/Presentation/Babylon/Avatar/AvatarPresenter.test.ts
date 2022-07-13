import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import AvatarPresenter from "../../../../Core/Presentation/Babylon/Avatar/AvatarPresenter";
import AvatarViewModel from "../../../../Core/Presentation/Babylon/Avatar/AvatarViewModel";

describe("AvatarPresenter", () => {
  let presenter: AvatarPresenter;

  beforeEach(() => {
    presenter = CoreDIContainer.get<AvatarPresenter>(PORT_TYPES.IAvatarPort);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test("ViewModel setter sets the private viewModel member", () => {
    const viewModel = new AvatarViewModel();
    presenter.ViewModel = viewModel;
    expect(presenter["viewModel"]).toBe(viewModel);
  });

  test.todo("presentAvatar sets customization info in the viewmodel");
});
