import mock from "jest-mock-extended/lib/Mock";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IWorldPort from "../../../../../Core/Ports/WorldPort/IWorldPort";
import ElementModalBuilder from "../../../../../Core/Presentation/React/SpaceDisplay/ElementModal/ElementModalBuilder";

const worldPortMock = mock<IWorldPort>();

describe("elementModalBuilder", () => {
  let systemUnderTest: ElementModalBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IWorldPort>(PORT_TYPES.IWorldPort).toConstantValue(
      worldPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new ElementModalBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter builds the presenter and registers presenter with the ElementPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(worldPortMock.registerAdapter).toHaveBeenCalledTimes(1);
    expect(worldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
