import mock from "jest-mock-extended/lib/Mock";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IUIPort from "../../../../../Core/Ports/UIPort/IUIPort";
import ExitModalBuilder from "../../../../../Core/Presentation/React/SpaceDisplay/ExitModal/ExitModalBuilder";
import ExitModalViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/ExitModal/ExitModalViewModel";
import ViewModelControllerProvider from "../../../../../Core/Presentation/ViewModelProvider/ViewModelControllerProvider";

const registerTupelMock = jest.spyOn(
  ViewModelControllerProvider.prototype,
  "registerTupel"
);
const UIPortMock = mock<IUIPort>();

describe("exitModalBuilder", () => {
  let systemUnderTest: ExitModalBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.IUIPort).toConstantValue(UIPortMock);
  });
  beforeEach(() => {
    systemUnderTest = new ExitModalBuilder();
  });
  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildController builds the controller and registers the viewModel and controller", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["viewModel"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeDefined();
  });
  test("buildPresenter builds the presenter and registers presenter with the UIPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(UIPortMock.registerExitModalPresenter).toHaveBeenCalledTimes(1);
    expect(UIPortMock.registerExitModalPresenter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
