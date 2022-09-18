import LearningElementModalPresenter from "../../../../../../../src/Components/Core/Presentation/React/LearningRoomDisplay/LearningElementModal/LearningElementModalPresenter";
import { LearningElementTO } from "../../../../../Core/Ports/LearningWorldPort/ILearningWorldPort";
import LearningElementModalViewModel from "../../../../../Core/Presentation/React/LearningRoomDisplay/LearningElementModal/LearningElementModalViewModel";

describe("LearningElementModalPresenter", () => {
  let systemUnderTest: LearningElementModalPresenter;

  beforeEach(() => {
    systemUnderTest = new LearningElementModalPresenter(
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

    systemUnderTest.presentLearningElementModal(learningElementTO);

    expect(systemUnderTest["viewModel"].learningElementData.Value.type).toBe(
      learningElementTO.learningElementData.type
    );
    expect(systemUnderTest["viewModel"].isOpen.Value).toBe(true);
    expect(systemUnderTest["viewModel"].id.Value).toBe(learningElementTO.id);
  });
});
