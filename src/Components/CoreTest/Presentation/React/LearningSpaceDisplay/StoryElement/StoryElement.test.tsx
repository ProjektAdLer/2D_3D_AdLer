import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import React from "react";
import StoryElement from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElement";
import StoryElementController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElementController";
import StoryElementViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElementViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import { LearningSpaceTemplateType } from "../../../../../Core/Domain/Types/LearningSpaceTemplateType";
import { StoryElementType } from "../../../../../Core/Domain/Types/StoryElementType";

let viewModel = new StoryElementViewModel();
viewModel.isOpen.Value = true;
const fakeController = mock<StoryElementController>();

describe("StoryElement", () => {
  beforeEach(() => {
    viewModel.introTexts.Value = [""];
    viewModel.outroTexts.Value = [""];
  });

  test("doesn't render without controller", () => {
    useBuilderMock([viewModel, undefined]);
    const { container } = render(<StoryElement />);
    expect(container.firstChild).toBeNull();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, fakeController]);
    const { container } = render(<StoryElement />);
    expect(container.firstChild).toBeNull();
  });

  test("should not render when closed", () => {
    viewModel.isOpen.Value = false;

    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(0);
  });

  test("should render its content (intro)", () => {
    viewModel.isOpen.Value = true;
    viewModel.type.Value = StoryElementType.Intro;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });
  test("should render its content (outro)", () => {
    viewModel.isOpen.Value = true;
    viewModel.type.Value = StoryElementType.Outro;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });

  test("should close when close button is clicked", () => {
    viewModel.isOpen.Value = true;
    useBuilderMock([viewModel, fakeController]);
    const componentUnderTest = render(<StoryElement />);
    const closeButton = componentUnderTest.getByRole("button", { name: "X" });
    fireEvent.click(closeButton);
    expect(viewModel.isOpen.Value).toBe(false);
  });
});
