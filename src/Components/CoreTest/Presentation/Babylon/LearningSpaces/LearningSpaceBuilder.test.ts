import LearningSpaceBuilder from "../../../../Core/Presentation/Babylon/LearningSpaces/LearningSpaceBuilder";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import { mock } from "jest-mock-extended";
import { LearningSpaceTemplateType } from "../../../../Core/Domain/Types/LearningSpaceTemplateType";
import GenericLearningSpaceDimensionStrategy from "../../../../Core/Presentation/Babylon/LearningSpaces/LearningSpaceDimensionStrategies/GenericLearningSpaceDimensionStrategy";
import TemplateLearningSpaceDimensionStrategy from "../../../../Core/Presentation/Babylon/LearningSpaces/LearningSpaceDimensionStrategies/TemplateLearningSpaceDimensionStrategy";
import { waitFor } from "@testing-library/react";
import LearningSpaceViewModel from "../../../../Core/Presentation/Babylon/LearningSpaces/LearningSpaceViewModel";
import LearningSpaceTO from "../../../../Core/Application/DataTransferObjects/LearningSpaceTO";
import { LearningElementModelTypeEnums } from "../../../../Core/Domain/Types/LearningElementModelTypes";
import ILearningSpacePresenter from "../../../../Core/Presentation/Babylon/LearningSpaces/ILearningSpacePresenter";
import PresentationBuilder from "../../../../Core/Presentation/PresentationBuilder/PresentationBuilder";
import ILearningSpaceView from "../../../../Core/Presentation/Babylon/LearningSpaces/ILearningSpaceView";
import ILearningSpaceController from "../../../../Core/Presentation/Babylon/LearningSpaces/ILearningSpaceController";

jest.mock("@babylonjs/core");
jest.mock(
  "../../../../Core/Presentation/Babylon/LearningSpaces/LearningSpacePresenter"
);
jest.mock(
  "../../../../Core/Presentation/Babylon/LearningSpaces/LearningSpaceView"
);
jest.spyOn(PresentationBuilder.prototype, "buildPresenter");
jest.spyOn(PresentationBuilder.prototype, "buildView");

const spaceTO: LearningSpaceTO = {
  id: 1,
  description: "TestDescription",
  goals: ["TestGoals"],
  requirementsString: "",
  name: "TestSpace",
  requiredScore: 1,
  currentScore: 0,
  maxScore: 0,
  elements: [
    null,
    {
      id: 2,
      name: "test",
      type: "h5p",
      description: "test",
      goals: ["test"],
      value: 42,
      parentSpaceID: 1,
      hasScored: false,
      parentWorldID: 1,
      model: LearningElementModelTypeEnums.H5pElementModelTypes.Backboard,
    },
  ],
  requirementsSyntaxTree: null,
  isAvailable: true,
  template: LearningSpaceTemplateType.None,
};

