import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import AbstractPort from "../../../../../Core/Ports/AbstractPort/AbstractPort";
import ISpaceAdapter from "../../../../../Core/Ports/SpacePort/ISpaceAdapter";
import SpaceNamePanelBuilder from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceNamePanel/SpaceNamePanelBuilder";
import SpaceNamePanelController from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceNamePanel/SpaceNamePanelController";
import SpaceNamePanelPresenter from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceNamePanel/SpaceNamePanelPresenter";
import SpaceNamePanelViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceNamePanel/SpaceNamePanelViewModel";
import IViewModelControllerProvider from "../../../../../Core/Presentation/ViewModelProvider/IViewModelControllerProvider";

const viewModelControllerProviderMock = mock<IViewModelControllerProvider>();
const spacePortMock = mock<AbstractPort<ISpaceAdapter>>();

describe("SpaceNamePanelBuilder", () => {
  let systemUnderTest: SpaceNamePanelBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ISpacePort).toConstantValue(
      spacePortMock
    );
    CoreDIContainer.rebind(
      CORE_TYPES.IViewModelControllerProvider
    ).toConstantValue(viewModelControllerProviderMock);
  });

  beforeEach(() => {
    systemUnderTest = new SpaceNamePanelBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildController builds the controller and registers it and the viewModel with the VMCProvider", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["controller"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeInstanceOf(
      SpaceNamePanelController
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledTimes(
      1
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledWith(
      systemUnderTest["viewModel"],
      systemUnderTest["controller"],
      SpaceNamePanelViewModel
    );
  });

  test("buildPresenter builds the presenter and register it with the worldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      SpaceNamePanelPresenter
    );
    expect(spacePortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
