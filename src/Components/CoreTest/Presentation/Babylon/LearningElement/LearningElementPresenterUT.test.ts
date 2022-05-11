import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import ILearningElementPresenter from "../../../../Core/Presentation/Babylon/LearningElement/ILearningElementPresenter";

jest.mock("@babylonjs/core");

describe("LearningElementPresenter", () => {
  let learningElementPresenter: ILearningElementPresenter;

  beforeEach(() => {
    learningElementPresenter = CoreDIContainer.get<ILearningElementPresenter>(
      CORE_TYPES.ILearingElementPresenter
    );
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test.todo("loadMeshAsync");

  test.todo("test registerAction");
});
