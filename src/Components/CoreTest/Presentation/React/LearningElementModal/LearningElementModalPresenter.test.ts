import LearningElementModalPresenter from "../../../../../../src/Components/Core/Presentation/React/LearningElementModal/LearningElementModalPresenter";
import { LearningElementTO } from "../../../../Core/Ports/LearningWorldPort/ILearningWorldPort";
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
      name: "Test",
      learningElementData: {
        type: "h5p",
      },
    };

    learningElementModalPresenter.presentLearningElementModal(
      learningElementTO
    );

    expect(
      learningElementModalPresenter["viewModel"].learningElementData.Value.type
    ).toBe(learningElementTO.learningElementData.type);
    expect(learningElementModalPresenter["viewModel"].isOpen.Value).toBe(true);
    expect(learningElementModalPresenter["viewModel"].id.Value).toBe(
      learningElementTO.id
    );
  });
});
