import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IUIPort from "../../../../../Core/Ports/UIPort/IUIPort";
import ModalManagerBuilder from "../../../../../Core/Presentation/React/SpaceDisplay/ModalManager/ModalManagerBuilder";
import ModalManagerController from "../../../../../Core/Presentation/React/SpaceDisplay/ModalManager/ModalManagerController";
import ModalManagerPresenter from "../../../../../Core/Presentation/React/SpaceDisplay/ModalManager/ModalManagerPresenter";
import ModalManagerViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/ModalManager/ModalManagerViewModel";
import IViewModelControllerProvider from "../../../../../Core/Presentation/ViewModelProvider/IViewModelControllerProvider";

const viewModelControllerProviderMock = mock<IViewModelControllerProvider>();
const UIPortMock = mock<IUIPort>();

describe("ModalManagerBuilder", () => {
  let systemUnderTest: ModalManagerBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.IUIPort).toConstantValue(UIPortMock);
    CoreDIContainer.rebind(
      CORE_TYPES.IViewModelControllerProvider
    ).toConstantValue(viewModelControllerProviderMock);
  });

  beforeEach(() => {
    systemUnderTest = new ModalManagerBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildController builds the controller and registers it and the viewModel with the VMCProvider", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["controller"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeInstanceOf(
      ModalManagerController
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledTimes(
      1
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledWith(
      systemUnderTest["viewModel"],
      systemUnderTest["controller"],
      ModalManagerViewModel
    );
  });

  test("buildPresenter builds the presenter and register it with the learningWorldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(ModalManagerPresenter);
    expect(UIPortMock.registerModalManager).toHaveBeenCalledTimes(1);
    expect(UIPortMock.registerModalManager).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
