import { fireEvent, render } from "@testing-library/react";
import ColorPickerModal from "../../../../../Core/Presentation/React/GeneralComponents/ColorPicker/ColorPickerModal";
import React from "react";

describe("ColorPickerModal", () => {
  test("should render", () => {
    const container = render(
      <ColorPickerModal
        showModal={true}
        onClose={() => console.log("Modal Closed")}
        onColorClickFunction={(color) => {
          console.log(color);
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });
  test("should not render when showModal is false", () => {
    const container = render(
      <ColorPickerModal
        showModal={false}
        onClose={() => console.log("Modal Closed")}
        onColorClickFunction={(color) => {
          console.log(color);
        }}
      />,
    );
    expect(container.container).toBeEmptyDOMElement();
  });
  test("onColorClickFunction should should correctly relay call", () => {
    const mockOnColorClickFunction = jest.fn();
    const container = render(
      <ColorPickerModal
        showModal={true}
        onClose={() => console.log("Modal Closed")}
        onColorClickFunction={mockOnColorClickFunction}
      />,
    );
    container.getAllByRole("button")[0].click();
    expect(mockOnColorClickFunction).toHaveBeenCalled();
  });
});
