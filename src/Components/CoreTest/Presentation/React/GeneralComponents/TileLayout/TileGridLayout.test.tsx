import { render } from "@testing-library/react";
import React from "react";
import TileGridLayout from "../../../../../Core/Presentation/React/GeneralComponents/TileLayout/TileGridLayout";

describe("TileGridLayout", () => {
  test("should render", () => {
    const contents = [
      {
        id: 1,
        title: "title",
        image: "image",
      },
    ];

    const renderResult = render(
      <TileGridLayout
        tileContents={contents}
        columns={2}
        onTileClick={() => {}}
      />,
    );
    expect(renderResult.container).toMatchSnapshot();
  });

  test("calls onTileClick with id when tile is clicked", () => {
    const contents = [
      {
        id: 1,
        title: "title",
        image: "image",
      },
      {
        id: 2,
        title: "title",
        image: "image",
      },
    ];

    const onTileClick = jest.fn();
    const renderResult = render(
      <TileGridLayout
        tileContents={contents}
        columns={2}
        onTileClick={onTileClick}
      />,
    );

    renderResult.getAllByRole("button")[0].click();

    expect(onTileClick).toHaveBeenCalledTimes(1);
    expect(onTileClick).toHaveBeenCalledWith(1);
  });
});
