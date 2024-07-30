import React from "react";
import { fireEvent, render } from "@testing-library/react";
import InternetLossModal from "../../../../../Core/Presentation/React/GeneralComponents/InternetLossModal/InternetLossModal";

describe("InternetLossModal", () => {
  test("doesn't render initially", () => {
    const { container } = render(<InternetLossModal />);
    expect(container.firstChild).toBeNull();
  });
  test("should render its content when connection is lost", () => {
    const { container } = render(<InternetLossModal />);
    expect(container.firstChild).toBeNull();
    fireEvent(window, new Event("offline"));
    expect(container.firstChild).not.toBeNull();
  });
  test("should close when close button is clicked", () => {
    const componentUnderTest = render(<InternetLossModal />);
    expect(componentUnderTest.container.firstChild).toBeNull();
    fireEvent(window, new Event("offline"));
    expect(componentUnderTest.container.firstChild).not.toBeNull();
    const closeButton = componentUnderTest.getByAltText("CloseButton");
    fireEvent.click(closeButton);
    expect(componentUnderTest.container.firstChild).toBeNull();
  });
  // ANF-ID: [EWE0022]
  test("should close when connection is back", () => {
    const componentUnderTest = render(<InternetLossModal />);
    expect(componentUnderTest.container.firstChild).toBeNull();
    fireEvent(window, new Event("offline"));
    expect(componentUnderTest.container.firstChild).not.toBeNull();
    fireEvent(window, new Event("online"));
    expect(componentUnderTest.container.firstChild).toBeNull();
  });
});
