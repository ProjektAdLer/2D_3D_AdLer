import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ILearningWorldPort from "../../../../Core/Ports/LearningWorldPort/ILearningWorldPort";
import LearningElementsDropdownBuilder from "../../../../Core/Presentation/React/LearningElementsDropdown/LearningElementsDropdownBuilder";
import LearningElementsDropdownController from "../../../../Core/Presentation/React/LearningElementsDropdown/LearningElementsDropdownController";
import LearningElementsDropdownPresenter from "../../../../Core/Presentation/React/LearningElementsDropdown/LearningElementsDropdownPresenter";
import LearningElementsDropdownViewModel from "../../../../Core/Presentation/React/LearningElementsDropdown/LearningElementsDropdownViewModel";
import IViewModelControllerProvider from "../../../../Core/Presentation/ViewModelProvider/IViewModelControllerProvider";

const viewModelControllerProviderMock = mock<IViewModelControllerProvider>();
const learningWorldPortMock = mock<ILearningWorldPort>();

describe("LearningElementsDropdownBuilder", () => {
  let systemUnderTest: LearningElementsDropdownBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      learningWorldPortMock
    );
    CoreDIContainer.rebind(
      CORE_TYPES.IViewModelControllerProvider
    ).toConstantValue(viewModelControllerProviderMock);
  });

  beforeEach(() => {
    systemUnderTest = new LearningElementsDropdownBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildController builds the controller and registers it and the viewModel with the VMCProvider", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["controller"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeInstanceOf(
      LearningElementsDropdownController
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledTimes(
      1
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledWith(
      systemUnderTest["viewModel"],
      systemUnderTest["controller"],
      LearningElementsDropdownViewModel
    );
  });

  test("buildPresenter builds the presenter and register it with the learningWorldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      LearningElementsDropdownPresenter
    );
    expect(
      learningWorldPortMock.registerLearningElementDropdownPresenter
    ).toHaveBeenCalledTimes(1);
    expect(
      learningWorldPortMock.registerLearningElementDropdownPresenter
    ).toHaveBeenCalledWith(systemUnderTest["presenter"]);
  });
});
