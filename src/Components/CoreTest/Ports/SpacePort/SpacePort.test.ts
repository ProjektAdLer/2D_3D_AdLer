import { injectable } from "inversify";
import BUILDER_TYPES from "../../../Core/DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import SpacePort from "../../../Core/Ports/SpacePort/SpacePort";
import PresentationBuilder from "../../../Core/Presentation/PresentationBuilder/PresentationBuilder";
import ScorePanelPresenter from "../../../Core/Presentation/React/SpaceDisplay/ScorePanel/ScorePanelPresenter";
import ScorePanelViewModel from "../../../Core/Presentation/React/SpaceDisplay/ScorePanel/ScorePanelViewModel";
import { mock } from "jest-mock-extended";
import SpacePresenter from "../../../Core/Presentation/Babylon/Spaces/SpacePresenter";
import SpaceTO from "../../../Core/Application/DataTransferObjects/SpaceTO";

jest.mock("src/Lib/Logger");

@injectable()
//@ts-ignore
class ScorePanelBuilderMock extends PresentationBuilder<
  ScorePanelViewModel,
  undefined,
  undefined,
  ScorePanelPresenter
> {
  constructor() {
    super(ScorePanelViewModel, undefined, undefined, ScorePanelPresenter);
  }
}

describe("SpacePort", () => {
  let systemUnderTest: SpacePort;

  beforeEach(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(BUILDER_TYPES.IScorePanelBuilder).to(
      ScorePanelBuilderMock
    );

    systemUnderTest = new SpacePort();
  });

  afterEach(() => {
    CoreDIContainer.restore();
  });

  test("registerAdapter adds new presenter", () => {
    const scorePanelPresenter = mock<ScorePanelPresenter>();

    systemUnderTest.registerAdapter(scorePanelPresenter);

    expect(systemUnderTest["adapters"][0]).toBe(scorePanelPresenter);
  });

  test("onScoreChanged calls presentScore on scorePanelPresenter", () => {
    const scorePanelPresenterMock = mock<ScorePanelPresenter>();
    systemUnderTest.registerAdapter(scorePanelPresenterMock);

    systemUnderTest.onScoreChanged(42, 42, 42, 1);

    expect(scorePanelPresenterMock.onScoreChanged).toHaveBeenCalledTimes(1);
    expect(scorePanelPresenterMock.onScoreChanged).toHaveBeenCalledWith(
      42,
      42,
      42,
      1
    );
  });

  test("presentNewScore calls openDoor at the spacePresenter with matching ID", () => {
    const spacePresenter1 = mock<SpacePresenter>();
    const spacePresenter2 = mock<SpacePresenter>();
    //@ts-ignore
    spacePresenter1.spaceId = 1;
    //@ts-ignore
    spacePresenter2.spaceId = 2;

    const scorePanelPresenterMock = mock<ScorePanelPresenter>();

    systemUnderTest.registerAdapter(spacePresenter1);
    systemUnderTest.registerAdapter(spacePresenter2);

    systemUnderTest.registerAdapter(scorePanelPresenterMock);

    systemUnderTest.onScoreChanged(42, 42, 42, 1);

    // expect(spacePresenter1.openDoor).toHaveBeenCalledTimes(1);
    // expect(spacePresenter2.openDoor).toHaveBeenCalledTimes(0);
  });

  test("should notify Adapters, on Space data loaded", () => {
    const spacePresenterMock = mock<SpacePresenter>();
    systemUnderTest.registerAdapter(spacePresenterMock);

    systemUnderTest.onSpaceLoaded({
      id: 1,
      name: "Space1",
      elements: [],
      description: "Space1Description",
      goals: "Space1Goals",
      requiredPoints: 42,
      requirements: [],
    } as SpaceTO);

    expect(spacePresenterMock.onSpaceLoaded).toHaveBeenCalledTimes(1);
    expect(spacePresenterMock.onSpaceLoaded).toHaveBeenCalledWith({
      id: 1,
      name: "Space1",
      elements: [],
      description: "Space1Description",
      goals: "Space1Goals",
      requiredPoints: 42,
      requirements: [],
    });
  });
});
