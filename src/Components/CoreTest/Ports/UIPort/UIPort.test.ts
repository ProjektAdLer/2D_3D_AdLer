import UIPort from "../../../Core/Ports/UIPort/UIPort";
import CoreDIContainer from "../../../../Components/Core/DependencyInjection/CoreDIContainer";
import { mock } from "jest-mock-extended";
import INotificationManagerPresenter from "../../../Core/Presentation/React/GeneralComponents/NotificationManager/INotificationManagerPresenter";
import IBottomTooltipPresenter from "../../../Core/Presentation/React/SpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import { ElementTO } from "../../../Core/Ports/WorldPort/IWorldPort";
import { logger } from "../../../../Lib/Logger";

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

  test("hideBottomTooltip throws error if BottomTooltipPresenter is not registered", () => {
    expect(() => {
      systemUnderTest.hideBottomTooltip();
    }).toThrowError("BottomTooltipPresenter not registered");
  });

  test("hideBottomTooltip calls the BottomTooltipPresenter hide method", () => {
    const mockBottomTooltipPresenterMock = mock<IBottomTooltipPresenter>();
    systemUnderTest.registerBottomTooltipPresenter(
      mockBottomTooltipPresenterMock
    );

    systemUnderTest.hideBottomTooltip();

    expect(mockBottomTooltipPresenterMock.hide).toHaveBeenCalledTimes(1);
  });

  test("displayElementTooltip throws error if BottomTooltipPresenter is not registered", () => {
    expect(() => {
      systemUnderTest.displayElementTooltip({} as ElementTO);
    }).toThrowError("BottomTooltipPresenter not registered");
  });

  test("displayElementTooltip calls the BottomTooltipPresenter displayElement method", () => {
    const mockBottomTooltipPresenterMock = mock<IBottomTooltipPresenter>();
    systemUnderTest.registerBottomTooltipPresenter(
      mockBottomTooltipPresenterMock
    );
    const ElementTO: ElementTO = {
      id: 42,
      name: "name",
      elementData: {
        type: "h5p",
      },
    };

    systemUnderTest.displayElementTooltip(ElementTO);

    expect(mockBottomTooltipPresenterMock.displayElement).toHaveBeenCalledTimes(
      1
    );
    expect(mockBottomTooltipPresenterMock.displayElement).toHaveBeenCalledWith(
      ElementTO
    );
  });

  test("registerBottomTooltipPresenter registeres the presenter if none is present", () => {
    const mockBottomTooltipPresenterMock = mock<IBottomTooltipPresenter>();

    systemUnderTest.registerBottomTooltipPresenter(
      mockBottomTooltipPresenterMock
    );

    expect(systemUnderTest["bottomTooltipPresenter"]).toBe(
      mockBottomTooltipPresenterMock
    );
  });

  test("registerBottomTooltipPresenter warns if BottomTooltipPresenter is already registered", () => {
    const mockBottomTooltipPresenterMock = mock<IBottomTooltipPresenter>();
    systemUnderTest.registerBottomTooltipPresenter(
      mockBottomTooltipPresenterMock
    );
    systemUnderTest.registerBottomTooltipPresenter(
      mockBottomTooltipPresenterMock
    );

    expect(logger.warn).toHaveBeenCalledTimes(1);
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
