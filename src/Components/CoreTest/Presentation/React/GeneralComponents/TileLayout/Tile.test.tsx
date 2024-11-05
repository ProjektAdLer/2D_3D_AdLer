import { render } from "@testing-library/react";
import React from "react";
import Tile from "../../../../../Core/Presentation/React/GeneralComponents/TileLayout/Tile";

const img = require("../../../../../../Assets/3dModels/avatar/hair/hairstyles/Hair_backhead_256.png");

describe("Tile", () => {
  test("should render", () => {
    const renderResult = render(<Tile image={img} onClick={() => {}} />);

    expect(renderResult.container).toMatchSnapshot();
  });

  test("click calls given onClick function", () => {
    const onClick = jest.fn();
    const renderResult = render(<Tile image={img} onClick={onClick} />);

    renderResult.getByRole("button").click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
