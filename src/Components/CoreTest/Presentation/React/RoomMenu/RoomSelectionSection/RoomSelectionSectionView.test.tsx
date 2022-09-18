import { mock, mockDeep } from "jest-mock-extended";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import ISpaceSelectionController from "~ReactComponents/SpaceMenu/SpaceSelection/ISpaceSelectionController";
import SpaceSelectionViewModel from "~ReactComponents/SpaceMenu/SpaceSelection/SpaceSelectionViewModel";
import SpaceSelection from "~ReactComponents/SpaceMenu/SpaceSelection/SpaceSelection";
import { render } from "@testing-library/react";

describe("LearningRoomSelection", () => {
  test("should render", () => {
    useBuilderMock([
      mockDeep<SpaceSelectionViewModel>(),
      mock<ISpaceSelectionController>(),
    ]);
    render(<SpaceSelection />);
  });

  test.todo("extend tests, to test for correct mapping to rows");

  test("doesn't render without controller", () => {
    useBuilderMock([mockDeep<SpaceSelectionViewModel>(), undefined]);
    const { container } = render(<SpaceSelection />);
    expect(container.firstChild).toBeNull();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, mock<ISpaceSelectionController>()]);
    const { container } = render(<SpaceSelection />);
    expect(container.firstChild).toBeNull();
  });
});
