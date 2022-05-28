import LearningElementModalPresenter from "../../../../../../src/Components/Core/Presentation/React/LearningElementModal/LearningElementModalPresenter";
import { LearningElementTO } from "../../../../Core/Application/LoadWorld/ILearningWorldPort";
import LearningElementModalViewModel from "../../../../Core/Presentation/React/LearningElementModal/LearningElementModalViewModel";

describe("LearningElementModalPresenter", () => {
  let learningElementModalPresenter: LearningElementModalPresenter;

  beforeEach(() => {
    learningElementModalPresenter = new LearningElementModalPresenter(
      new LearningElementModalViewModel()
    );
  });

  test("presentLearningElementModal sets the values in its viewModel", () => {
    const learningElementTO: LearningElementTO = {
      id: 1,
      type: "h5p",
    };

    learningElementModalPresenter.presentLearningElementModal(
      learningElementTO
    );

    expect(learningElementModalPresenter["viewModel"].type.Value).toBe(
      learningElementTO.type
    );
    expect(learningElementModalPresenter["viewModel"].isOpen.Value).toBe(true);
    expect(learningElementModalPresenter["viewModel"].id.Value).toBe(
      learningElementTO.id
    );
  });
});
