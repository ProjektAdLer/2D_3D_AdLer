import ScorePanelBuilder from "../../../../Core/Presentation/React/ScorePanel/ScorePanelBuilder";
import ScorePanelViewModel from "../../../../Core/Presentation/React/ScorePanel/ScorePanelViewModel";
import ViewModelControllerProvider from "../../../../Core/Presentation/ViewModelProvider/ViewModelControllerProvider";

const registerViewModelOnlyMock = jest.spyOn(
  ViewModelControllerProvider.prototype,
  "registerViewModelOnly"
);

describe("ScorePanelBuilder", () => {
  let scorePanelBuilder: ScorePanelBuilder;

  beforeEach(() => {
    scorePanelBuilder = new ScorePanelBuilder();
  });

  test("buildViewModel builds the viewModel, and registers it with the VMCProvider", () => {
    scorePanelBuilder.buildViewModel();

    expect(scorePanelBuilder["viewModel"]).toBeDefined();
    expect(registerViewModelOnlyMock).toHaveBeenCalledTimes(1);
    expect(registerViewModelOnlyMock).toHaveBeenCalledWith(
      scorePanelBuilder["viewModel"],
      ScorePanelViewModel
    );
  });
});
