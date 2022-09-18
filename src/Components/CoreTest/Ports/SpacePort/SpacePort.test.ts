import { injectable } from "inversify";
import BUILDER_TYPES from "../../../Core/DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import SpacePort from "../../../Core/Ports/SpacePort/SpacePort";
import ISpacePresenter from "../../../Core/Presentation/Babylon/Space/ISpacePresenter";
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

    systemUnderTest.registerScorePanelPresenter(scorePanelPresenter);

    expect(systemUnderTest["scorePanelPresenter"]).toBe(scorePanelPresenter);
  });

  test("registerScorePanelPresenter warns if its called the second time", () => {
    const scorePanelPresenter1 = mock<ScorePanelPresenter>();
    const scorePanelPresenter2 = mock<ScorePanelPresenter>();

    systemUnderTest.registerScorePanelPresenter(scorePanelPresenter1);
    systemUnderTest.registerScorePanelPresenter(scorePanelPresenter2);

    expect(logger.warn).toBeCalledTimes(1);
    expect(systemUnderTest["scorePanelPresenter"]).toBe(scorePanelPresenter2);
  });

  test("presentNewScore throws if no scorePanelPresenter is registered", () => {
    expect(() => {
      systemUnderTest.presentNewScore(0, false, 0);
    }).toThrowError("ScorePanelPresenter is not registered");
  });

  test("presentNewScore throws if no spacePresenter is registered", () => {
    systemUnderTest.registerScorePanelPresenter(mock<ScorePanelPresenter>());

    expect(() => {
      systemUnderTest.presentNewScore(0, false, 0);
    }).toThrowError("No SpacePresenter is registered");
  });

  test("presentNewScore calls presentScore on scorePanelPresenter", () => {
    const scorePanelPresenterMock = mock<ScorePanelPresenter>();
    systemUnderTest.registerScorePanelPresenter(scorePanelPresenterMock);
    const spacePresenterMock = mock<ISpacePresenter>();
    systemUnderTest.registerSpacePresenter(spacePresenterMock);

    systemUnderTest.presentNewScore(1, false, 1);

    expect(scorePanelPresenterMock.presentScore).toHaveBeenCalledTimes(1);
    expect(scorePanelPresenterMock.presentScore).toHaveBeenCalledWith(1);
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

    systemUnderTest.registerScorePanelPresenter(scorePanelPresenterMock);

    systemUnderTest.presentNewScore(1, true, 1);

    expect(spacePresenter1.openDoor).toHaveBeenCalledTimes(1);
    expect(spacePresenter2.openDoor).toHaveBeenCalledTimes(0);
  });
});
