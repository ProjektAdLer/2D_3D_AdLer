import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IWorldPort from "../../../../../Core/Ports/WorldPort/IWorldPort";
import WorldNamePanelBuilder from "../../../../../Core/Presentation/React/SpaceDisplay/WorldNamePanel/WorldNamePanelBuilder";
import WorldNamePanelController from "../../../../../Core/Presentation/React/SpaceDisplay/WorldNamePanel/WorldNamePanelController";
import WorldNamePanelPresenter from "../../../../../Core/Presentation/React/SpaceDisplay/WorldNamePanel/WorldNamePanelPresenter";
import WorldNamePanelViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/WorldNamePanel/WorldNamePanelViewModel";
import IViewModelControllerProvider from "../../../../../Core/Presentation/ViewModelProvider/IViewModelControllerProvider";

const viewModelControllerProviderMock = mock<IViewModelControllerProvider>();
const worldPort = mock<IWorldPort>();

describe("WorldNamePanelBuilder", () => {
  let systemUnderTest: WorldNamePanelBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.IWorldPort).toConstantValue(worldPort);
    CoreDIContainer.rebind(
      CORE_TYPES.IViewModelControllerProvider
    ).toConstantValue(viewModelControllerProviderMock);
  });

  beforeEach(() => {
    systemUnderTest = new WorldNamePanelBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildController builds the controller and registers it and the viewModel with the VMCProvider", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["controller"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeInstanceOf(
      WorldNamePanelController
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledTimes(
      1
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledWith(
      systemUnderTest["viewModel"],
      systemUnderTest["controller"],
      WorldNamePanelViewModel
    );
  });

  test("buildPresenter builds the presenter and register it with the worldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      WorldNamePanelPresenter
    );
    expect(worldPort.registerWorldNamePanelPresenter).toHaveBeenCalledTimes(1);
    expect(worldPort.registerWorldNamePanelPresenter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
