import { render } from "@testing-library/react";
import LearningWorldMenu from "~ReactComponents/ReactEntryPoint/LearningWorldMenu";

jest.mock("~ReactComponents/HeaderBar/HeaderBar", () => "mocked");
jest.mock(
  "~ReactComponents/LearningRoomSelection/LearningRoomSelection",
  () => "mocked"
);

describe("LearningWorldMenu", () => {
  test("should render", () => {
    render(<LearningWorldMenu />);
  });
});
