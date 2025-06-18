import { render, waitFor } from "@testing-library/react";
import LearningSpaceScorePanel from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/LearningSpaceScorePanel/LearningSpaceScorePanel";
import LearningSpaceScorePanelViewModel from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/LearningSpaceScorePanel/LearningSpaceScorePanelViewModel";
import "@testing-library/jest-dom";
import useBuilderMock from "../../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import React from "react";
import ICalculateLearningWorldScoreUseCase from "../../../../../../Core/Application/UseCases/CalculateLearningWorldScore/ICalculateLearningWorldScoreUseCase";
import { mock } from "jest-mock-extended";
import USECASE_TYPES from "../../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import CoreDIContainer from "../../../../../../Core/DependencyInjection/CoreDIContainer";
import ILearningSpaceScorePanelController from "../../../../../../Core/Presentation/React/LearningSpaceDisplay/ProgressScorePanel/LearningSpaceScorePanel/ILearningSpaceScorePanelController";
import { GradingStyle } from "../../../../../../Core/Domain/Types/GradingStyle";

let mockedViewModel = new LearningSpaceScorePanelViewModel();
mockedViewModel.scoreInfo.Value = {
  currentScore: 0,
  requiredScore: 42,
  maxScore: 300,
};
const mockedController = mock<ILearningSpaceScorePanelController>();
const calculateWorldScoreMock = mock<ICalculateLearningWorldScoreUseCase>();

describe("Learning Space Score Panel View", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.ICalculateLearningWorldScoreUseCase,
    ).toConstantValue(calculateWorldScoreMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  // ANF-ID: [EWE0030]
  test("renders the current score and the required score", () => {
    useBuilderMock([mockedViewModel, mockedController]);
    const comp = render(
      <LearningSpaceScorePanel gradingStyle={GradingStyle.point} />,
    );

    expect(comp.container).toHaveTextContent("0 von 42");
  });

  test("returns null when viewModel is not registered", () => {
    useBuilderMock([undefined, undefined]);
    const comp = render(
      <LearningSpaceScorePanel gradingStyle={GradingStyle.point} />,
    );

    expect(comp.container).toBeEmptyDOMElement();
  });

  // ANF-ID: [EWE0030]
  test("updates the current score when the value in the viewmodel changes", async () => {
    useBuilderMock([mockedViewModel, mockedController]);
    const comp = render(
      <LearningSpaceScorePanel gradingStyle={GradingStyle.point} />,
    );

    expect(comp.container).toHaveTextContent("0 von 42");

    mockedViewModel.scoreInfo.Value = {
      currentScore: 1,
      requiredScore: 42,
      maxScore: 3000,
    };

    await waitFor(() => expect(comp.container).toHaveTextContent("1 von 42"));
  });
});
