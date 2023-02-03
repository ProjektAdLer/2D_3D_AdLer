import mock from "jest-mock-extended/lib/Mock";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import IWorldPort from "../../../../../Core/Ports/WorldPort/IWorldPort";
import ScorePanelBuilder from "../../../../../Core/Presentation/React/SpaceDisplay/ScorePanel/ScorePanelBuilder";

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

  test("buildPresenter builds the presenter, and registers it with the WorldPort", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(worldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
