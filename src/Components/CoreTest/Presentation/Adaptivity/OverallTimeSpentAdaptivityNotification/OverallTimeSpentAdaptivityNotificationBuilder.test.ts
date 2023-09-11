import INotificationPort from "../../../../Core/Application/Ports/Interfaces/INotificationPort";
import mock from "jest-mock-extended/lib/Mock";
import OverallTimeSpentAdaptivityNotificationBuilder from "../../../../Core/Presentation/Adaptivity/OverallTimeSpentAdaptivityNotification/OverallTimeSpentAdaptivityNotificationBuilder";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IUIPort from "../../../../Core/Application/Ports/Interfaces/INotificationPort";

const uiPortMock = mock<INotificationPort>();

describe("OverallTimeSpentAdaptivityNotificationBuilder", () => {
  let systemUnderTest: OverallTimeSpentAdaptivityNotificationBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(PORT_TYPES.INotificationPort).toConstantValue(
      uiPortMock
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  beforeEach(() => {
    systemUnderTest = new OverallTimeSpentAdaptivityNotificationBuilder();
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
      systemUnderTest["presenter"]
    );
  });
});
