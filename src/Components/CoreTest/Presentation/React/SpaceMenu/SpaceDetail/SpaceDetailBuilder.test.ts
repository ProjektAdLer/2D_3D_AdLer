import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ISpacePort from "../../../../../Core/Ports/SpacePort/ISpacePort";
import AbstractPort from "../../../../../Core/Ports/AbstractPort/AbstractPort";
import SpaceDetailBuilder from "../../../../../Core/Presentation/React/SpaceMenu/SpaceDetail/SpaceDetailBuilder";

const spacePortMock = mock<AbstractPort<ISpacePort>>();
describe("SpaceDetailBuilder", () => {
  let systemUnderTest: SpaceDetailBuilder;
  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ISpacePort).toConstantValue(
      spacePortMock
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

  test("buildPresenter builds the presenter and register it with the SpacePort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(spacePortMock.registerAdapter).toHaveBeenCalledTimes(1);
    expect(spacePortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
