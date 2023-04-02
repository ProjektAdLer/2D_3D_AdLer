import mock from "jest-mock-extended/lib/Mock";
import ILearningWorldPort from "../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import LearningElementBuilder from "../../../../Core/Presentation/Babylon/LearningElements/LearningElementBuilder";
import LearningElementPresenter from "../../../../Core/Presentation/Babylon/LearningElements/LearningElementPresenter";

const worldPortMock = mock<ILearningWorldPort>();

describe("LearningElementBuilder", () => {
  let systemUnderTest: LearningElementBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new LearningElementBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildPresenter concludes the build step successfully and registers the presenter with the port", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    // build results
    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest.getPresenter()).toBeDefined();
    expect(systemUnderTest.getPresenter()).toBeInstanceOf(
      LearningElementPresenter
    );

    // call to the element port
    expect(worldPortMock.registerAdapter).toHaveBeenCalledTimes(1);
    expect(worldPortMock.registerAdapter).toHaveBeenCalledWith(
      systemUnderTest["presenter"]
    );
  });
});
