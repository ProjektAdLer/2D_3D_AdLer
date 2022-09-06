import { mock, mockDeep } from "jest-mock-extended";
import useBuilderMock from "../CustomHooks/useBuilder/useBuilderMock";
import ILearningRoomSelectionController from "~ReactComponents/LearningRoomSelection/ILearningRoomSelectionController";
import LearningRoomSelectionViewModel from "~ReactComponents/LearningRoomSelection/LearningRoomSelectionViewModel";
import LearningRoomSelection from "~ReactComponents/LearningRoomSelection/LearningRoomSelection";
import { render } from "@testing-library/react";

describe("LearningRoomSelection", () => {
  test("should render", () => {
    useBuilderMock([
      mockDeep<LearningRoomSelectionViewModel>(),
      mock<ILearningRoomSelectionController>(),
    ]);
    render(<LearningRoomSelection />);
  });

  test.todo("extend tests, to test for correct mapping to rows");

  test("doesn't render without controller", () => {
    useBuilderMock([mockDeep<LearningRoomSelectionViewModel>(), undefined]);
    const { container } = render(<LearningRoomSelection />);
    expect(container.firstChild).toBeNull();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, mock<ILearningRoomSelectionController>()]);
    const { container } = render(<LearningRoomSelection />);
    expect(container.firstChild).toBeNull();
  });
});
