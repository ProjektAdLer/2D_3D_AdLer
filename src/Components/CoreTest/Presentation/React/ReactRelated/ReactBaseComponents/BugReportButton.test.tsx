import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import BugReportButton from "../../../../../Core/Presentation/React/ReactRelated/ReactBaseComponents/BugReportButton";

const windowMock = jest.spyOn(window, "open");
describe("BugReport Button", () => {
  //ANF-ID: [ELG00015]
  it("should render ", () => {
    render(<BugReportButton />);
  });
  //ANF-ID: [ELG00015]
  test("onClick should work", () => {
    const componentUnderTest = render(<BugReportButton />);
    fireEvent.click(componentUnderTest.getByRole("button"));
    expect(windowMock).toHaveBeenCalled();
  });
});
