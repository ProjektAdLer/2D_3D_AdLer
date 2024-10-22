import React from "react";
import BreakTimeNotificationContent from "../../../../../Core/Presentation/React/GeneralComponents/BreakTimeNotificationOverview/BreakTimeNotificationContent";
import { act, fireEvent, render } from "@testing-library/react";
import { shortBreakTimeNotificationContents } from "../../../../../Core/Domain/BreakTimeNotifications/BreakTimeNotifications";

describe("BreakTimeNotificationContent", () => {
  test("should render", () => {
    const renderResult = render(
      <BreakTimeNotificationContent
        breakTimeNotification={shortBreakTimeNotificationContents[0]}
      />,
    );

    expect(renderResult.container).not.toBeEmptyDOMElement();
    expect(renderResult.container).toMatchSnapshot();
  });

  // ANF-ID: [EKJ0003]
  test("click on navigation dot changes current slide image", () => {
    const renderResult = render(
      <BreakTimeNotificationContent
        breakTimeNotification={shortBreakTimeNotificationContents[0]}
      />,
    );

    act(() => {
      const navigationDots = renderResult.getAllByRole("button");
      fireEvent.click(navigationDots[1]);
    });

    expect(renderResult.getByRole("presentation").getAttribute("src")).toBe(
      shortBreakTimeNotificationContents[0].images[1],
    );
  });
});
