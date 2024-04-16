import React from "react";
import { render } from "@testing-library/react";
import TutorialPdfButton from "../../../../../Core/Presentation/React/GeneralComponents/Tutorial/TutorialPdfButton";

describe("TutorialPdfButton", () => {
  //ANF-ID: [ELG00014]
  test("should render", () => {
    const renderResult = render(<TutorialPdfButton />);

    expect(renderResult.container).not.toBeEmptyDOMElement();
  });
  //ANF-ID: [ELG00014]
  test("click on button calls window.open", () => {
    const openSpy = jest.spyOn(window, "open");
    const renderResult = render(<TutorialPdfButton pdfFileUrl="test" />);

    renderResult.getByRole("button").click();

    expect(openSpy).toBeCalledTimes(1);
    expect(openSpy).toHaveBeenCalledWith("test", "_blank", "noreferrer");
  });
});
