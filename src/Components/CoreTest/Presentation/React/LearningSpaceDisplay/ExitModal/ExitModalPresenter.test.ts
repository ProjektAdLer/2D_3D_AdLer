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
});