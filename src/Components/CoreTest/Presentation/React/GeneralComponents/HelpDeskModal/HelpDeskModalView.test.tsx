import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import HelpDeskModalViewModel from "../../../../../Core/Presentation/React/GeneralComponents/HelpDeskModal/HelpDeskModalViewModel";
import HelpDeskModal from "../../../../../Core/Presentation/React/GeneralComponents/HelpDeskModal/HelpDeskModal";

let viewModel = new HelpDeskModalViewModel();
viewModel.isOpen.Value = true;

describe("HelpDeskModal", () => {
  test("doesn't render without view model", () => {
    useBuilderMock([undefined, undefined]);
    const { container } = render(<HelpDeskModal />);
    expect(container.firstChild).toBeNull();
  });
  test("should not render when closed", () => {
    viewModel.isOpen.Value = false;

    useBuilderMock([viewModel, undefined]);

    const componentUnderTest = render(<HelpDeskModal />);
    expect(componentUnderTest.container.childElementCount).toBe(0);
  });
  test("should render its content", () => {
    viewModel.isOpen.Value = true;
    useBuilderMock([viewModel, undefined]);

    const componentUnderTest = render(<HelpDeskModal />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });
  test("should close when close button is clicked", () => {
    viewModel.isOpen.Value = true;
    useBuilderMock([viewModel, undefined]);
    const componentUnderTest = render(<HelpDeskModal />);
    const closeButton = componentUnderTest.getByRole("button", { name: "X" });
    fireEvent.click(closeButton);
    expect(viewModel.isOpen.Value).toBe(false);
  });
});
