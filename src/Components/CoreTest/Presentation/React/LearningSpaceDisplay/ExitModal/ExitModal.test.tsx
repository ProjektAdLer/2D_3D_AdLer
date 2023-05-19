import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import React from "react";
import ExitModal from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ExitModal/ExitModal";
import ExitModalController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ExitModal/ExitModalController";
import ExitModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ExitModal/ExitModalViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

let fakeModel = new ExitModalViewModel();
fakeModel.isOpen.Value = true;
const fakeController = mock<ExitModalController>();

describe("ExitModal", () => {
  beforeEach(() => {
    fakeModel.successorSpaces.Value = [];
    fakeModel.precursorSpaces.Value = [];
  });

  test("doesn't render without controller", () => {
    useBuilderMock([fakeModel, undefined]);
    const { container } = render(<ExitModal />);
    expect(container.firstChild).toBeNull();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, fakeController]);
    const { container } = render(<ExitModal />);
    expect(container.firstChild).toBeNull();
  });

  test("should not render when closed", () => {
    fakeModel.isOpen.Value = false;

    useBuilderMock([fakeModel, fakeController]);

    const componentUnderTest = render(<ExitModal />);
    expect(componentUnderTest.container.childElementCount).toBe(0);
  });

  test("should render its content", () => {
    fakeModel.isOpen.Value = true;
    useBuilderMock([fakeModel, fakeController]);

    const componentUnderTest = render(<ExitModal />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });
  test("should close when close button is clicked", () => {
    fakeModel.isOpen.Value = true;
    useBuilderMock([fakeModel, fakeController]);
    const componentUnderTest = render(<ExitModal />);
    const closeButton = componentUnderTest.getByRole("button", { name: "X" });
    fireEvent.click(closeButton);
    expect(fakeModel.isOpen.Value).toBe(false);
  });
  test("should render if solved successor space is in the viewmodel", () => {
    fakeModel.isOpen.Value = true;
    fakeModel.successorSpaces.Value = [
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
        template: "None",
      },
    ];
    useBuilderMock([fakeModel, fakeController]);
    const componentUnderTest = render(<ExitModal />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });
  test("should render if available unsolved successor space is in the viewmodel", () => {
    fakeModel.isOpen.Value = true;
    fakeModel.successorSpaces.Value = [
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
        template: "None",
      },
    ];
    useBuilderMock([fakeModel, fakeController]);
    const componentUnderTest = render(<ExitModal />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });
  test("should render if unavailable successor space is in the viewmodel", () => {
    fakeModel.isOpen.Value = true;
    fakeModel.successorSpaces.Value = [
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
        template: "None",
      },
    ];
    useBuilderMock([fakeModel, fakeController]);
    const componentUnderTest = render(<ExitModal />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });
});
