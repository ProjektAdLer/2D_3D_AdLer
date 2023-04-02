import LearningElementModalPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalPresenter";
import LearningElementModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementModal/LearningElementModalViewModel";
import LearningElementTO from "../../../../../Core/Application/DataTransferObjects/LearningElementTO";

describe("LearningElementModalPresenter", () => {
  let systemUnderTest: LearningElementModalPresenter;

  beforeEach(() => {
    systemUnderTest = new LearningElementModalPresenter(
      new LearningElementModalViewModel()
    );
  });

  test("presentLearningElementModal sets the values in its viewModel", () => {
    const elementTO: LearningElementTO = {
      id: 1,
      name: "Test",
      description: "Test",
      goals: ["Test"],
      type: "h5p",
      value: 1,
      parentSpaceID: 0,
      parentWorldID: 0,
      hasScored: false,
    };

    systemUnderTest.onLearningElementLoaded(elementTO);

    expect(systemUnderTest["viewModel"].type.Value).toBe(elementTO.type);
    expect(systemUnderTest["viewModel"].isOpen.Value).toBe(true);
    expect(systemUnderTest["viewModel"].id.Value).toBe(elementTO.id);
  });
});
