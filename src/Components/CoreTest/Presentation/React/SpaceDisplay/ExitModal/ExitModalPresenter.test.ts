import ExitModalController from "../../../../../Core/Presentation/React/SpaceDisplay/ExitModal/ExitModalController";
import ExitModalPresenter from "../../../../../Core/Presentation/React/SpaceDisplay/ExitModal/ExitModalPresenter";
import ExitModalViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/ExitModal/ExitModalViewModel";

describe("ExitModalPresenter", () => {
  let systemUnderTest: ExitModalPresenter;
  let viewModel: ExitModalViewModel;

  beforeEach(() => {
    systemUnderTest = new ExitModalPresenter(new ExitModalViewModel());
    viewModel = systemUnderTest["viewModel"];
  });

  test("openExitModal sets isOpen to true", () => {
    viewModel.isOpen.Value = false;
    systemUnderTest.openExitModal();
    expect(viewModel.isOpen.Value).toBe(true);
  });
});