describe("LearningSpaceBuilder", () => {
  let systemUnderTest: LearningSpaceBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
  });

  beforeEach(() => {
    systemUnderTest = new LearningSpaceBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildViewModel throws error when spaceData is not set", () => {
    expect(() => systemUnderTest.buildViewModel()).toThrowError("Space data");
  });

  test("buildViewModel sets data from spaceData", () => {
    systemUnderTest.spaceData = spaceTO;

    systemUnderTest.buildViewModel();

    expect(systemUnderTest["viewModel"]!.id).toBe(spaceTO.id);
    expect(systemUnderTest["viewModel"]!.learningSpaceTemplateType).toBe(
      spaceTO.template
    );
  });

  test("buildViewModel calls internal setDimensionsStrategy", () => {
    systemUnderTest.spaceData = spaceTO;
    systemUnderTest["setDimensionsStrategy"] = jest.fn();
    const dimensionStrategy = mock<GenericLearningSpaceDimensionStrategy>();
    systemUnderTest["dimensionStrategy"] = dimensionStrategy;

    systemUnderTest.buildViewModel();

    expect(systemUnderTest["setDimensionsStrategy"]).toHaveBeenCalledTimes(1);
  });

  test("buildViewModel calls the dimensionStrategy for space dimensions", () => {
    systemUnderTest.spaceData = spaceTO;
    systemUnderTest["setDimensionsStrategy"] = jest.fn();
    const dimensionStrategy = mock<GenericLearningSpaceDimensionStrategy>();
    systemUnderTest["dimensionStrategy"] = dimensionStrategy;

    systemUnderTest.buildViewModel();

    expect(dimensionStrategy.getCornerPoints).toHaveBeenCalledTimes(1);
    expect(dimensionStrategy.getEntryDoorPosition).toHaveBeenCalledTimes(1);
    expect(dimensionStrategy.getExitDoorPosition).toHaveBeenCalledTimes(1);
    expect(dimensionStrategy.getLearningElementPositions).toHaveBeenCalledTimes(
      1
    );
    expect(dimensionStrategy.getWallSegmentIndices).toHaveBeenCalledTimes(1);
    expect(dimensionStrategy.getWindowPositions).toHaveBeenCalledTimes(1);
  });

  test("buildPresenter resolves private isPresenterCompleted promise when the asyncSetup of the view resolves", async () => {
    systemUnderTest.spaceData = spaceTO;
    systemUnderTest["viewModel"] = new LearningSpaceViewModel();

    const presenterMock = mock<ILearningSpacePresenter>();
    presenterMock.asyncSetupSpace.mockResolvedValue();
    systemUnderTest["presenter"] = presenterMock;

    systemUnderTest.buildPresenter();

    await expect(
      systemUnderTest["isPresenterCompleted"]
    ).resolves.toBeUndefined();
  });

  test("buildPresenter logs error the asyncSetup of the view rejects", async () => {
    systemUnderTest.spaceData = spaceTO;
    systemUnderTest["viewModel"] = new LearningSpaceViewModel();

    const presenterMock = mock<ILearningSpacePresenter>();
    presenterMock.asyncSetupSpace.mockRejectedValue("Test Error");
    systemUnderTest["presenter"] = presenterMock;

    const consoleErrorMock = jest.spyOn(console, "error");

    systemUnderTest.buildPresenter();

    waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledTimes(1);
      expect(consoleErrorMock).toHaveBeenCalledWith("Test Error");
    });
  });

  test("buildView resolves private isViewCompleted promise when the asyncSetup of the view resolves", async () => {
    systemUnderTest.spaceData = spaceTO;
    systemUnderTest["viewModel"] = new LearningSpaceViewModel();
    systemUnderTest["controller"] = mock<ILearningSpaceController>();

    const viewMock = mock<ILearningSpaceView>();
    viewMock.asyncSetup.mockResolvedValue();
    systemUnderTest["view"] = viewMock;

    systemUnderTest.buildView();

    await expect(systemUnderTest["isViewCompleted"]).resolves.toBeUndefined();
  });

  test("buildView logs error the asyncSetup of the view rejects", async () => {
    systemUnderTest.spaceData = spaceTO;
    systemUnderTest["viewModel"] = new LearningSpaceViewModel();
    systemUnderTest["controller"] = mock<ILearningSpaceController>();

    const viewMock = mock<ILearningSpaceView>();
    viewMock.asyncSetup.mockRejectedValue("Test Error");
    systemUnderTest["view"] = viewMock;

    const consoleErrorMock = jest.spyOn(console, "error");

    systemUnderTest.buildView();

    waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledTimes(1);
      expect(consoleErrorMock).toHaveBeenCalledWith("Test Error");
    });
  });

  test("isCompleted resolves when both presenter and view are completly built", async () => {
    systemUnderTest.spaceData = spaceTO;
    systemUnderTest["viewModel"] = new LearningSpaceViewModel();
    systemUnderTest["controller"] = mock<ILearningSpaceController>();

    const viewMock = mock<ILearningSpaceView>();
    viewMock.asyncSetup.mockResolvedValue();
    systemUnderTest["view"] = viewMock;

    const presenterMock = mock<ILearningSpacePresenter>();
    presenterMock.asyncSetupSpace.mockResolvedValue();
    systemUnderTest["presenter"] = presenterMock;

    systemUnderTest.buildPresenter();
    systemUnderTest.buildView();

    waitFor(() => {
      expect(systemUnderTest.isCompleted).resolves.toBeUndefined();
    });
  });

  test("setDimensionsStrategy sets the strategy to GenericLearningSpaceDimensionStrategy when the template type is None", () => {
    systemUnderTest["viewModel"] = new LearningSpaceViewModel();
    systemUnderTest["setDimensionsStrategy"](LearningSpaceTemplateType.None);

    expect(systemUnderTest["dimensionStrategy"]).toBeInstanceOf(
      GenericLearningSpaceDimensionStrategy
    );
  });

  test("setDimensionsStrategy sets the strategy to TemplateLearningSpaceDimensionStrategy when the template type is not None", () => {
    systemUnderTest["viewModel"] = new LearningSpaceViewModel();
    systemUnderTest["setDimensionsStrategy"](LearningSpaceTemplateType.L);

    expect(systemUnderTest["dimensionStrategy"]).toBeInstanceOf(
      TemplateLearningSpaceDimensionStrategy
    );
  });
});
