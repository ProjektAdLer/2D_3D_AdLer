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
    viewModel.isOutroUnlocked.Value = false;
    viewModel.isIntroCutsceneRunning.Value = false;
    viewModel.isOutroCutsceneRunning.Value = false;
    viewModel.storyTypeToDisplay.Value = StoryElementType.None;
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

  test("doesn't render when storyTypeToDisplay is None", () => {
    viewModel.storyTypeToDisplay.Value = StoryElementType.None;
    useBuilderMock([viewModel, fakeController]);
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
    viewModel.introModelType.Value = model;
    viewModel.isOpen.Value = true;
    viewModel.storyTypeToDisplay.Value = StoryElementType.Intro;
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
  test("should close when x Button is clicked in story selection", () => {
    viewModel.isOpen.Value = true;
    viewModel.storyTypeToDisplay.Value = StoryElementType.IntroOutro;

    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    const xButton = componentUnderTest.getByAltText("CloseButton");
    fireEvent.click(xButton);
    expect(fakeController.closePanel).toHaveBeenCalled();
  });

  //ANF-ID: [EWE0040]
  test("should render with introTitle and introTexts when storyTypeToDisplay is Intro", () => {
    viewModel.storyTypeToDisplay.Value = StoryElementType.Intro;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    const title = componentUnderTest.getByText("introStoryTitle");
    const text = componentUnderTest.getByText("Blabla Intro 1");

    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  //ANF-ID: [EWE0040]
  test("should render with outroTitle and outroTexts when storyTypeToDisplay is Outro and isOutroUnlocked is true", () => {
    viewModel.storyTypeToDisplay.Value = StoryElementType.Outro;
    viewModel.isOutroUnlocked.Value = true;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    const title = componentUnderTest.getByText("outroStoryTitle");
    const text = componentUnderTest.getByText("Blabla Outro 1");

    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  //ANF-ID: [EWE0040]
  test("should render with outroTitle and outroLockedText placeholder when storyTypeToDisplay is Outro and isOutroUnlocked is false", () => {
    viewModel.storyTypeToDisplay.Value = StoryElementType.Outro;
    viewModel.isOutroUnlocked.Value = false;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    const title = componentUnderTest.getByText("outroStoryTitle");
    const text = componentUnderTest.getByText("outroLockedText");

    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  //ANF-ID: [EWE0040]
  test("should render selection when storyTypeToDisplay is IntroOutro", () => {
    viewModel.storyTypeToDisplay.Value = StoryElementType.IntroOutro;
    useBuilderMock([viewModel, fakeController]);

    const componentUnderTest = render(<StoryElement />);
    const introButton = componentUnderTest.getByRole("button", {
      name: "introStoryTitle",
    });
    const outroButton = componentUnderTest.getByRole("button", {
      name: "outroStoryTitle",
    });

    expect(introButton).toBeInTheDocument();
    expect(outroButton).toBeInTheDocument();
  });
});
