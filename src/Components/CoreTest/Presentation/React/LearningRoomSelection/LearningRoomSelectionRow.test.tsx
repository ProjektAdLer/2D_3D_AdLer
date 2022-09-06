import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import LearningRoomSelectionRow from "~ReactComponents/LearningRoomSelection/LearningRoomSelectionRow";

describe("LearningRoomSelectionRow", () => {
  test("should render", () => {
    const testTitle = "testTitle";

    const result = render(
      <LearningRoomSelectionRow
        learningRoomTitle={testTitle}
        onClickCallback={() => {}}
      />
    );

    expect(result.getByText(testTitle)).toBeInTheDocument();
  });
});
