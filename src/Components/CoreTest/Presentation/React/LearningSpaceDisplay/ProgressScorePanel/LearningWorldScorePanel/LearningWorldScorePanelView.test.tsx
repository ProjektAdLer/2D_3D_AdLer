import { render, waitFor } from "@testing-library/react";
import LearningWorldScorePanel from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/LearningWorldScorePanel/LearningWorldScorePanel";
import LearningWorldScorePanelViewModel from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/LearningWorldScorePanel/LearningWorldScorePanelViewModel";
import "@testing-library/jest-dom";
import useBuilderMock from "../../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import React from "react";
import ICalculateLearningWorldScoreUseCase from "../../../../../../Core/Application/UseCases/CalculateLearningWorldScore/ICalculateLearningWorldScoreUseCase";
import { mock } from "jest-mock-extended";
import USECASE_TYPES from "../../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import ILearningWorldScorePanelPresenter from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/LearningWorldScorePanel/ILearningWorldScorePanelPresenter";

let mockedViewModel = new LearningWorldScorePanelViewModel();
mockedViewModel.scoreInfo.Value = {
  currentScore: 4,
  requiredScore: 5,
  maxScore: 6,
};
const calculateWorldScoreMock = mock<ICalculateLearningWorldScoreUseCase>();

describe("Learning World Score Panel View", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.ICalculateLearningWorldScoreUseCase,
    ).toConstantValue(calculateWorldScoreMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  // ANF-ID: [EWE0027]
  test("renders the correct score", () => {
    useBuilderMock([mockedViewModel, undefined]);
    let comp = render(<LearningWorldScorePanel />);

    expect(comp.container).toHaveTextContent("80%");
  });

  test("returns null when viewModel is not registered", () => {
    useBuilderMock([undefined, undefined]);
    const comp = render(<LearningWorldScorePanel />);

    expect(comp.container).toBeEmptyDOMElement();
  });

  // ANF-ID: [EWE0027]
  test("updates the displayed score when the current score in the viewmodel changes", async () => {
    useBuilderMock([mockedViewModel, mock<ILearningWorldScorePanelPresenter>]);
    const comp = render(<LearningWorldScorePanel />);

    expect(comp.container).toHaveTextContent("80%");

    mockedViewModel.scoreInfo.Value = {
      currentScore: 5,
      requiredScore: 5,
      maxScore: 6,
    };

    await waitFor(() => expect(comp.container).toHaveTextContent("100%"));
  });
});
