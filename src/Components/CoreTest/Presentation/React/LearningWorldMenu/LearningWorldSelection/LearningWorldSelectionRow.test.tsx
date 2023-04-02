import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import LearningWorldSelectionRow from "../../../../../Core/Presentation/React/LearningWorldMenu/LearningWorldSelection/LearningWorldSelectionRow";
import React from "react";

describe("LearningWorldSelectionRow", () => {
  test("should render (selected = true)", () => {
    const testTitle = "testTitle";

    const result = render(
      <LearningWorldSelectionRow
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
      <LearningWorldSelectionRow
        title={testTitle}
        selected={false}
        icon="testIcon"
        onClickCallback={() => {}}
      />
    );

    expect(result.getByText(testTitle)).toBeInTheDocument();
  });
});
