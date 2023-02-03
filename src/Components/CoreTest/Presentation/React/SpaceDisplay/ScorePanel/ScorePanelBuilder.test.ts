import mock from "jest-mock-extended/lib/Mock";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ISpacePort from "../../../../../Core/Ports/SpacePort/ISpacePort";
import IWorldPort from "../../../../../Core/Ports/WorldPort/IWorldPort";
import ScorePanelBuilder from "../../../../../Core/Presentation/React/SpaceDisplay/ScorePanel/ScorePanelBuilder";
import ScorePanelViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/ScorePanel/ScorePanelViewModel";

const worldPortMock = mock<IWorldPort>();

describe("ScorePanelBuilder", () => {
  let systemUnderTest: ScorePanelBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(PORT_TYPES.IWorldPort).toConstantValue(
      worldPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new ScorePanelBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter builds the presenter, and registers it with the SpacePort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(worldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
