import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IWorldPort from "../../../../../Core/Ports/WorldPort/IWorldPort";
import ElementsDropdownBuilder from "../../../../../Core/Presentation/React/SpaceDisplay/ElementsDropdown/ElementsDropdownBuilder";
import ElementsDropdownController from "../../../../../Core/Presentation/React/SpaceDisplay/ElementsDropdown/ElementsDropdownController";
import ElementsDropdownPresenter from "../../../../../Core/Presentation/React/SpaceDisplay/ElementsDropdown/ElementsDropdownPresenter";
import ElementsDropdownViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/ElementsDropdown/ElementsDropdownViewModel";
import IViewModelControllerProvider from "../../../../../Core/Presentation/ViewModelProvider/IViewModelControllerProvider";

const viewModelControllerProviderMock = mock<IViewModelControllerProvider>();
const worldPortMock = mock<IWorldPort>();

describe("ElementsDropdownBuilder", () => {
  let systemUnderTest: ElementsDropdownBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.IWorldPort).toConstantValue(
      worldPortMock
    );
    CoreDIContainer.rebind(
      CORE_TYPES.IViewModelControllerProvider
    ).toConstantValue(viewModelControllerProviderMock);
  });

  beforeEach(() => {
    systemUnderTest = new ElementsDropdownBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildController builds the controller and registers it and the viewModel with the VMCProvider", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["controller"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeInstanceOf(
      ElementsDropdownController
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledTimes(
      1
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledWith(
      systemUnderTest["viewModel"],
      systemUnderTest["controller"],
      ElementsDropdownViewModel
    );
  });

  test("buildPresenter builds the presenter and register it with the worldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      ElementsDropdownPresenter
    );
    expect(
      worldPortMock.registerElementDropdownPresenter
    ).toHaveBeenCalledTimes(1);
    expect(worldPortMock.registerElementDropdownPresenter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
