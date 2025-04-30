import ProgressScorePanelViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/ProgessScorePanelViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import ProgressScorePanel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/ProgessScorePanel";
import { render } from "@testing-library/react";
import React from "react";
import { GradingStyle } from "../../../../../Core/Domain/Types/GradingStyle";

describe("ProgressScorePanel", () => {
  let viewModel = new ProgressScorePanelViewModel();

  test("returns null when viewModel is not registered", () => {
    useBuilderMock([undefined, undefined]);
    const systemUnderTest = render(<ProgressScorePanel />);

    expect(systemUnderTest.container).toBeEmptyDOMElement();
  });

  test("returns null when display strategy is not defined", () => {
    useBuilderMock([viewModel, undefined]);
    const systemUnderTest = render(<ProgressScorePanel />);

    expect(systemUnderTest.container).toBeEmptyDOMElement();
  });

  test("renders point-based progress score", () => {
    viewModel.gradingStyle = GradingStyle.point;
    useBuilderMock([viewModel, undefined]);

    const systemUnderTest = render(<ProgressScorePanel />);
    expect(systemUnderTest.container).not.toBeEmptyDOMElement();
  });
});
