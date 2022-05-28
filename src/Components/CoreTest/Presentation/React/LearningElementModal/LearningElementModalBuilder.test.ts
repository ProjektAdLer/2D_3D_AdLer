import LearningElementModalBuilder from "../../../../Core/Presentation/React/LearningElementModal/LearningElementModalBuilder";
import LearningElementModalViewModel from "../../../../Core/Presentation/React/LearningElementModal/LearningElementModalViewModel";
import ViewModelControllerProvider from "../../../../Core/Presentation/ViewModelProvider/ViewModelControllerProvider";

const registerTupelMock = jest.spyOn(
  ViewModelControllerProvider.prototype,
  "registerTupel"
);

describe("LearningElementModalBuilder", () => {
  let learningElementModalBuilder: LearningElementModalBuilder;

  beforeEach(() => {
    learningElementModalBuilder = new LearningElementModalBuilder();
  });

  test("buildController builds the controller and registers the viewModel and controller", () => {
    learningElementModalBuilder.buildViewModel();
    learningElementModalBuilder.buildController();

    expect(learningElementModalBuilder["viewModel"]).toBeDefined();
    expect(learningElementModalBuilder["controller"]).toBeDefined();
    expect(registerTupelMock).toHaveBeenCalledTimes(1);
    expect(registerTupelMock).toHaveBeenCalledWith(
      learningElementModalBuilder["viewModel"],
      learningElementModalBuilder["controller"],
      LearningElementModalViewModel
    );
  });
});
