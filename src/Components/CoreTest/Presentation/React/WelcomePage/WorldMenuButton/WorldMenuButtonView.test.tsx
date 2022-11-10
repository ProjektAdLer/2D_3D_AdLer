import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import WorldMenuButton from "../../../../../Core/Presentation/React/WelcomePage/WorldMenuButton/WorldMenuButtonView";
import WorldMenuButtonViewModel from "../../../../../Core/Presentation/React/WelcomePage/WorldMenuButton/WorldMenuButtonViewModel";

import history from "history/browser";

let mockViewModel = new WorldMenuButtonViewModel();
const historyPushMock = jest.spyOn(history, "push");
describe("WorldMenuButton", () => {
  test("should render", () => {
    useBuilderMock([mockViewModel, undefined]);
    render(<WorldMenuButton />);
  });

  test("WorldMenuButton Tailwind Styling contains grey backgroundColor if not logged in", () => {
    mockViewModel.loggedInMoodle.Value = false;
    useBuilderMock([mockViewModel, undefined]);
    const componentUnderTest = render(<WorldMenuButton />);

    const style =
      componentUnderTest.container.children[0].children[0].className;
    expect(style).toContain("bg-adlerdeactivated");
  });

  test("WorldMenuButton Tailwind Styling contains normal backgroundColor if logged in", () => {
    mockViewModel.loggedInMoodle.Value = true;
    useBuilderMock([mockViewModel, undefined]);
    const componentUnderTest = render(<WorldMenuButton />);
    const style =
      componentUnderTest.container.children[0].children[0].className;
    expect(style).toContain("bg-adlerblue");
  });
  test("on click calls history.push", () => {
    useBuilderMock([mockViewModel, undefined]);
    const componentUnderTest = render(<WorldMenuButton />);
    let button: HTMLElement = componentUnderTest.getByText(
      "Gehe zum Lernraum Menü"
    );
    fireEvent.click(button);
    expect(historyPushMock).toHaveBeenCalled();
  });
});
