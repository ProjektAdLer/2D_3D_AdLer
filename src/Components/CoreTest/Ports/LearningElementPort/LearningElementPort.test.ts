import LearningElementPort from "../../../Core/Ports/LearningElementPort/LearningElementPort";
import { LearningElementTO } from "../../../Core/Ports/LearningWorldPort/ILearningWorldPort";
import ILearningElementPresenter from "../../../Core/Presentation/Babylon/LearningElement/ILearningElementPresenter";
import LearningElementModalPresenter from "../../../Core/Presentation/React/LearningElementModal/LearningElementModalPresenter";

// Spyon still needed because presentLearningElementModal from Modal presenter is needed. ~FK
const presentLearningElementModalMock = jest.spyOn(
  LearningElementModalPresenter.prototype,
  "presentLearningElementModal"
);

describe("LearningElementPort", () => {
  let systemUnderTest: LearningElementPort;

  beforeEach(() => {
    systemUnderTest = new LearningElementPort();
  });

  test("addLearningElementPresenter adds new presenter", () => {
    const learningElementPresenter: ILearningElementPresenter = {
      presentLearningElement: jest.fn(),
    };

    systemUnderTest.addLearningElementPresenter(learningElementPresenter);

    expect(systemUnderTest["learningElementPresenters"]).toContain(
      learningElementPresenter
    );
  });

  test("addLearningElementPresenter throws error if presenter is added again", () => {
    const learningElementPresenter: ILearningElementPresenter = {
      presentLearningElement: jest.fn(),
    };

    systemUnderTest.addLearningElementPresenter(learningElementPresenter);

    expect(() => {
      systemUnderTest.addLearningElementPresenter(learningElementPresenter);
    }).toThrowError("already added");
  });

  test("startLearningElementEditing builds new LearningElementModalPresenter if its the first time it is called", () => {
    expect(systemUnderTest["modalPresenter"]).not.toBeDefined();

    systemUnderTest.startLearningElementEditing({
      id: 1,
      name: "test",
      learningElementData: {
        type: "h5p",
      },
    } as LearningElementTO);

    expect(systemUnderTest["modalPresenter"]).toBeDefined();
  });

  test("startLearningElementEditing calls presentLearningElementModal on learningElementModalPresenter", () => {
    const learningElementTO: LearningElementTO = {
      id: 1,
      name: "test",
      learningElementData: {
        type: "h5p",
      },
    };

    systemUnderTest.startLearningElementEditing(learningElementTO);

    expect(presentLearningElementModalMock).toHaveBeenCalledTimes(1);
    expect(presentLearningElementModalMock).toHaveBeenCalledWith(
      learningElementTO
    );
  });
});
