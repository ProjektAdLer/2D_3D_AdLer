import LearningElementPort from "../../../Core/Ports/LearningElementPort/LearningElementPort";
import { LearningElementTO } from "../../../Core/Ports/LearningWorldPort/ILearningWorldPort";
import ILearningElementPresenter from "../../../Core/Presentation/Babylon/LearningElement/ILearningElementPresenter";
import ILearningElementModalPresenter from "../../../Core/Presentation/React/LearningElementModal/ILearningElementModalPresenter";
import { mock } from "jest-mock-extended";
import { logger } from "../../../../Lib/Logger";

jest.mock("src/Lib/Logger");

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

  test("startLearningElementEditing throws error if no LearningElementModalPresenter is registered", () => {
    expect(systemUnderTest["modalPresenter"]).not.toBeDefined();

    expect(() => {
      systemUnderTest.startLearningElementEditing({
        id: 1,
        name: "test",
        learningElementData: {
          type: "h5p",
        },
      } as LearningElementTO);
    }).toThrowError("not registered");
  });

  test("startLearningElementEditing calls presentLearningElementModal on learningElementModalPresenter", () => {
    const learningElementTO: LearningElementTO = {
      id: 1,
      name: "test",
      learningElementData: {
        type: "h5p",
      },
    };
    const learningElementModalPresenterMock =
      mock<ILearningElementModalPresenter>();
    systemUnderTest.registerModalPresenter(learningElementModalPresenterMock);

    systemUnderTest.startLearningElementEditing(learningElementTO);

    expect(
      learningElementModalPresenterMock.presentLearningElementModal
    ).toHaveBeenCalledTimes(1);
    expect(
      learningElementModalPresenterMock.presentLearningElementModal
    ).toHaveBeenCalledWith(learningElementTO);
  });

  test("registerModalPresenter registers modalPresenter", () => {
    const learningElementModalPresenterMock =
      mock<ILearningElementModalPresenter>();

    systemUnderTest.registerModalPresenter(learningElementModalPresenterMock);

    expect(systemUnderTest["modalPresenter"]).toBe(
      learningElementModalPresenterMock
    );
  });

  test("registerModalPresenter warns if modalPresenter is already registered", () => {
    const learningElementModalPresenterMock1 =
      mock<ILearningElementModalPresenter>();
    systemUnderTest.registerModalPresenter(learningElementModalPresenterMock1);

    systemUnderTest.registerModalPresenter(learningElementModalPresenterMock1);

    expect(logger.warn).toHaveBeenCalledTimes(1);
  });

  test("registerModalPresenter overrides already registered presenter", () => {
    const learningElementModalPresenterMock1 =
      mock<ILearningElementModalPresenter>();
    systemUnderTest.registerModalPresenter(learningElementModalPresenterMock1);
    const learningElementModalPresenterMock2 =
      mock<ILearningElementModalPresenter>();

    systemUnderTest.registerModalPresenter(learningElementModalPresenterMock2);

    expect(systemUnderTest["modalPresenter"]).toBe(
      learningElementModalPresenterMock2
    );
  });
});
