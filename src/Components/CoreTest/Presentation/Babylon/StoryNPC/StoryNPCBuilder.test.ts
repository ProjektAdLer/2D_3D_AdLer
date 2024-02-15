import { mock } from "jest-mock-extended";
import StoryNPCBuilder from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCBuilder";
import StoryNPCView from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCView";
import PresentationBuilder from "../../../../Core/Presentation/PresentationBuilder/PresentationBuilder";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import { waitFor } from "@testing-library/react";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import { LearningSpaceTemplateType } from "../../../../Core/Domain/Types/LearningSpaceTemplateType";
import { StoryElementType } from "../../../../Core/Domain/Types/StoryElementType";
import { StoryNPCState } from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCViewModel";

jest.spyOn(PresentationBuilder.prototype, "buildPresenter");
jest.spyOn(PresentationBuilder.prototype, "buildView");

const learningWorldPortMock = mock<ILearningWorldPort>();

describe("StoryNPCBuilder", () => {
  let systemUnderTest: StoryNPCBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      learningWorldPortMock
    );
    CoreDIContainer.bind(
      PRESENTATION_TYPES.IStoryElementPresenter
    ).toConstantValue(mock());
  });

  beforeEach(() => {
    systemUnderTest = new StoryNPCBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildViewModel sets modelType", () => {
    systemUnderTest.modelType = "test";
    systemUnderTest.learningSpaceTemplateType = LearningSpaceTemplateType.L;

    systemUnderTest.buildViewModel();

    expect(systemUnderTest["viewModel"]?.modelType).toBe("test");
  });

  test("buildViewModel sets storyType", () => {
    systemUnderTest.modelType = "test";
    systemUnderTest.learningSpaceTemplateType = LearningSpaceTemplateType.L;
    systemUnderTest.storyType = StoryElementType.Intro;

    systemUnderTest.buildViewModel();

    expect(systemUnderTest["viewModel"]?.storyType).toBe(
      StoryElementType.Intro
    );
  });

  test.each([
    [
      StoryNPCState.WaitOnCutSceneTrigger,
      StoryElementType.IntroOutro,
      true,
      false,
    ],
    [StoryNPCState.RandomMovement, StoryElementType.IntroOutro, false, false],
    [StoryNPCState.WaitOnCutSceneTrigger, StoryElementType.Intro, true, false],
    [StoryNPCState.Idle, StoryElementType.Intro, false, true],
    [StoryNPCState.RandomMovement, StoryElementType.Intro, false, false],
    [StoryNPCState.RandomMovement, StoryElementType.Outro, false, true],
    [StoryNPCState.Idle, StoryElementType.Outro, false, false],
  ])(
    "buildViewModel sets initial state to %p for storyType=%p, noLearningElementHasScored=%p, learningSpaceCompleted=%p",
    (
      initialState,
      storyType,
      noLearningElementHasScored,
      learningSpaceCompleted
    ) => {
      systemUnderTest.modelType = "";
      systemUnderTest.learningSpaceTemplateType = LearningSpaceTemplateType.L;
      systemUnderTest.storyType = storyType;
      systemUnderTest.noLearningElementHasScored = noLearningElementHasScored;
      systemUnderTest.learningSpaceCompleted = learningSpaceCompleted;

      systemUnderTest.buildViewModel();

      expect(systemUnderTest["viewModel"]?.state.Value).toBe(initialState);
    }
  );

  test("buildView resolves isCompleted promise when the asyncSetup of the view resolves", async () => {
    systemUnderTest.modelType = "test";
    systemUnderTest.learningSpaceTemplateType = LearningSpaceTemplateType.L;

    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    const viewMock = mock<StoryNPCView>();
    viewMock.asyncSetupStoryNPC.mockResolvedValue(undefined);
    systemUnderTest["view"] = viewMock;

    systemUnderTest.buildView();

    await expect(systemUnderTest.isCompleted).resolves.toBeUndefined();
  });

  test("buildView logs error the asyncSetup of the view rejects", async () => {
    systemUnderTest.modelType = "test";
    systemUnderTest.learningSpaceTemplateType = LearningSpaceTemplateType.L;

    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    const viewMock = mock<StoryNPCView>();
    viewMock.asyncSetupStoryNPC.mockRejectedValue("Test Error");
    systemUnderTest["view"] = viewMock;

    const consoleErrorMock = jest.spyOn(console, "log");

    systemUnderTest.buildView();

    await waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledTimes(1);
      expect(consoleErrorMock).toHaveBeenCalledWith("Test Error");
    });
  });

  test("buildPresenter registers presenter with world port", () => {
    systemUnderTest.modelType = "test";
    systemUnderTest.learningSpaceTemplateType = LearningSpaceTemplateType.L;

    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    systemUnderTest.buildPresenter();

    expect(learningWorldPortMock.registerAdapter).toHaveBeenCalledTimes(1);
    expect(learningWorldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
