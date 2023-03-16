import { mock } from "jest-mock-extended";
import IWorldPort from "../../../../../Core/Application/Ports/Interfaces/IWorldPort";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ElementsDropdownBuilder from "../../../../../Core/Presentation/React/SpaceDisplay/ElementsDropdown/ElementsDropdownBuilder";

const worldPortMock = mock<IWorldPort>();

describe("ElementsDropdownBuilder", () => {
  let systemUnderTest: ElementsDropdownBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(PORT_TYPES.IWorldPort).toConstantValue(
      worldPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new ElementsDropdownBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter builds the presenter and register it with the worldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(worldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
