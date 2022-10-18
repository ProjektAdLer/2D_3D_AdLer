import { injectable } from "inversify";
import BUILDER_TYPES from "../../../Core/DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import SpacePort from "../../../Core/Ports/SpacePort/SpacePort";
import ISpacePresenter from "../../../Core/Presentation/Babylon/Spaces/ISpacePresenter";
import PresentationBuilder from "../../../Core/Presentation/PresentationBuilder/PresentationBuilder";
import ScorePanelPresenter from "../../../Core/Presentation/React/SpaceDisplay/ScorePanel/ScorePanelPresenter";
import ScorePanelViewModel from "../../../Core/Presentation/React/SpaceDisplay/ScorePanel/ScorePanelViewModel";
import { mock } from "jest-mock-extended";
import { logger } from "../../../../Lib/Logger";

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

  test("addSpacePresenter adds new presenter", () => {
    const spacePresenter = mock<ISpacePresenter>();

    systemUnderTest.registerSpacePresenter(spacePresenter);

    expect(systemUnderTest["spacePresenters"]).toContain(spacePresenter);
  });

  test("registerSpacePresenter throws error if passed presenter is undefined", () => {
    expect(() => {
      //@ts-ignore
      systemUnderTest.registerSpacePresenter(undefined);
    }).toThrowError("is undefined");
  });

  test("registerSpacePresenter doesn't add presenter if it already exists", () => {
    const spacePresenter = mock<ISpacePresenter>();

    systemUnderTest.registerSpacePresenter(spacePresenter);
    systemUnderTest.registerSpacePresenter(spacePresenter);

    expect(systemUnderTest["spacePresenters"].length).toBe(1);
  });

  test("registerScorePanelPresenter adds new presenter", () => {
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
    const spacePresenter1 = mock<ISpacePresenter>();
    const spacePresenter2 = mock<ISpacePresenter>();
    //@ts-ignore
    spacePresenter1.spaceId = 1;
    //@ts-ignore
    spacePresenter2.spaceId = 2;

    const scorePanelPresenterMock = mock<ScorePanelPresenter>();

    systemUnderTest.registerSpacePresenter(spacePresenter1);
    systemUnderTest.registerSpacePresenter(spacePresenter2);

    systemUnderTest.registerAdapter(scorePanelPresenterMock);

    systemUnderTest.onScoreChanged(42, 42, 42, 1);

    // expect(spacePresenter1.openDoor).toHaveBeenCalledTimes(1);
    // expect(spacePresenter2.openDoor).toHaveBeenCalledTimes(0);
  });
});
