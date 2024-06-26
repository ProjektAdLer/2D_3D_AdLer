import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import LogExportButton from "../../../../../Core/Presentation/React/ReactRelated/ReactBaseComponents/LogExportButton";
import Logger from "../../../../../Core/Adapters/Logger/Logger";

const loggerMock = jest.spyOn(Logger.prototype, "exportLog");
describe("BugReport Button", () => {
  //ANF-ID: [ELG0013]
  it("should render ", () => {
    render(<LogExportButton />);
  });
  //ANF-ID: [ELG0013]
  test("onClick should work", () => {
    const componentUnderTest = render(<LogExportButton />);
    fireEvent.click(componentUnderTest.getByRole("button"));
    expect(loggerMock).toHaveBeenCalled();
  });
});
