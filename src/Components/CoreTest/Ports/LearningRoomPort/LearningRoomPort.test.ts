import { injectable } from "inversify";
import BUILDER_TYPES from "../../../Core/DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import LearningRoomPort from "../../../Core/Ports/LearningRoomPort/LearningRoomPort";
import ILearningRoomPresenter from "../../../Core/Presentation/Babylon/LearningRoom/ILearningRoomPresenter";
import PresentationBuilder from "../../../Core/Presentation/PresentationBuilder/PresentationBuilder";
import ScorePanelPresenter from "../../../Core/Presentation/React/ScorePanel/ScorePanelPresenter";
import ScorePanelViewModel from "../../../Core/Presentation/React/ScorePanel/ScorePanelViewModel";
import { mock } from "jest-mock-extended";

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

describe("LearningRoomPort", () => {
  let systemUnderTest: LearningRoomPort;

  beforeEach(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(BUILDER_TYPES.IScorePanelBuilder).to(
      ScorePanelBuilderMock
    );

    systemUnderTest = new LearningRoomPort();
  });

  afterEach(() => {
    CoreDIContainer.restore();
  });

  test("addLearningRoomPresenter adds new presenter", () => {
    const learningRoomPresenter = mock<ILearningRoomPresenter>();

    systemUnderTest.registerLearningRoomPresenter(learningRoomPresenter);

    expect(systemUnderTest["learningRoomPresenters"]).toContain(
      learningRoomPresenter
    );
  });

  test("addLearningRoomPresenter throws error if passed presenter is undefined", () => {
    expect(() => {
      //@ts-ignore
      systemUnderTest.registerLearningRoomPresenter(undefined);
    }).toThrowError("is undefined");
  });

  test("addLearningRoomPresenter doesn't add presenter if it already exists", () => {
    const learningRoomPresenter = mock<ILearningRoomPresenter>();

    systemUnderTest.registerLearningRoomPresenter(learningRoomPresenter);
    systemUnderTest.registerLearningRoomPresenter(learningRoomPresenter);

    expect(systemUnderTest["learningRoomPresenters"].length).toBe(1);
  });

  test("presentNewScore throws if no scorePanelPresenter is registered", () => {
    expect(() => {
      systemUnderTest.presentNewScore(0, false, 0);
    }).toThrowError("ScorePanelPresenter is not registered");
  });

  test("presentNewScore throws if no learningRoomPresenter is registered", () => {
    systemUnderTest.registerScorePanelPresenter(mock<ScorePanelPresenter>());

    expect(() => {
      systemUnderTest.presentNewScore(0, false, 0);
    }).toThrowError("No LearningRoomPresenter is registered");
  });

  test("presentNewScore calls presentScore on scorePanelPresenter", () => {
    const scorePanelPresenterMock = mock<ScorePanelPresenter>();
    systemUnderTest.registerScorePanelPresenter(scorePanelPresenterMock);
    const learningRoomPresenterMock = mock<ILearningRoomPresenter>();
    systemUnderTest.registerLearningRoomPresenter(learningRoomPresenterMock);

    systemUnderTest.presentNewScore(1, false, 1);

    expect(scorePanelPresenterMock.presentScore).toHaveBeenCalledTimes(1);
    expect(scorePanelPresenterMock.presentScore).toHaveBeenCalledWith(1);
  });

  test("presentNewScore calls openDoor at the roomPresenter with matching ID", () => {
    const learningRoomPresenter1 = mock<ILearningRoomPresenter>();
    const learningRoomPresenter2 = mock<ILearningRoomPresenter>();
    //@ts-ignore
    learningRoomPresenter1.LearningRoomId = 1;
    //@ts-ignore
    learningRoomPresenter2.LearningRoomId = 2;

    const scorePanelPresenterMock = mock<ScorePanelPresenter>();

    systemUnderTest.registerLearningRoomPresenter(learningRoomPresenter1);
    systemUnderTest.registerLearningRoomPresenter(learningRoomPresenter2);

    systemUnderTest.registerScorePanelPresenter(scorePanelPresenterMock);

    systemUnderTest.presentNewScore(1, true, 1);

    expect(learningRoomPresenter1.openDoor).toHaveBeenCalledTimes(1);
    expect(learningRoomPresenter2.openDoor).toHaveBeenCalledTimes(0);
  });
});
