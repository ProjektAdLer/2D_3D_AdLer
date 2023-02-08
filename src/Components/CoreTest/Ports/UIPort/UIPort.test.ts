import UIPort from "../../../Core/Ports/UIPort/UIPort";
import CoreDIContainer from "../../../../Components/Core/DependencyInjection/CoreDIContainer";
import { mock } from "jest-mock-extended";
import INotificationManagerPresenter from "../../../Core/Presentation/React/GeneralComponents/NotificationManager/INotificationManagerPresenter";
import IBottomTooltipPresenter from "../../../Core/Presentation/React/SpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import { logger } from "../../../../Lib/Logger";
import ElementTO from "../../../Core/Application/DataTransferObjects/ElementTO";

jest.mock("src/Lib/Logger");

describe("UIPort", () => {
  let systemUnderTest: UIPort;

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(UIPort);
  });

  test("displayNotification throws error if LoginModalPresenter is not registered", () => {
    expect(() => {
      systemUnderTest.displayNotification("error message", "error");
    }).toThrowError("NotificationManagerPresenter is not registered");
  });

  test("displayNotification calls the NotificationManagerPresenter with given message and notification type", () => {
    const mockNotificationManagerPresenterMock =
      mock<INotificationManagerPresenter>();
    systemUnderTest.registerNotificationManager(
      mockNotificationManagerPresenterMock
    );

    systemUnderTest.displayNotification("error message", "error");

    expect(
      mockNotificationManagerPresenterMock.presentErrorMessage
    ).toHaveBeenCalledTimes(1);
    expect(
      mockNotificationManagerPresenterMock.presentErrorMessage
    ).toHaveBeenCalledWith("error message", "error");
  });

  test("registerNotificationManager registers the presenter if none is present", () => {
    const mockNotificationManagerPresenterMock =
      mock<INotificationManagerPresenter>();

    systemUnderTest.registerNotificationManager(
      mockNotificationManagerPresenterMock
    );

    expect(systemUnderTest["notificationManagerPresenter"]).toBe(
      mockNotificationManagerPresenterMock
    );
  });

  test("registerNotificationManager throws error if NotificationManagerPresenter is already registered", () => {
    const mockNotificationManagerPresenterMock =
      mock<INotificationManagerPresenter>();
    systemUnderTest.registerNotificationManager(
      mockNotificationManagerPresenterMock
    );
    systemUnderTest.registerNotificationManager(
      mockNotificationManagerPresenterMock
    );

    expect(logger.warn).toHaveBeenCalledTimes(1);
  });
});
