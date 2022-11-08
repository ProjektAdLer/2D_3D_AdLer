import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import MenuTutorial from "../../../../../Core/Presentation/React/SpaceMenu/MenuTutorial/MenuTutorial";

describe("MenuTutorial", () => {
  test("should render", () => {
    render(<MenuTutorial />);
  });
  test("should render closed, when clicked", () => {
    const componentUnderTest = render(<MenuTutorial />);
    fireEvent.click(componentUnderTest.container.children[0].children[0]);
    expect(
      componentUnderTest.queryByText("Leftclick this text to minimize")
    ).not.toBeInTheDocument();
  });
});
