import ScorePanelBuilder from "../../../../Core/Presentation/React/ScorePanel/ScorePanelBuilder";
import ScorePanelViewModel from "../../../../Core/Presentation/React/ScorePanel/ScorePanelViewModel";
import ViewModelControllerProvider from "../../../../Core/Presentation/ViewModelProvider/ViewModelControllerProvider";

const registerViewModelOnlyMock = jest.spyOn(
  ViewModelControllerProvider.prototype,
  "registerViewModelOnly"
);

describe("ScorePanelBuilder", () => {
  let systemUnderTest: ScorePanelBuilder;

  beforeEach(() => {
    systemUnderTest = new ScorePanelBuilder();
  });

  test("buildViewModel builds the viewModel, and registers it with the VMCProvider", () => {
    systemUnderTest.buildViewModel();

    expect(systemUnderTest["viewModel"]).toBeDefined();
    expect(registerViewModelOnlyMock).toHaveBeenCalledTimes(1);
    expect(registerViewModelOnlyMock).toHaveBeenCalledWith(
      systemUnderTest["viewModel"],
      ScorePanelViewModel
    );
  });
});
