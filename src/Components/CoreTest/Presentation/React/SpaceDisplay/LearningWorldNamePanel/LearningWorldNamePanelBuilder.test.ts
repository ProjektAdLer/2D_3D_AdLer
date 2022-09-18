import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ILearningWorldPort from "../../../../../Core/Ports/LearningWorldPort/ILearningWorldPort";
import LearningWorldNamePanelBuilder from "../../../../../Core/Presentation/React/LearningRoomDisplay/LearningWorldNamePanel/LearningWorldNamePanelBuilder";
import LearningWorldNamePanelController from "../../../../../Core/Presentation/React/LearningRoomDisplay/LearningWorldNamePanel/LearningWorldNamePanelController";
import LearningWorldNamePanelPresenter from "../../../../../Core/Presentation/React/LearningRoomDisplay/LearningWorldNamePanel/LearningWorldNamePanelPresenter";
import LearningWorldNamePanelViewModel from "../../../../../Core/Presentation/React/LearningRoomDisplay/LearningWorldNamePanel/LearningWorldNamePanelViewModel";
import IViewModelControllerProvider from "../../../../../Core/Presentation/ViewModelProvider/IViewModelControllerProvider";

const viewModelControllerProviderMock = mock<IViewModelControllerProvider>();
const learningWorldPort = mock<ILearningWorldPort>();

describe("LearningWorldNamePanelBuilder", () => {
  let systemUnderTest: LearningWorldNamePanelBuilder;

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
    systemUnderTest = new LearningWorldNamePanelBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildController builds the controller and registers it and the viewModel with the VMCProvider", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["controller"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeInstanceOf(
      LearningWorldNamePanelController
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledTimes(
      1
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledWith(
      systemUnderTest["viewModel"],
      systemUnderTest["controller"],
      LearningWorldNamePanelViewModel
    );
  });

  test("buildPresenter builds the presenter and register it with the learningWorldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      LearningWorldNamePanelPresenter
    );
    expect(
      learningWorldPort.registerLearningWorldNamePanelPresenter
    ).toHaveBeenCalledTimes(1);
    expect(
      learningWorldPort.registerLearningWorldNamePanelPresenter
    ).toHaveBeenCalledWith(systemUnderTest["presenter"]);
  });
});
