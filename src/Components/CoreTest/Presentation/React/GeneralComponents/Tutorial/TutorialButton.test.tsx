import React from "react";
import { render } from "@testing-library/react";
import TutorialButton from "../../../../../Core/Presentation/React/GeneralComponents/Tutorial/TutorialButton";

describe("TutorialButton", () => {
  //ANF-ID: [ELG0014]
  test("should render", () => {
    const renderResult = render(<TutorialButton />);

    expect(renderResult.container).not.toBeEmptyDOMElement();
  });
  //ANF-ID: [ELG0014]
  test("click on button calls window.open", () => {
    const openSpy = jest.spyOn(window, "open");
    const renderResult = render(<TutorialButton url="test" />);

    renderResult.getByRole("button").click();

    expect(openSpy).toBeCalledTimes(1);
    expect(openSpy).toHaveBeenCalledWith("test", "_blank", "noreferrer");
  });
});
