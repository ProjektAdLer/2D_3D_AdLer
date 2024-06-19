import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import React from "react";
import LearningElementModalController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalController";
import LearningElementModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import LearningElementModal from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModal";
import { WeightAnimationPropertyInfo } from "@babylonjs/loaders/glTF/2.0/glTFLoaderAnimation";
import { LearningElementTypes } from "../../../../../Core/Domain/Types/LearningElementTypes";

let mockViewModel = new LearningElementModalViewModel();
mockViewModel.isOpen.Value = true;
mockViewModel.id.Value = 123;
mockViewModel.type.Value = "text";
mockViewModel.parentWorldID.Value = 456;
mockViewModel.isScoreable.Value = true;

const mockController = mock<LearningElementModalController>();

jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/ImageComponent.tsx",
  () => () => <div>Hello World</div>
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/H5PContent",
  () => () => <div>Hello World</div>
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/VideoComponent.tsx",
  () => () => <div>Hello World</div>
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/TextComponent.tsx",
  () => () => <div>Hello World</div>
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/PDFComponent.tsx",
  () => () => <div>Hello World</div>
);
jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/SubComponents/PrimitiveH5PContent.tsx",
  () => () => <div>Hello World</div>
);

describe("LearningElementModal", () => {
  test("doesn't render without controller", () => {
    useBuilderMock([mockViewModel, undefined]);
    const { container } = render(<LearningElementModal />);
    expect(container.firstChild).toBeNull();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, mockController]);
    const { container } = render(<LearningElementModal />);
    expect(container.firstChild).toBeNull();
  });

  // ANF-ID: [EWE0038]
  test("should not render when closed", () => {
    mockViewModel.isOpen.Value = false;

    useBuilderMock([mockViewModel, mockController]);

    const componentUnderTest = render(<LearningElementModal />);
    expect(componentUnderTest.container.childElementCount).toBe(0);

    mockViewModel.isOpen.Value = true;
  });

  test("should render its content", () => {
    useBuilderMock([mockViewModel, mockController]);

    const componentUnderTest = render(<LearningElementModal />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });

  // ANF-ID: [EWE0037]
  test.each([
    [LearningElementTypes.text],
    [LearningElementTypes.pdf],
    [LearningElementTypes.image],
    [LearningElementTypes.video],
    [LearningElementTypes.h5p],
    [LearningElementTypes.primitiveH5P],
  ])("should render its content with the correct type", (type) => {
    mockViewModel.type.Value = type;

    useBuilderMock([mockViewModel, mockController]);

    const componentUnderTest = render(<LearningElementModal />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });

  test("should render error, if no element is selected", () => {
    mockViewModel.type.Value = "type";
    useBuilderMock([mockViewModel, mockController]);

    const componentUnderTest = render(<LearningElementModal />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
    expect(
      componentUnderTest.getByText("No Element selected")
    ).toBeInTheDocument();
  });

  test("should call controller with element id when closed", () => {
    useBuilderMock([mockViewModel, mockController]);

    const componentUnderTest = render(<LearningElementModal />);
    fireEvent.click(componentUnderTest.getByRole("button"));

    expect(mockController.scoreLearningElement).toHaveBeenCalledTimes(1);
  });

  // ANF-ID: [EWE0038]
  test("should close when close button is clicked", async () => {
    useBuilderMock([mockViewModel, mockController]);
    mockViewModel.isOpen.Value = true;

    const componentUnderTest = render(<LearningElementModal />);
    const closeButton = componentUnderTest.getByRole("button", { name: "X" });
    fireEvent.click(closeButton);

    expect(mockViewModel.isOpen.Value).toBe(false);
    await waitFor(() =>
      expect(componentUnderTest.container).toBeEmptyDOMElement()
    );
  });
});
