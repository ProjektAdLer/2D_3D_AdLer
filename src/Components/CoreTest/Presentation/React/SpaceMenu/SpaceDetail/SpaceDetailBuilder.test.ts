import { mock } from "jest-mock-extended";
import IWorldPort from "../../../../../Core/Application/Ports/Interfaces/IWorldPort";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import SpaceDetailBuilder from "../../../../../Core/Presentation/React/SpaceMenu/SpaceDetail/SpaceDetailBuilder";

const worldPortMock = mock<IWorldPort>();

describe("SpaceDetailBuilder", () => {
  let systemUnderTest: SpaceDetailBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.IWorldPort).toConstantValue(
      worldPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new SpaceDetailBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("constructor doesn't throw", () => {
    expect(systemUnderTest).toBeDefined();
  });

  test("buildPresenter builds the presenter and register it with the WorldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(worldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
