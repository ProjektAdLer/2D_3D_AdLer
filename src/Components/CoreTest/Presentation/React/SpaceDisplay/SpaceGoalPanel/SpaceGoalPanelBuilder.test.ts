import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IWorldPort from "../../../../../Core/Ports/WorldPort/IWorldPort";
import SpaceGoalPanelBuilder from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceGoalPanel/SpaceGoalPanelBuilder";
import SpaceGoalPanelPresenter from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceGoalPanel/SpaceGoalPanelPresenter";

const worldPortMock = mock<IWorldPort>();

describe("WorldGoalPanelBuilder", () => {
  let systemUnderTest: SpaceGoalPanelBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.IWorldPort).toConstantValue(
      worldPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new SpaceGoalPanelBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter builds the presenter and register it with the WorldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      SpaceGoalPanelPresenter
    );
    expect(worldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
