import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SpaceSelectionRow from "~ReactComponents/SpaceMenu/SpaceSelection/SpaceSelectionRow";

describe("RoomSelectionSectionRow", () => {
  test("should render", () => {
    const testTitle = "testTitle";

    const result = render(
      <SpaceSelectionRow spaceTitle={testTitle} onClickCallback={() => {}} />
    );

    expect(result.getByText(testTitle)).toBeInTheDocument();
  });
});
