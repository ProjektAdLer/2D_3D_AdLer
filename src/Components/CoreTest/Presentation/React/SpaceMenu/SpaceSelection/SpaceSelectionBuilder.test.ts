import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import AbstractPort from "../../../../../Core/Ports/AbstractPort/AbstractPort";
import IWorldAdapter from "../../../../../Core/Ports/WorldPort/IWorldAdapter";
import SpaceSelectionBuilder from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/SpaceSelectionBuilder";

const worldPortMock = mock<AbstractPort<IWorldAdapter>>();

describe("SpaceSelectionBuilder", () => {
  let systemUnderTest: SpaceSelectionBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.IWorldPort).toConstantValue(
      worldPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new SpaceSelectionBuilder();
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
