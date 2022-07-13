import LearningElementPort from "../../../Core/Ports/LearningElementPort/LearningElementPort";
import { LearningElementTO } from "../../../Core/Ports/LearningWorldPort/ILearningWorldPort";
import ILearningElementPresenter from "../../../Core/Presentation/Babylon/LearningElement/ILearningElementPresenter";
import LearningElementModalPresenter from "../../../Core/Presentation/React/LearningElementModal/LearningElementModalPresenter";

const presentLearningElementModalMock = jest.spyOn(
  LearningElementModalPresenter.prototype,
  "presentLearningElementModal"
);

describe("LearningElementPort", () => {
  let learningElementPort: LearningElementPort;

  beforeEach(() => {
    learningElementPort = new LearningElementPort();
  });

  test("addLearningElementPresenter adds new presenter", () => {
    const learningElementPresenter: ILearningElementPresenter = {
      presentLearningElement: jest.fn(),
    };

    learningElementPort.addLearningElementPresenter(learningElementPresenter);

    expect(learningElementPort["learningElementPresenters"]).toContain(
      learningElementPresenter
    );
  });

  test("addLearningElementPresenter throws error if presenter is added again", () => {
    const learningElementPresenter: ILearningElementPresenter = {
      presentLearningElement: jest.fn(),
    };

    learningElementPort.addLearningElementPresenter(learningElementPresenter);

    expect(() => {
      learningElementPort.addLearningElementPresenter(learningElementPresenter);
    }).toThrowError("already added");
  });

  test("startLearningElementEditing builds new LearningElementModalPresenter if its the first time it is called", () => {
    expect(learningElementPort["modalPresenter"]).not.toBeDefined();

    learningElementPort.startLearningElementEditing({
      id: 1,
      type: "h5p",
    } as LearningElementTO);

    expect(learningElementPort["modalPresenter"]).toBeDefined();
  });

  test("startLearningElementEditing calls presentLearningElementModal on learningElementModalPresenter", () => {
    const learningElementTO: LearningElementTO = {
      id: 1,
      type: "h5p",
    };

    learningElementPort.startLearningElementEditing(learningElementTO);

    expect(presentLearningElementModalMock).toHaveBeenCalledTimes(1);
    expect(presentLearningElementModalMock).toHaveBeenCalledWith(
      learningElementTO
    );
  });
});
