import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SpaceSelectionRow from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/SpaceSelectionRow";
import React from "react";

describe("SpaceSelectionRow", () => {
  test("should render", () => {
    const testTitle = "testTitle";

    const result = render(
      <SpaceSelectionRow
        spaceTitle={testTitle}
        selected={true}
        onClickCallback={() => {}}
      />
    );

    expect(result.getByText(testTitle)).toBeInTheDocument();
  });
});
