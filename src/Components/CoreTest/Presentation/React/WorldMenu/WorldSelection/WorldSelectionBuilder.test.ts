import { mock } from "jest-mock-extended";
import IWorldPort from "../../../../../Core/Application/Ports/Interfaces/IWorldPort";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import WorldSelectionBuilder from "../../../../../Core/Presentation/React/WorldMenu/WorldSelection/WorldSelectionBuilder";

const worldPortMock = mock<IWorldPort>();

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
