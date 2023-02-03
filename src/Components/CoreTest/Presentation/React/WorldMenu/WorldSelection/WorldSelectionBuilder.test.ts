import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import AbstractPort from "../../../../../Core/Ports/AbstractPort/AbstractPort";
import IWorldAdapter from "../../../../../Core/Ports/WorldPort/IWorldAdapter";
import WorldSelectionBuilder from "../../../../../Core/Presentation/React/WorldMenu/WorldSelection/WorldSelectionBuilder";

const worldPortMock = mock<AbstractPort<IWorldAdapter>>();

describe("WorldSelectionBuilder", () => {
  let systemUnderTest: WorldSelectionBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.IWorldPort).toConstantValue(
      worldPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new WorldSelectionBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter registers presenter with WorldPort", () => {
    // build view model first
    systemUnderTest.buildViewModel();

    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(worldPortMock.registerAdapter).toBeCalledTimes(1);
    expect(worldPortMock.registerAdapter).toBeCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
