import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import INotificationManagerController from "../../../../../Core/Presentation/React/GeneralComponents/NotificationManager/INotificationManagerController";
import NotificationManager from "../../../../../Core/Presentation/React/GeneralComponents/NotificationManager/NotificationManager";
import NotificationManagerViewModel from "../../../../../Core/Presentation/React/GeneralComponents/NotificationManager/NotificationManagerViewModel";
import "../../../../../Core/Types/array.extensions";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

let fakeModel = new NotificationManagerViewModel();
const fakeController = mock<INotificationManagerController>();

describe("NotificationManager", () => {
  test("should render multible modals", () => {
    fakeModel.errors.Value = [
      {
        message: "test",
        type: "error",
      },
      {
        message: "test",
        type: "error",
      },
      {
        message: "test2",
        type: "notification",
      },
    ];
    useBuilderMock([fakeModel, fakeController]);
    const componentUnderTest = render(<NotificationManager />);

    expect(componentUnderTest.getByText("test2")).toBeInTheDocument();

    fireEvent.click(componentUnderTest.getByText("X"));

    expect(componentUnderTest.getByText("test")).toBeInTheDocument();
  });
});
