import { render } from "@testing-library/react";
import LearningWorldScorePanel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningWorldScorePanel/LearningWorldScorePanel";
import LearningWorldScorePanelViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningWorldScorePanel/LearningWorldScorePanelViewModel";
import "@testing-library/jest-dom";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import React from "react";
import ICalculateLearningWorldScoreUseCase from "../../../../../Core/Application/UseCases/CalculateLearningWorldScore/ICalculateLearningWorldScoreUseCase";
import { mock } from "jest-mock-extended";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";

let fakeModel = new LearningWorldScorePanelViewModel();
fakeModel.worldScore.Value = 4;
fakeModel.worldRequiredScore.Value = 5;
fakeModel.worldMaxScore.Value = 6;
const calculateWorldScoreMock = mock<ICalculateLearningWorldScoreUseCase>();

describe("Learning World Score Panel View", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.ICalculateLearningWorldScoreUseCase
    ).toConstantValue(calculateWorldScoreMock);
  });
  afterAll(() => {
    CoreDIContainer.restore();
  });

  it("Learning World Score Panel View renders the correct score", () => {
    useBuilderMock([fakeModel, undefined]);
    const comp = render(<LearningWorldScorePanel />);

    expect(comp.container).toHaveTextContent("80%");
  });

  it("returns null when viewModel is not registered", () => {
    useBuilderMock([undefined, undefined]);
    const comp = render(<LearningWorldScorePanel />);

    expect(comp.container).toBeEmptyDOMElement();
  });
});
