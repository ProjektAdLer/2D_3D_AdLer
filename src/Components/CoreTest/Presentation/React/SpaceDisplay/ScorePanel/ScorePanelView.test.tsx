import { render } from "@testing-library/react";
import ScorePanel from "../../../../../Core/Presentation/React/SpaceDisplay/ScorePanel/ScorePanel";
import ScorePanelViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/ScorePanel/ScorePanelViewModel";
import "@testing-library/jest-dom";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import React from "react";

let fakeModel = new ScorePanelViewModel();
fakeModel.score.Value = 1;
fakeModel.requiredScore.Value = 2;
fakeModel.maxScore.Value = 3;

describe("Score Panel View", () => {
  it("renders the correct score", () => {
    useBuilderMock([fakeModel, undefined]);
    const comp = render(<ScorePanel />);

    expect(comp.container).toHaveTextContent("1");
    expect(comp.container).toHaveTextContent("2");
    //expect(comp.container).toHaveTextContent("3");
  });

  it("renders 0, when no score is provided", () => {
    useBuilderMock([undefined, undefined]);
    const comp = render(<ScorePanel />);

    expect(comp.container).toHaveTextContent("0 / 0");
  });
});
