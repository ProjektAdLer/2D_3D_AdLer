import LearningElementModalController from "../../../../../../src/Components/Core/Presentation/React/LearningElementModal/LearningElementModalController";
import ScoreLearningElementUseCase from "../../../../Core/Application/ScoreLearningElement/ScoreLearningElementUseCase";

const executeAsyncMock = jest.spyOn(
  ScoreLearningElementUseCase.prototype,
  "executeAsync"
);

describe("LearningElementModalController", () => {
  let systemUnderTest: LearningElementModalController;

  beforeEach(() => {
    systemUnderTest = new LearningElementModalController();
  });

  test("scoreLearningElement calls the ScoreLearningElementUseCase", async () => {
    await systemUnderTest.scoreLearningElement(1);

    expect(executeAsyncMock).toHaveBeenCalledTimes(1);
    expect(executeAsyncMock).toHaveBeenCalledWith({
      learningElementId: 1,
    });
  });
});
