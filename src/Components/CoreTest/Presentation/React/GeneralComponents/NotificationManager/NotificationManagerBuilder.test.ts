import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IUIPort from "../../../../../Core/Ports/UIPort/IUIPort";
import NotificationManagerBuilder from "../../../../../Core/Presentation/React/GeneralComponents/NotificationManager/NotificationManagerBuilder";
import NotificationManagerController from "../../../../../Core/Presentation/React/GeneralComponents/NotificationManager/NotificationManagerController";
import NotificationManagerPresenter from "../../../../../Core/Presentation/React/GeneralComponents/NotificationManager/NotificationManagerPresenter";
import NotificationManagerViewModel from "../../../../../Core/Presentation/React/GeneralComponents/NotificationManager/NotificationManagerViewModel";
import IViewModelControllerProvider from "../../../../../Core/Presentation/ViewModelProvider/IViewModelControllerProvider";

const viewModelControllerProviderMock = mock<IViewModelControllerProvider>();
const UIPortMock = mock<IUIPort>();

describe("NotificationManagerBuilder", () => {
  let systemUnderTest: NotificationManagerBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.IUIPort).toConstantValue(UIPortMock);
    CoreDIContainer.rebind(
      CORE_TYPES.IViewModelControllerProvider
    ).toConstantValue(viewModelControllerProviderMock);
  });

  beforeEach(() => {
    systemUnderTest = new NotificationManagerBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildController builds the controller and registers it and the viewModel with the VMCProvider", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["controller"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeInstanceOf(
      NotificationManagerController
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledTimes(
      1
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledWith(
      systemUnderTest["viewModel"],
      systemUnderTest["controller"],
      NotificationManagerViewModel
    );
  });

  test("buildPresenter builds the presenter and register it with the worldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      NotificationManagerPresenter
    );
    expect(UIPortMock.registerNotificationManager).toHaveBeenCalledTimes(1);
    expect(UIPortMock.registerNotificationManager).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
