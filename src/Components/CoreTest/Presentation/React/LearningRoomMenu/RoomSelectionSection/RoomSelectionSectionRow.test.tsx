import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import RoomSelectionSectionRow from "~ReactComponents/RoomMenu/RoomSelectionSection/RoomSelectionSectionRow";

describe("RoomSelectionSectionRow", () => {
  test("should render", () => {
    const testTitle = "testTitle";

    const result = render(
      <RoomSelectionSectionRow
        roomTitle={testTitle}
        onClickCallback={() => {}}
      />
    );

    expect(result.getByText(testTitle)).toBeInTheDocument();
  });
});
