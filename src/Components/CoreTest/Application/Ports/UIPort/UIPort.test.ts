import UIPort from "../../../../Core/Application/Ports/UIPort/UIPort";
import CoreDIContainer from "../../../../../Components/Core/DependencyInjection/CoreDIContainer";
import { mock } from "jest-mock-extended";
import IUIAdapter, {
  NotificationType,
} from "../../../../Core/Application/Ports/UIPort/IUIAdapter";

describe("UIPort", () => {
  let systemUnderTest: UIPort;

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(UIPort);
  });

  test("displayNotification calls a registered adapter", () => {
    const uiAdapterMock = mock<IUIAdapter>();
    systemUnderTest.registerAdapter(uiAdapterMock);

    systemUnderTest.displayNotification(
      "error message",
      "error" as NotificationType
    );

    expect(uiAdapterMock.displayNotification).toBeCalledWith(
      "error message",
      "error" as NotificationType
    );
  });
});
