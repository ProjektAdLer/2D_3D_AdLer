import LearningElementStartedUseCase from "../../../../Core/Application/LearningElementStarted/LearningElementStartedUseCase";
import LearningElementController from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementController";
import LearningElementViewModel from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementViewModel";

const executeMock = jest.spyOn(
  LearningElementStartedUseCase.prototype,
  "execute"
);

describe("LearningElementController", () => {
  test("clicked calls useCase", () => {
    const viewModel = new LearningElementViewModel();
    const controller = new LearningElementController(viewModel);
    viewModel.id = 42;

    controller.clicked();

    expect(executeMock).toHaveBeenCalledTimes(1);
    expect(executeMock).toHaveBeenCalledWith({
      learningElementId: 42,
    });
  });
});
