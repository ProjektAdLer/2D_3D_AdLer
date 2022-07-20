import { injectable } from "inversify";
import BUILDER_TYPES from "../../../Core/DependencyInjection/Builders/BUILDER_TYPES";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import LearningRoomPort from "../../../Core/Ports/LearningRoomPort/LearningRoomPort";
import ILearningRoomPresenter from "../../../Core/Presentation/Babylon/LearningRoom/ILearningRoomPresenter";
import PresentationBuilder from "../../../Core/Presentation/PresentationBuilder/PresentationBuilder";
import ScorePanelPresenter from "../../../Core/Presentation/React/ScorePanel/ScorePanelPresenter";
import ScorePanelViewModel from "../../../Core/Presentation/React/ScorePanel/ScorePanelViewModel";

const presentScoreMock = jest.spyOn(
  ScorePanelPresenter.prototype,
  "presentScore"
);

class LearningRoomPresenterStubWithId1 implements ILearningRoomPresenter {
  get LearningRoomId(): number {
    return 1;
  }
  openDoor(): void {
    return;
  }
  presentLearningRoom(): void {
    return;
  }
}

class LearningRoomPresenterStubWithId2 implements ILearningRoomPresenter {
  get LearningRoomId(): number {
    return 2;
  }
  openDoor(): void {
    return;
  }
  presentLearningRoom(): void {
    return;
  }
}

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
    const learningRoomPresenter = new LearningRoomPresenterStubWithId1();

    systemUnderTest.addLearningRoomPresenter(learningRoomPresenter);

    expect(systemUnderTest["learningRoomPresenters"]).toContain(
      learningRoomPresenter
    );
  });

  test("addLearningRoomPresenter throws error if passed presenter is undefined", () => {
    expect(() => {
      //@ts-ignore
      systemUnderTest.addLearningRoomPresenter(undefined);
    }).toThrowError("not defined");
  });

  test("addLearningRoomPresenter doesn't add presenter if it already exists", () => {
    const learningRoomPresenter = new LearningRoomPresenterStubWithId1();

    systemUnderTest.addLearningRoomPresenter(learningRoomPresenter);
    systemUnderTest.addLearningRoomPresenter(learningRoomPresenter);

    expect(systemUnderTest["learningRoomPresenters"].length).toBe(1);
  });

  test("presentNewScore builds new ScorePanelPresenter if its the first time it is called", () => {
    expect(systemUnderTest["scorePanelPresenter"]).not.toBeDefined();

    systemUnderTest.presentNewScore(1, false, 1);

    expect(systemUnderTest["scorePanelPresenter"]).toBeDefined();
  });

  test("presentNewScore calls presentScore on scorePanelPresenter", () => {
    systemUnderTest.presentNewScore(1, false, 1);

    expect(presentScoreMock).toHaveBeenCalledTimes(1);
    expect(presentScoreMock).toHaveBeenCalledWith(1);
  });

  test("presentNewScore calls openDoor at the roomPresenter with matching ID", () => {
    LearningRoomPresenterStubWithId1.prototype.openDoor = jest.fn();
    LearningRoomPresenterStubWithId2.prototype.openDoor = jest.fn();
    const learningRoomPresenter1 = new LearningRoomPresenterStubWithId1();
    const learningRoomPresenter2 = new LearningRoomPresenterStubWithId2();

    systemUnderTest.addLearningRoomPresenter(learningRoomPresenter1);
    systemUnderTest.addLearningRoomPresenter(learningRoomPresenter2);

    systemUnderTest.presentNewScore(1, true, 1);

    expect(learningRoomPresenter1.openDoor).toHaveBeenCalledTimes(1);
    expect(learningRoomPresenter2.openDoor).toHaveBeenCalledTimes(0);
  });
});
