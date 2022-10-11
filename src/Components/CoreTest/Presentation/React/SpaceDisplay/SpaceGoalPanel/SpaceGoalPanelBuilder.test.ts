import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import AbstractPort from "../../../../../Core/Ports/AbstractPort/AbstractPort";
import ISpaceAdapter from "../../../../../Core/Ports/SpacePort/ISpaceAdapter";
import SpaceGoalPanelBuilder from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceGoalPanel/SpaceGoalPanelBuilder";
import SpaceGoalPanelController from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceGoalPanel/SpaceGoalPanelController";
import SpaceGoalPanelPresenter from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceGoalPanel/SpaceGoalPanelPresenter";
import SpaceGoalPanelViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceGoalPanel/SpaceGoalPanelViewModel";
import IViewModelControllerProvider from "../../../../../Core/Presentation/ViewModelProvider/IViewModelControllerProvider";

const viewModelControllerProviderMock = mock<IViewModelControllerProvider>();
const spacePortMock = mock<AbstractPort<ISpaceAdapter>>();

describe("WorldGoalPanelBuilder", () => {
  let systemUnderTest: SpaceGoalPanelBuilder;

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
    systemUnderTest = new SpaceGoalPanelBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildController builds the controller and registers it and the viewModel with the VMCProvider", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["controller"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeInstanceOf(
      SpaceGoalPanelController
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledTimes(
      1
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledWith(
      systemUnderTest["viewModel"],
      systemUnderTest["controller"],
      SpaceGoalPanelViewModel
    );
  });

  test("buildPresenter builds the presenter and register it with the WorldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      SpaceGoalPanelPresenter
    );
    expect(spacePortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
