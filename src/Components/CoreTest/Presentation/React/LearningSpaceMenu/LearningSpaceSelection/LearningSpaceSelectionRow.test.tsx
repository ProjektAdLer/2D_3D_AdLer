import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import LearningSpaceSelectionRow from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceSelection/List/LearningSpaceSelectionRow";
import React from "react";

describe("SpaceSelectionRow", () => {
  test("should render", () => {
    const testTitle = "testTitle";

    const result = render(
      <LearningSpaceSelectionRow
        spaceTitle={testTitle}
        selected={true}
        onClickCallback={() => {}}
      />
    );

    expect(result.getByText(testTitle)).toBeInTheDocument();
  });
});
