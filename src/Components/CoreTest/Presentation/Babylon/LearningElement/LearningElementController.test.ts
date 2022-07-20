import LearningElementStartedUseCase from "../../../../Core/Application/LearningElementStarted/LearningElementStartedUseCase";
import LearningElementController from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementController";
import LearningElementViewModel from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementViewModel";

const executeMock = jest.spyOn(
  LearningElementStartedUseCase.prototype,
  "execute"
);

describe("LearningElementController", () => {
  const viewModel = new LearningElementViewModel();
  const systemUnderTest = new LearningElementController(viewModel);
  test("clicked calls useCase", () => {
    viewModel.id = 42;

    systemUnderTest.clicked();

    expect(executeMock).toHaveBeenCalledTimes(1);
    expect(executeMock).toHaveBeenCalledWith({
      learningElementId: 42,
    });
  });
});
