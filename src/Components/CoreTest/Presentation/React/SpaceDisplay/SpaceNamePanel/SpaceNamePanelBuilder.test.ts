import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IWorldPort from "../../../../../Core/Ports/WorldPort/IWorldPort";
import SpaceNamePanelBuilder from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceNamePanel/SpaceNamePanelBuilder";
import SpaceNamePanelPresenter from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceNamePanel/SpaceNamePanelPresenter";
import IViewModelControllerProvider from "../../../../../Core/Presentation/ViewModelProvider/IViewModelControllerProvider";

const viewModelControllerProviderMock = mock<IViewModelControllerProvider>();
const worldPortMock = mock<IWorldPort>();

describe("SpaceNamePanelBuilder", () => {
  let systemUnderTest: SpaceNamePanelBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.IWorldPort).toConstantValue(
      worldPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new SpaceNamePanelBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter builds the presenter and register it with the worldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      SpaceNamePanelPresenter
    );
    expect(worldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
