import LearningElementModalController from "../../../../../../src/Components/Core/Presentation/React/LearningElementModal/LearningElementModalController";
import ScoreLearningElementUseCase from "../../../../Core/Application/ScoreLearningElement/ScoreLearningElementUseCase";

const executeAsyncMock = jest.spyOn(
  ScoreLearningElementUseCase.prototype,
  "executeAsync"
);

describe("LearningElementModalController", () => {
  let learningElementModalController: LearningElementModalController;

  beforeEach(() => {
    learningElementModalController = new LearningElementModalController();
  });

  test("scoreLearningElement calls the ScoreLearningElementUseCase", async () => {
    await learningElementModalController.scoreLearningElement(1);

    expect(executeAsyncMock).toHaveBeenCalledTimes(1);
    expect(executeAsyncMock).toHaveBeenCalledWith({
      learningElementId: 1,
    });
  });
});
