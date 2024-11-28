import { render } from "@testing-library/react";
import ColorPickerButton from "../../../../../Core/Presentation/React/GeneralComponents/ColorPicker/ColorPickerButton";
import React from "react";

describe("ColorPickerButton", () => {
  test("should render", () => {
    const container = render(
      <ColorPickerButton
        className=""
        currentColor="#000000"
        onClick={() => console.log("Button Clicked")}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("calls onClick when clicked", () => {
    const mockCallback = jest.fn();

    const container = render(
      <ColorPickerButton
        className=""
        currentColor="#000000"
        onClick={() => {
          mockCallback();
        }}
      />,
    );

    container.getAllByRole("button")[0].click();

    expect(mockCallback).toHaveBeenCalled();
  });
});
