import INotificationPort from "../../../../Core/Application/Ports/Interfaces/INotificationPort";
import mock from "jest-mock-extended/lib/Mock";
import BreakTimeNotificationBuilder from "../../../../Core/Presentation/Adaptivity/BreakTimeNotification/BreakTimeNotificationBuilder";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import {
  History,
  LocationScope,
} from "../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/History";

const uiPortMock = mock<INotificationPort>();

describe("BreakTimeNotificationBuilder", () => {
  let systemUnderTest: BreakTimeNotificationBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(PORT_TYPES.INotificationPort).toConstantValue(
      uiPortMock
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    systemUnderTest = new BreakTimeNotificationBuilder();
    jest
      .spyOn(History, "currentLocationScope")
      .mockReturnValue(LocationScope.spaceMenu);
  });

  test("buildController builds the controller and registers the viewModel and controller", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["viewModel"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeDefined();
  });

  test("buildPresenter registers presenter with CoreDIContainer", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(uiPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"],
      LocationScope.spaceMenu
    );
  });
});
