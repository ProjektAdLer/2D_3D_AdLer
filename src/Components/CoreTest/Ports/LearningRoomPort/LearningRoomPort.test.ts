import LearningRoomPort from "../../../Core/Ports/LearningRoomPort/LearningRoomPort";
import ILearningRoomPresenter from "../../../Core/Presentation/Babylon/LearningRoom/ILearningRoomPresenter";
import LearningRoomPresenter from "../../../Core/Presentation/Babylon/LearningRoom/LearningRoomPresenter";

class LearningRoomPresenterStub implements ILearningRoomPresenter {
  private identifier: string = "test";
  get LearningRoomId(): number {
    return 0;
  }
  openDoor(): void {
    return;
  }
  public presentLearningRoom(): void {
    return;
  }
}

describe("LearningRoomPort", () => {
  let learningRoomPort: LearningRoomPort;

  beforeEach(() => {
    learningRoomPort = new LearningRoomPort();
  });

  test("addLearningRoomPresenter adds new presenter", () => {
    const learningRoomPresenter = new LearningRoomPresenterStub();
    learningRoomPort.addLearningRoomPresenter(learningRoomPresenter);

    expect(learningRoomPort["learningRoomPresenters"]).toContain(
      learningRoomPresenter
    );
  });
});
