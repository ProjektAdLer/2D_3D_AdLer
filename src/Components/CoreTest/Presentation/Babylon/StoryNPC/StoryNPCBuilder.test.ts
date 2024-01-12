import { mock } from "jest-mock-extended";
import StoryNPCBuilder from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCBuilder";
import StoryNPCView from "../../../../Core/Presentation/Babylon/StoryNPC/StoryNPCView";
import PresentationBuilder from "../../../../Core/Presentation/PresentationBuilder/PresentationBuilder";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import { waitFor } from "@testing-library/react";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";

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
  });

  beforeEach(() => {
    systemUnderTest = new StoryNPCBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildViewModel sets modelType", () => {
    systemUnderTest.modelType = "test";

    systemUnderTest.buildViewModel();

    expect(systemUnderTest["viewModel"]?.modelType).toBe("test");
  });

  test("buildView resolves isCompleted promise when the asyncSetup of the view resolves", async () => {
    systemUnderTest.modelType = "test";
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
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    systemUnderTest.buildPresenter();

    expect(learningWorldPortMock.registerAdapter).toHaveBeenCalledTimes(1);
    expect(learningWorldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
