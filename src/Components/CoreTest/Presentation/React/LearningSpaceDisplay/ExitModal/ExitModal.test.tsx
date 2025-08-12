import { fireEvent, render, waitFor } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import React from "react";
import ExitModal from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ExitModal/ExitModal";
import ExitModalController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ExitModal/ExitModalController";
import ExitModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ExitModal/ExitModalViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import { LearningSpaceTemplateType } from "../../../../../Core/Domain/Types/LearningSpaceTemplateType";

let viewModel = new ExitModalViewModel();
viewModel.isOpen.Value = true;
const fakeController = mock<ExitModalController>();

describe("ExitModal", () => {
  beforeEach(() => {
    viewModel.successorSpaces.Value = [];
    viewModel.precursorSpaces.Value = [];
    viewModel.availableSpaces.Value = [];
  });

  test("doesn't render without controller", () => {
    useBuilderMock([viewModel, undefined]);
    const { container } = render(<ExitModal />);
    expect(container.firstChild).toBeNull();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, fakeController]);
    const { container } = render(<ExitModal />);
    expect(container.firstChild).toBeNull();
  });

  // ANF-ID: [EWE0033]
  test("should not render when closed", () => {
    viewModel.isOpen.Value = false;

    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<ExitModal />);
    expect(componentUnderTest.container.childElementCount).toBe(0);
  });

  test("should render its content", () => {
    viewModel.isOpen.Value = true;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<ExitModal />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });

  // ANF-ID: [EWE0033]
  test("should close when close button is clicked", async () => {
    viewModel.isOpen.Value = true;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<ExitModal />);
    const closeButton = componentUnderTest.getByAltText("CloseButton");
    fireEvent.click(closeButton);

    expect(viewModel.isOpen.Value).toBe(false);
    await waitFor(() =>
      expect(componentUnderTest.container).toBeEmptyDOMElement(),
    );
  });

  // ANF-ID: [EWE0032]
  test("should render if solved successor space is in the viewmodel and doorType is Exit", () => {
    viewModel.isOpen.Value = true;
    viewModel.isExit.Value = true;
    viewModel.successorSpaces.Value = [
      {
        id: 1,
        name: "testSpace",
        elements: [],
        description: "test",
        goals: [],
        requirementsString: "",
        requirementsSyntaxTree: null,
        isAvailable: true,
        requiredScore: 10,
        currentScore: 10,
        maxScore: 0,
        template: LearningSpaceTemplateType.None,
      },
    ];
    useBuilderMock([viewModel, fakeController]);
    const componentUnderTest = render(<ExitModal />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });

  // ANF-ID: [EWE0032]
  test("should render if available unsolved successor space is in the viewmodel and doorType is Exit", () => {
    viewModel.isOpen.Value = true;
    viewModel.isExit.Value = true;
    viewModel.successorSpaces.Value = [
      {
        id: 1,
        name: "testSpace",
        elements: [],
        description: "test",
        goals: [],
        requirementsString: "",
        requirementsSyntaxTree: null,
        isAvailable: true,
        requiredScore: 10,
        currentScore: 0,
        maxScore: 0,
        template: LearningSpaceTemplateType.None,
      },
    ];
    useBuilderMock([viewModel, fakeController]);
    const componentUnderTest = render(<ExitModal />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });

  // ANF-ID: [EWE0032]
  test("should render if unavailable successor space is in the viewmodel and doorType is Exit", () => {
    viewModel.isOpen.Value = true;
    viewModel.isExit.Value = true;
    viewModel.successorSpaces.Value = [
      {
        id: 1,
        name: "testSpace",
        elements: [],
        description: "test",
        goals: [],
        requirementsString: "",
        requirementsSyntaxTree: null,
        isAvailable: false,
        requiredScore: 10,
        currentScore: 0,
        maxScore: 0,
        template: LearningSpaceTemplateType.None,
      },
    ];
    useBuilderMock([viewModel, fakeController]);
    const componentUnderTest = render(<ExitModal />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });

  // ANF-ID: [EWE0032]
  test("should render if solved precursor space is in the viewmodel and doorType is Entry", () => {
    viewModel.isOpen.Value = true;
    viewModel.isExit.Value = false;
    viewModel.precursorSpaces.Value = [
      {
        id: 1,
        name: "testSpace",
        elements: [],
        description: "test",
        goals: [],
        requirementsString: "",
        requirementsSyntaxTree: null,
        isAvailable: true,
        requiredScore: 10,
        currentScore: 10,
        maxScore: 0,
        template: LearningSpaceTemplateType.None,
      },
    ];
    useBuilderMock([viewModel, fakeController]);
    const componentUnderTest = render(<ExitModal />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });

  // ANF-ID: [EWE0032]
  test("should render if available unsolved precursor space is in the viewmodel and doorType is Entry", () => {
    viewModel.isOpen.Value = true;
    viewModel.isExit.Value = false;
    viewModel.precursorSpaces.Value = [
      {
        id: 1,
        name: "testSpace",
        elements: [],
        description: "test",
        goals: [],
        requirementsString: "",
        requirementsSyntaxTree: null,
        isAvailable: true,
        requiredScore: 10,
        currentScore: 0,
        maxScore: 0,
        template: LearningSpaceTemplateType.None,
      },
    ];
    useBuilderMock([viewModel, fakeController]);
    const componentUnderTest = render(<ExitModal />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });

  // ANF-ID: [EWE0032]
  test("should render if unavailable precursor space is in the viewmodel and doorType is Entry", () => {
    viewModel.isOpen.Value = true;
    viewModel.isExit.Value = false;
    viewModel.precursorSpaces.Value = [
      {
        id: 1,
        name: "testSpace",
        elements: [],
        description: "test",
        goals: [],
        requirementsString: "",
        requirementsSyntaxTree: null,
        isAvailable: false,
        requiredScore: 10,
        currentScore: 0,
        maxScore: 0,
        template: LearningSpaceTemplateType.None,
      },
    ];
    useBuilderMock([viewModel, fakeController]);
    const componentUnderTest = render(<ExitModal />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });
});
