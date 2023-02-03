import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import WorldSelectionRow from "../../../../../Core/Presentation/React/WorldMenu/WorldSelection/WorldSelectionRow";
import React from "react";

describe("WorldSelectionRow", () => {
  test("should render (selected = true)", () => {
    const testTitle = "testTitle";

    const result = render(
      <WorldSelectionRow
        title={testTitle}
        selected={true}
        icon="testIcon"
        onClickCallback={() => {}}
      />
    );

    expect(result.getByText(testTitle)).toBeInTheDocument();
  });
  test("should render (selected = false)", () => {
    const testTitle = "testTitle";

    const result = render(
      <WorldSelectionRow
        title={testTitle}
        selected={false}
        icon="testIcon"
        onClickCallback={() => {}}
      />
    );

    expect(result.getByText(testTitle)).toBeInTheDocument();
  });
});
