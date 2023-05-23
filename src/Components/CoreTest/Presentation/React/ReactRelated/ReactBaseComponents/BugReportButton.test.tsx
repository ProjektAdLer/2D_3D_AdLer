import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import BugReportButton from "../../../../../Core/Presentation/React/ReactRelated/ReactBaseComponents/BugReportButton";

const windowMock = jest.spyOn(window, "open");
describe("BugReport Button", () => {
  it("should render ", () => {
    render(<BugReportButton />);
  });
  test("onClick should work", () => {
    const componentUnderTest = render(<BugReportButton />);
    fireEvent.click(componentUnderTest.getByRole("button"));
    expect(windowMock).toHaveBeenCalled();
  });
});
