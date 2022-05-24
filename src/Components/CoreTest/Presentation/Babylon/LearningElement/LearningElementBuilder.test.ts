import LearningElementBuilder from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementBuilder";
import LearningElementPresenter from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementPresenter";
import LearningElementPort from "../../../../Core/Presentation/Ports/LearningElementPort/LearningElementPort";

const addLearningElementPresenterMock = jest.spyOn(
  LearningElementPort.prototype,
  "addLearningElementPresenter"
);

describe("LearningElementViewModel", () => {
  let builder: LearningElementBuilder;

  beforeEach(() => {
    builder = new LearningElementBuilder();
  });

  test("buildPresenter concludes the build step successfully and registers the presneter with the port", () => {
    builder.buildViewModel();
    builder.buildPresenter();
    expect(builder["presenter"]).toBeDefined();
    expect(builder.getPresenter()).toBeDefined();
    expect(builder.getPresenter()).toBeInstanceOf(LearningElementPresenter);
    expect(addLearningElementPresenterMock).toHaveBeenCalledTimes(1);
  });
});
