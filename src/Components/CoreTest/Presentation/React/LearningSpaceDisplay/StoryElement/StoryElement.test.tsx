import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import React from "react";
import StoryElement from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElement";
import StoryElementController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElementController";
import StoryElementViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/StoryElement/StoryElementViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import { StoryElementType } from "../../../../../Core/Domain/Types/StoryElementType";
import { LearningElementModelTypeEnums } from "../../../../../Core/Domain/LearningElementModels/LearningElementModelTypes";

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
    viewModel.isSplitStory.Value = false;
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

  // ANF-ID: [ELG0032]
  test.each([
    [LearningElementModelTypeEnums.QuizElementModelTypes.ArcadeNPC],
    [LearningElementModelTypeEnums.QuizElementModelTypes.CampusNPC],
    [LearningElementModelTypeEnums.QuizElementModelTypes.DefaultNPC],
    [LearningElementModelTypeEnums.QuizElementModelTypes.RobotNPC],
  ])("displays correct npc thumbnail for model %p", (model) => {
    viewModel.modelType.Value = [model];
    viewModel.isOpen.Value = true;
    viewModel.type.Value = [StoryElementType.Intro, StoryElementType.Outro];
    viewModel.isSplitStory.Value = true;
    viewModel.pickedStory.Value = StoryElementType.Intro;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);

    const npcThumbnails = componentUnderTest.getAllByTestId("npcImage");

    npcThumbnails.forEach((npcThumbnail) => {
      expect(npcThumbnail).toBeInTheDocument();
      expect(npcThumbnail).toMatchSnapshot();
    });
  });

  // ANF-ID: [EWE0041]
  test("should not render when closed", () => {
    viewModel.isOpen.Value = false;

    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(0);
  });

  // ANF-ID: [EWE0041]
  test("should close when x Button is clicked", () => {
    viewModel.isOpen.Value = true;
    viewModel.type.Value = [StoryElementType.Intro];

    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    const xButton = componentUnderTest.getByAltText("CloseButton");
    fireEvent.click(xButton);
    expect(fakeController.closePanel).toHaveBeenCalled();
  });

  //ANF-ID: [EWE0040]
  test("should render its content (Case 1: Intro)", () => {
    viewModel.type.Value = [StoryElementType.Intro];
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });

  //ANF-ID: [EWE0040]
  test("should render its content (Case 1: Split IntroOutro, Intro selected)", () => {
    viewModel.type.Value = [StoryElementType.Intro, StoryElementType.Outro];
    viewModel.isSplitStory.Value = true;
    viewModel.pickedStory.Value = StoryElementType.Intro;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });

  //ANF-ID: [EWE0040]
  test("should render its content (Case 1: Locked IntroOutro)", () => {
    viewModel.type.Value = [StoryElementType.IntroOutro];
    viewModel.outroUnlocked.Value = false;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });

  //ANF-ID: [EWE0040]
  test("should render its content (Case 2: Unlocked Outro)", () => {
    viewModel.type.Value = [StoryElementType.Outro];
    viewModel.outroUnlocked.Value = true;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });

  //ANF-ID: [EWE0040]
  test("should render its content (Case 2: Split IntroOutro, unlocked Outro selected)", () => {
    viewModel.type.Value = [StoryElementType.Intro, StoryElementType.Outro];
    viewModel.isSplitStory.Value = true;
    viewModel.pickedStory.Value = StoryElementType.Outro;
    viewModel.outroUnlocked.Value = true;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });

  //ANF-ID: [EWE0040]
  test("should render its content (Case 2: Just Unlocked Outro)", () => {
    viewModel.type.Value = [StoryElementType.IntroOutro];
    viewModel.outroUnlocked.Value = true;
    viewModel.outroJustNowUnlocked.Value = true;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });

  //ANF-ID: [EWE0040]
  test("should render its content (Case 3: Locked Outro)", () => {
    viewModel.type.Value = [StoryElementType.Outro];
    viewModel.outroUnlocked.Value = false;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });

  //ANF-ID: [EWE0040]
  test("should render its content (Case 3: Split IntroOutro, locked Outro selected)", () => {
    viewModel.type.Value = [StoryElementType.Intro, StoryElementType.Outro];
    viewModel.outroUnlocked.Value = false;
    viewModel.isSplitStory.Value = true;
    viewModel.pickedStory.Value = StoryElementType.Outro;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });

  //ANF-ID: [EWE0040]
  test("should render its content (Case 4: IntroOutro)", () => {
    viewModel.type.Value = [StoryElementType.IntroOutro];
    viewModel.outroUnlocked.Value = true;
    viewModel.showOnlyIntro.Value = false;
    viewModel.showOnlyOutro.Value = false;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });

  //ANF-ID: [EWE0040]
  test("should render its content (Case 4: IntroOutro, Intro selected)", () => {
    viewModel.type.Value = [StoryElementType.IntroOutro];
    viewModel.outroUnlocked.Value = true;
    viewModel.showOnlyIntro.Value = true;
    viewModel.showOnlyOutro.Value = false;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });

  //ANF-ID: [EWE0040]
  test("should render its content (Case 4: IntroOutro, Outro selected)", () => {
    viewModel.type.Value = [StoryElementType.IntroOutro];
    viewModel.outroUnlocked.Value = true;
    viewModel.showOnlyIntro.Value = false;
    viewModel.showOnlyOutro.Value = true;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    expect(componentUnderTest.container.childElementCount).toBe(1);
  });

  //ANF-ID: [EWE0040]
  test("should not render if no case is matched (type = null)", () => {
    viewModel.type.Value = [StoryElementType.None];
    viewModel.pickedStory.Value = StoryElementType.None;
    useBuilderMock([viewModel, fakeController]);
    const { container } = render(<StoryElement />);
    expect(container.firstChild).toBeNull();
  });
});
