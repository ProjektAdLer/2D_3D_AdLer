import { render } from "@testing-library/react";
import ColorPicker from "../../../../../Core/Presentation/React/GeneralComponents/ColorPicker/ColorPicker";
import AvatarColorPalette from "../../../../../Core/Domain/AvatarModels/AvatarColorPalette";
import React from "react";

describe("ColorPicker", () => {
  test("should render", () => {
    const container = render(
      <ColorPicker colors={AvatarColorPalette} onColorClick={() => {}} />,
    );

    expect(container).toMatchSnapshot();
  });

  test("calls onClick when color is clicked", () => {
    const mockCallback = jest.fn();

    const container = render(
      <ColorPicker
        colors={AvatarColorPalette}
        onColorClick={(color: string) => {
          mockCallback();
        }}
      />,
    );

    container.getAllByRole("button")[0].click();

    expect(mockCallback).toHaveBeenCalled();
  });
});
