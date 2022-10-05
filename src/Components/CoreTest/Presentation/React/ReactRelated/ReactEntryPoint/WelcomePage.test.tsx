import { fireEvent, render, within, screen } from "@testing-library/react";
import WelcomePage from "~ReactComponents/ReactRelated/ReactEntryPoint/WelcomePage";
import useBuilderMock from "../CustomHooks/useBuilder/useBuilderMock";
import history from "history/browser";
import "@testing-library/jest-dom";

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
  test("on click on second Button calls history.push", () => {
    useBuilderMock([undefined, undefined]);
    const componentUnderTest = render(<WelcomePage />);
    let button: HTMLElement = componentUnderTest.getByText("Gehe zum Lernraum");
    fireEvent.click(button);
    expect(historyPushMock).toHaveBeenCalled();
  });
});
