import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import React from "react";
import StoryElement from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElement";
import StoryElementController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElementController";
import StoryElementViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElementViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import { StoryElementType } from "../../../../../Core/Domain/Types/StoryElementType";
import { use } from "i18next";

let viewModel = new StoryElementViewModel();
viewModel.isOpen.Value = true;
const fakeController = mock<StoryElementController>();

describe("StoryElement", () => {
  beforeEach(() => {
    viewModel.introTexts.Value = ["Blabla Intro 1"];
    viewModel.outroTexts.Value = ["Blabla Outro 1"];
    viewModel.isOpen.Value = true;
    viewModel.pageId.Value = 0;
    viewModel.outroUnlocked.Value = false;
    viewModel.outroJustNowUnlocked.Value = false;
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
  test.skip("should close when x Button is clicked", () => {
    viewModel.isOpen.Value = true;
    viewModel.type.Value = StoryElementType.Intro;

    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    const xButton = componentUnderTest.getByRole("button", { name: "X" });
    fireEvent.click(xButton);
    expect(componentUnderTest.container.firstChild).toBeNull();
  });

  test.skip("should render its content (Case 1: Intro)", () => {
    viewModel.type.Value = StoryElementType.Intro;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });
  test.skip("should render its content (Case 1: Locked IntroOutro)", () => {
    viewModel.type.Value = StoryElementType.IntroOutro;
    viewModel.outroUnlocked.Value = false;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });
  test.skip("should render its content (Case 2: Outro)", () => {
    viewModel.type.Value = StoryElementType.Outro;
    viewModel.outroUnlocked.Value = true;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });
  test.skip("should render its content (Case 2: Just Unlocked Outro)", () => {
    viewModel.type.Value = StoryElementType.IntroOutro;
    viewModel.outroUnlocked.Value = true;
    viewModel.outroJustNowUnlocked.Value = true;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });
  test.skip("should render its content (Case 3: Locked Outro)", () => {
    viewModel.type.Value = StoryElementType.Outro;
    viewModel.outroUnlocked.Value = false;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });
  test.skip("should render its content (Case 4: IntroOutro)", () => {
    viewModel.type.Value = StoryElementType.IntroOutro;
    viewModel.outroUnlocked.Value = true;
    viewModel.showOnlyIntro.Value = false;
    viewModel.showOnlyOutro.Value = false;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });
  test.skip("should render its content (Case 4: IntroOutro, Intro selected)", () => {
    viewModel.type.Value = StoryElementType.IntroOutro;
    viewModel.outroUnlocked.Value = true;
    viewModel.showOnlyIntro.Value = true;
    viewModel.showOnlyOutro.Value = false;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });
  test.skip("should render its content (Case 4: IntroOutro, Outro selected)", () => {
    viewModel.type.Value = StoryElementType.IntroOutro;
    viewModel.outroUnlocked.Value = true;
    viewModel.showOnlyIntro.Value = false;
    viewModel.showOnlyOutro.Value = true;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });
  test("should not render if no case is matched (type = null)", () => {
    viewModel.type.Value = StoryElementType.None;
    useBuilderMock([viewModel, fakeController]);
    const { container } = render(<StoryElement />);
    expect(container.firstChild).toBeNull();
  });
});
