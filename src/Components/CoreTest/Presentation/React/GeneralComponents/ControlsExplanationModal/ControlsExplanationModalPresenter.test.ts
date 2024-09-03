import ControlsExplanationModalPresenter from "../../../../../Core/Presentation/React/GeneralComponents/ControlsExplanationModal/ControlsExplanationModalPresenter";
import ControlsExplanationModalViewModel from "../../../../../Core/Presentation/React/GeneralComponents/ControlsExplanationModal/ControlsExplanationModalViewModel";

describe("ControlsExplanationModalPresenter", () => {
  let systemUnderTest: ControlsExplanationModalPresenter;
  let viewModel: ControlsExplanationModalViewModel;

  beforeEach(() => {
    viewModel = new ControlsExplanationModalViewModel();
    systemUnderTest = new ControlsExplanationModalPresenter(viewModel);
  });

  test("should open the modal", () => {
    systemUnderTest.openModal();

    expect(viewModel.isOpen.Value).toBe(true);
  });
});
