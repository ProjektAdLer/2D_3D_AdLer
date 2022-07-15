import LearningElementPort from "../../../../Core/Ports/LearningElementPort/LearningElementPort";
import LearningElementBuilder from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementBuilder";
import LearningElementPresenter from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementPresenter";

const addLearningElementPresenterMock = jest.spyOn(
  LearningElementPort.prototype,
  "addLearningElementPresenter"
);

describe("LearningElementViewModel", () => {
  let systemUnderTest: LearningElementBuilder;

  beforeEach(() => {
    systemUnderTest = new LearningElementBuilder();
  });

  test("buildPresenter concludes the build step successfully and registers the presneter with the port", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();
    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest.getPresenter()).toBeDefined();
    expect(systemUnderTest.getPresenter()).toBeInstanceOf(
      LearningElementPresenter
    );
    expect(addLearningElementPresenterMock).toHaveBeenCalledTimes(1);
  });
});
