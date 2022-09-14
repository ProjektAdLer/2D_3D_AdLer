import { mock, mockDeep } from "jest-mock-extended";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import IRoomSelectionSectionController from "~ReactComponents/RoomMenu/RoomSelectionSection/IRoomSelectionSectionController";
import RoomSelectionSectionViewModel from "~ReactComponents/RoomMenu/RoomSelectionSection/RoomSelectionSectionViewModel";
import RoomSelectionSection from "~ReactComponents/RoomMenu/RoomSelectionSection/RoomSelectionSection";
import { render } from "@testing-library/react";

describe("LearningRoomSelection", () => {
  test("should render", () => {
    useBuilderMock([
      mockDeep<RoomSelectionSectionViewModel>(),
      mock<IRoomSelectionSectionController>(),
    ]);
    render(<RoomSelectionSection />);
  });

  test.todo("extend tests, to test for correct mapping to rows");

  test("doesn't render without controller", () => {
    useBuilderMock([mockDeep<RoomSelectionSectionViewModel>(), undefined]);
    const { container } = render(<RoomSelectionSection />);
    expect(container.firstChild).toBeNull();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, mock<IRoomSelectionSectionController>()]);
    const { container } = render(<RoomSelectionSection />);
    expect(container.firstChild).toBeNull();
  });
});
