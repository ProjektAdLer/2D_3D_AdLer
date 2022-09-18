import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IWorldPort from "../../../../../Core/Ports/WorldPort/IWorldPort";
import WorldGoalPanelBuilder from "../../../../../Core/Presentation/React/SpaceDisplay/WorldGoalPanel/WorldGoalPanelBuilder";
import WorldGoalPanelController from "../../../../../Core/Presentation/React/SpaceDisplay/WorldGoalPanel/WorldGoalPanelController";
import WorldGoalPanelPresenter from "../../../../../Core/Presentation/React/SpaceDisplay/WorldGoalPanel/WorldGoalPanelPresenter";
import WorldGoalPanelViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/WorldGoalPanel/WorldGoalPanelViewModel";
import IViewModelControllerProvider from "../../../../../Core/Presentation/ViewModelProvider/IViewModelControllerProvider";

const viewModelControllerProviderMock = mock<IViewModelControllerProvider>();
const worldPort = mock<IWorldPort>();

describe("WorldGoalPanelBuilder", () => {
  let systemUnderTest: WorldGoalPanelBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.IWorldPort).toConstantValue(worldPort);
    CoreDIContainer.rebind(
      CORE_TYPES.IViewModelControllerProvider
    ).toConstantValue(viewModelControllerProviderMock);
  });

  beforeEach(() => {
    systemUnderTest = new WorldGoalPanelBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildController builds the controller and registers it and the viewModel with the VMCProvider", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["controller"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeInstanceOf(
      WorldGoalPanelController
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledTimes(
      1
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledWith(
      systemUnderTest["viewModel"],
      systemUnderTest["controller"],
      WorldGoalPanelViewModel
    );
  });

  test("buildPresenter builds the presenter and register it with the WorldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      WorldGoalPanelPresenter
    );
    expect(worldPort.registerWorldGoalPanelPresenter).toHaveBeenCalledTimes(1);
    expect(worldPort.registerWorldGoalPanelPresenter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
