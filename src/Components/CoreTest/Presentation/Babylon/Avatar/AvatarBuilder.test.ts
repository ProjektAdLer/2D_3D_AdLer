import IAvatarPort from "../../../../Core/Application/Ports/Interfaces/IAvatarPort";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import AvatarBuilder from "../../../../Core/Presentation/Babylon/Avatar/AvatarBuilder";
import AvatarPresenter from "../../../../Core/Presentation/Babylon/Avatar/AvatarPresenter";
import AvatarView from "../../../../Core/Presentation/Babylon/Avatar/AvatarView";
import AvatarViewModel from "../../../../Core/Presentation/Babylon/Avatar/AvatarViewModel";
import { mock } from "jest-mock-extended";
import IAvatarController from "../../../../Core/Presentation/Babylon/Avatar/IAvatarController";
import { waitFor } from "@testing-library/react";
import MovementIndicator from "../../../../Core/Presentation/Babylon/MovementIndicator/MovementIndicator";
import IMovementIndicator from "../../../../Core/Presentation/Babylon/MovementIndicator/IMovementIndicator";
import PRESENTATION_TYPES from "../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import { LearningSpaceTemplateType } from "../../../../Core/Domain/Types/LearningSpaceTemplateType";
import ILearningSpacePresenter from "../../../../Core/Presentation/Babylon/LearningSpaces/ILearningSpacePresenter";

jest.mock("../../../../Core/Presentation/Babylon/Avatar/AvatarController");
const setViewModelMock = jest.spyOn(
  AvatarPresenter.prototype,
  "ViewModel",
  "set"
);

const movementIndicatorMock = mock<MovementIndicator>();

describe("AvatarBuilder", () => {
  let systemUnderTest: AvatarBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IMovementIndicator>(
      PRESENTATION_TYPES.IMovementIndicator
    ).toConstantValue(movementIndicatorMock);
  });

  beforeEach(() => {
    systemUnderTest = new AvatarBuilder();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    CoreDIContainer.restore();
  });

  test("buildViewModel concludes the build step successfully and sets the given data in the viewModel", () => {
    systemUnderTest.learningSpaceTemplateType = LearningSpaceTemplateType.L;

    systemUnderTest.buildViewModel();

    expect(systemUnderTest["viewModel"]).toBeDefined();
    expect(systemUnderTest["viewModel"]!.learningSpaceTemplateType).toEqual(
      LearningSpaceTemplateType.L
    );
  });
  test("buildViewModel concludes the build step successfully and sets playerspawnpoint to zero in the viewModel, if no data is given", () => {
    systemUnderTest.buildViewModel();

    expect(systemUnderTest["viewModel"]).toBeDefined();
    expect(systemUnderTest["viewModel"]!.learningSpaceTemplateType).toEqual(
      undefined
    );
  });

  test("buildPresenter builds the AvatarPresenter and sets the ViewModel with its setter", () => {
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeInstanceOf(AvatarPresenter);
    expect(systemUnderTest["presenter"]).toBe(
      CoreDIContainer.get<IAvatarPort>(PORT_TYPES.IAvatarPort)
    );
    expect(setViewModelMock).toHaveBeenCalledTimes(1);
  });

  test("buildCOntroller sets the learning space presenter on the controller", () => {
    systemUnderTest["viewModel"] = mock<AvatarViewModel>();
    const mockLearningSpacePresenter = mock<ILearningSpacePresenter>();
    systemUnderTest["learningSpacePresenter"] = mockLearningSpacePresenter;

    systemUnderTest.buildController();

    expect(systemUnderTest["controller"]!.learningSpacePresenter).toBe(
      mockLearningSpacePresenter
    );
  });

  test("buildView calls asyncSetup on the view", () => {
    const asyncSetupMock = jest.spyOn(AvatarView.prototype, "asyncSetup");
    systemUnderTest["viewModel"] = new AvatarViewModel();
    systemUnderTest["controller"] = mock<IAvatarController>();

    systemUnderTest.buildView();

    expect(asyncSetupMock).toHaveBeenCalledTimes(1);
  });

  test("isCompleted resolves when asyncSetup of the view resolves", async () => {
    systemUnderTest["viewModel"] = new AvatarViewModel();
    systemUnderTest["controller"] = mock<IAvatarController>();

    jest.spyOn(AvatarView.prototype, "asyncSetup").mockResolvedValue(undefined);

    systemUnderTest.buildView();

    await expect(systemUnderTest.isCompleted).resolves.toBeUndefined();
  });

  test("buildView logs the error when asyncSetup of the view rejects", async () => {
    systemUnderTest["viewModel"] = new AvatarViewModel();
    systemUnderTest["controller"] = mock<IAvatarController>();

    const consoleErrorMock = jest.spyOn(console, "error");

    jest
      .spyOn(AvatarView.prototype, "asyncSetup")
      .mockRejectedValue("Test Error");

    systemUnderTest.buildView();

    waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledTimes(1);
      expect(consoleErrorMock).toHaveBeenCalledWith("Test Error");
    });
  });
});
