import mock from "jest-mock-extended/lib/Mock";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ILearningElementPort from "../../../../Core/Ports/LearningElementPort/ILearningElementPort";
import LearningElementBuilder from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementBuilder";
import LearningElementPresenter from "../../../../Core/Presentation/Babylon/LearningElement/LearningElementPresenter";

const learningElementPortMock = mock<ILearningElementPort>();

describe("LearningElementViewModel", () => {
  let systemUnderTest: LearningElementBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(PORT_TYPES.ILearningElementPort).toConstantValue(
      learningElementPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new LearningElementBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter concludes the build step successfully and registers the presneter with the port", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    // build results
    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest.getPresenter()).toBeDefined();
    expect(systemUnderTest.getPresenter()).toBeInstanceOf(
      LearningElementPresenter
    );

    // call to the learning element port
    expect(
      learningElementPortMock.addLearningElementPresenter
    ).toHaveBeenCalledTimes(1);
    expect(
      learningElementPortMock.addLearningElementPresenter
    ).toHaveBeenCalledWith(systemUnderTest["presenter"]);
  });
});
