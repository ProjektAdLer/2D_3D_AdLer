import { render } from "@testing-library/react";
import LearningSpaceScorePanel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceScorePanel/LearningSpaceScorePanel";
import LearningSpaceScorePanelViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceScorePanel/LearningSpaceScorePanelViewModel";
import "@testing-library/jest-dom";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import React from "react";
import ICalculateLearningWorldScoreUseCase from "../../../../../Core/Application/UseCases/CalculateLearningWorldScore/ICalculateLearningWorldScoreUseCase";
import { mock } from "jest-mock-extended";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import LearningSpaceScorePanelController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceScorePanel/LearningSpaceScorePanelController";

let fakeModel = new LearningSpaceScorePanelViewModel();
fakeModel.scoreInfo.Value = {
  currentScore: 1,
  requiredScore: 2,
  maxScore: 3,
};
const fakeController = new LearningSpaceScorePanelController();
const calculateWorldScoreMock = mock<ICalculateLearningWorldScoreUseCase>();

describe("Learning Space Score Panel View", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.ICalculateLearningWorldScoreUseCase
    ).toConstantValue(calculateWorldScoreMock);
  });
  afterAll(() => {
    CoreDIContainer.restore();
  });

  // ANF-ID: [EWE0030]
  it("Learning Space Score Panel View renders the correct score", () => {
    useBuilderMock([fakeModel, fakeController]);
    const comp = render(<LearningSpaceScorePanel />);

    expect(comp.container).toHaveTextContent("1");
    expect(comp.container).toHaveTextContent("2");
  });

  it("returns null when viewModel is not registered", () => {
    useBuilderMock([undefined, undefined]);
    const comp = render(<LearningSpaceScorePanel />);

    expect(comp.container).toBeEmptyDOMElement();
  });
});
