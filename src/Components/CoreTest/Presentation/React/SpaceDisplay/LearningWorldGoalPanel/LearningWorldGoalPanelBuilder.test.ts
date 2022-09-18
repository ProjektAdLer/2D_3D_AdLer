import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ILearningWorldPort from "../../../../../Core/Ports/LearningWorldPort/ILearningWorldPort";
import LearningWorldGoalPanelBuilder from "../../../../../Core/Presentation/React/LearningRoomDisplay/LearningWorldGoalPanel/LearningWorldGoalPanelBuilder";
import LearningWorldGoalPanelController from "../../../../../Core/Presentation/React/LearningRoomDisplay/LearningWorldGoalPanel/LearningWorldGoalPanelController";
import LearningWorldGoalPanelPresenter from "../../../../../Core/Presentation/React/LearningRoomDisplay/LearningWorldGoalPanel/LearningWorldGoalPanelPresenter";
import LearningWorldGoalPanelViewModel from "../../../../../Core/Presentation/React/LearningRoomDisplay/LearningWorldGoalPanel/LearningWorldGoalPanelViewModel";
import IViewModelControllerProvider from "../../../../../Core/Presentation/ViewModelProvider/IViewModelControllerProvider";

const viewModelControllerProviderMock = mock<IViewModelControllerProvider>();
const learningWorldPort = mock<ILearningWorldPort>();

describe("LearningWorldGoalPanelBuilder", () => {
  let systemUnderTest: LearningWorldGoalPanelBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      learningWorldPort
    );
    CoreDIContainer.rebind(
      CORE_TYPES.IViewModelControllerProvider
    ).toConstantValue(viewModelControllerProviderMock);
  });

  beforeEach(() => {
    systemUnderTest = new LearningWorldGoalPanelBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildController builds the controller and registers it and the viewModel with the VMCProvider", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["controller"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeInstanceOf(
      LearningWorldGoalPanelController
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledTimes(
      1
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledWith(
      systemUnderTest["viewModel"],
      systemUnderTest["controller"],
      LearningWorldGoalPanelViewModel
    );
  });

  test("buildPresenter builds the presenter and register it with the learningWorldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      LearningWorldGoalPanelPresenter
    );
    expect(
      learningWorldPort.registerLearningWorldGoalPanelPresenter
    ).toHaveBeenCalledTimes(1);
    expect(
      learningWorldPort.registerLearningWorldGoalPanelPresenter
    ).toHaveBeenCalledWith(systemUnderTest["presenter"]);
  });
});
