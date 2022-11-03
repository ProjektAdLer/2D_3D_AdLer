import WelcomePage from "../../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/WelcomePage";
import { fireEvent, render } from "@testing-library/react";
import useBuilderMock from "../CustomHooks/useBuilder/useBuilderMock";
import history from "history/browser";
import "@testing-library/jest-dom";
import React from "react";

const historyPushMock = jest.spyOn(history, "push");
describe("Welcome Page", () => {
  test("should render", () => {
    useBuilderMock([undefined, undefined]);
    render(<WelcomePage />);
  });

  test("on click on first Button calls history.push", () => {
    useBuilderMock([undefined, undefined]);
    const componentUnderTest = render(<WelcomePage />);
    let button: HTMLElement = componentUnderTest.getByText(
      "Gehe zum Lernraum Menü"
    );
    fireEvent.click(button);
    expect(historyPushMock).toHaveBeenCalled();
  });

  test.skip("on click on second Button calls history.push", () => {
    useBuilderMock([undefined, undefined]);
    const componentUnderTest = render(<WelcomePage />);
    let button: HTMLElement = componentUnderTest.getByText("Gehe zum Lernraum");
    fireEvent.click(button);
    expect(historyPushMock).toHaveBeenCalled();
  });
});
