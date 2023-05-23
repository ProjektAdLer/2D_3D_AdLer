import ExitModalController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ExitModal/ExitModalController";
import ExitModalPresenter from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ExitModal/ExitModalPresenter";
import ExitModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ExitModal/ExitModalViewModel";

describe("ExitModalPresenter", () => {
  let systemUnderTest: ExitModalPresenter;
  let viewModel: ExitModalViewModel;

  beforeEach(() => {
    systemUnderTest = new ExitModalPresenter(new ExitModalViewModel());
    viewModel = systemUnderTest["viewModel"];
  });

  test("openExitModal sets isOpen to true", () => {
    viewModel.isOpen.Value = false;
    systemUnderTest.open();
    expect(viewModel.isOpen.Value).toBe(true);
  });

  test("onLearningSpacePrecursorAndSuccessorLoaded sets precursor Spaces and successor Spaces", () => {
    let spaceID = 1;
    let precursorSpaces = [1, 2, 3];
    let successorSpaces = [4, 5, 6];
    systemUnderTest.onLearningSpacePrecursorAndSuccessorLoaded({
      spaceID,
      precursorSpaces,
      successorSpaces,
    });
    expect(viewModel.precursorSpaces.Value).toMatchObject(precursorSpaces);
    expect(viewModel.successorSpaces.Value).toMatchObject(successorSpaces);
  });
});
