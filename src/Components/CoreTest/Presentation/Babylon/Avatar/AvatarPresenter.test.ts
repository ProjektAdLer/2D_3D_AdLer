import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import AvatarPresenter from "../../../../Core/Presentation/Babylon/Avatar/AvatarPresenter";
import AvatarViewModel from "../../../../Core/Presentation/Babylon/Avatar/AvatarViewModel";

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

  test.todo("presentAvatar sets customization info in the viewmodel");
});
