import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import React from "react";
import IntroStoryElement from "../../../../../Core/Presentation/React/LearningSpaceDisplay/IntroStoryElement/IntroStoryElement";
import IntroStoryElementController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/IntroStoryElement/IntroStoryElementController";
import IntroStoryElementViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/IntroStoryElement/IntroStoryElementViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import { LearningSpaceTemplateType } from "../../../../../Core/Domain/Types/LearningSpaceTemplateType";

let viewModel = new IntroStoryElementViewModel();
viewModel.isOpen.Value = true;
const fakeController = mock<IntroStoryElementController>();

describe("IntroStoryElement", () => {
  beforeEach(() => {
    viewModel.texts.Value = [];
  });

  test("doesn't render without controller", () => {
    useBuilderMock([viewModel, undefined]);
    const { container } = render(<IntroStoryElement />);
    expect(container.firstChild).toBeNull();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, fakeController]);
    const { container } = render(<IntroStoryElement />);
    expect(container.firstChild).toBeNull();
  });

  test("should not render when closed", () => {
    viewModel.isOpen.Value = false;

    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<IntroStoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(0);
  });

  test("should render its content", () => {
    viewModel.isOpen.Value = true;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<IntroStoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });

  test("should close when close button is clicked", () => {
    viewModel.isOpen.Value = true;
    useBuilderMock([viewModel, fakeController]);
    const componentUnderTest = render(<IntroStoryElement />);
    const closeButton = componentUnderTest.getByRole("button", { name: "X" });
    fireEvent.click(closeButton);
    expect(viewModel.isOpen.Value).toBe(false);
  });
});
