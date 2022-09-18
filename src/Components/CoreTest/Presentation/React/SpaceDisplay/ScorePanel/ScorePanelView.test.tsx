import { render } from "@testing-library/react";
import ScorePanel from "../../../../../Core/Presentation/React/SpaceDisplay/ScorePanel/ScorePanel";
import ScorePanelViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/ScorePanel/ScorePanelViewModel";
import "@testing-library/jest-dom";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

let fakeModel = new ScorePanelViewModel();
fakeModel.score.Value = 1337;
describe("Score Panel View", () => {
  it("renders the correct score", () => {
    useBuilderMock([fakeModel, undefined]);
    const { getByText } = render(<ScorePanel />);

    expect(getByText("1337")).toBeInTheDocument();
  });

  it("renders 0, when no score is provided", () => {
    useBuilderMock([undefined, undefined]);
    const { getByText } = render(<ScorePanel />);

    expect(getByText("0")).toBeInTheDocument();
  });
});
