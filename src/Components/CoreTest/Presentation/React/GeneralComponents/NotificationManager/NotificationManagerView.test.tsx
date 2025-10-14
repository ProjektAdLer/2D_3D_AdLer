import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import INotificationManagerController from "../../../../../Core/Presentation/React/GeneralComponents/NotificationManager/INotificationManagerController";
import NotificationManager from "../../../../../Core/Presentation/React/GeneralComponents/NotificationManager/NotificationManager";
import NotificationManagerViewModel from "../../../../../Core/Presentation/React/GeneralComponents/NotificationManager/NotificationManagerViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import React from "react";
import { LogLevelTypes } from "../../../../../Core/Domain/Types/LogLevelTypes";

// Mock HTMLAudioElement
const mockPlay = jest.fn().mockResolvedValue(undefined);
global.Audio = jest.fn().mockImplementation(() => ({
  play: mockPlay,
  pause: jest.fn(),
  volume: 0.5,
})) as any;

let fakeModel = new NotificationManagerViewModel();
const fakeController = mock<INotificationManagerController>();

describe("NotificationManager", () => {
  beforeEach(() => {
    mockPlay.mockClear();
  });
  test("should render multiple modals", () => {
    fakeModel.messages.Value = [
      {
        message: "test",
        type: LogLevelTypes.ERROR,
      },
      {
        message: "test",
        type: LogLevelTypes.ERROR,
      },
      {
        message: "test2",
        type: LogLevelTypes.WARN,
      },
    ];
    useBuilderMock([fakeModel, fakeController]);
    const componentUnderTest = render(<NotificationManager />);

    expect(componentUnderTest.getByText("test2")).toBeInTheDocument();

    fireEvent.click(componentUnderTest.getByAltText("CloseButton"));

    expect(componentUnderTest.getByText("test")).toBeInTheDocument();
  });

  test("plays sound when notification appears", () => {
    fakeModel.messages.Value = [
      {
        message: "test notification",
        type: LogLevelTypes.ERROR,
      },
    ];
    useBuilderMock([fakeModel, fakeController]);

    render(<NotificationManager />);

    expect(mockPlay).toHaveBeenCalled();
  });
});
