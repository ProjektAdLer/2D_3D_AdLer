import { render } from "@testing-library/react";
import ScorePanel from "../../../../Core/Presentation/React/ScorePanel/ScorePanel";
import ScorePanelViewModel from "../../../../Core/Presentation/React/ScorePanel/ScorePanelViewModel";
import useViewModelControllerProviderMock from "../CustomHooks/UseViewModelControllerProvider/useViewModelControllerProviderMock";
import "@testing-library/jest-dom";

let fakeModel = new ScorePanelViewModel();
fakeModel.score.Value = 1337;
describe("Score Panel View", () => {
  it("renders the correct score", () => {
    useViewModelControllerProviderMock<ScorePanelViewModel, undefined>([
      [fakeModel],
      [],
    ]);
    const { getByText } = render(<ScorePanel />);

    expect(getByText("1337")).toBeInTheDocument();
  });

  it("renders 0, when no score is provided", () => {
    useViewModelControllerProviderMock<ScorePanelViewModel, undefined>([
      [],
      [],
    ]);
    const { getByText } = render(<ScorePanel />);

    expect(getByText("0")).toBeInTheDocument();
  });
});
