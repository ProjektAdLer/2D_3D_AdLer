import { render } from "@testing-library/react";
import ScorePanel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ScorePanel/ScorePanel";
import ScorePanelViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ScorePanel/ScorePanelViewModel";
import "@testing-library/jest-dom";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import React from "react";
import ICalculateLearningWorldScoreUseCase from "../../../../../Core/Application/UseCases/CalculateLearningWorldScore/ICalculateLearningWorldScoreUseCase";
import { mock } from "jest-mock-extended";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";

let fakeModel = new ScorePanelViewModel();
fakeModel.spaceScore.Value = 1;
fakeModel.spaceRequiredScore.Value = 2;
fakeModel.spaceMaxScore.Value = 3;
fakeModel.worldScore.Value = 4;
fakeModel.worldRequiredScore.Value = 5;
fakeModel.worldMaxScore.Value = 6;
const calculateWorldScoreMock = mock<ICalculateLearningWorldScoreUseCase>();

describe("Score Panel View", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.ICalculateLearningWorldScoreUseCase
    ).toConstantValue(calculateWorldScoreMock);
  });
  afterAll(() => {
    CoreDIContainer.restore();
  });

  it("Score Panel View in space config renders the correct score", () => {
    useBuilderMock([fakeModel, undefined]);
    const comp = render(<ScorePanel scoreType="space" />);

    expect(comp.container).toHaveTextContent("1");
    expect(comp.container).toHaveTextContent("2");
  });

  it("Score Panel View in world config renders the correct score", () => {
    useBuilderMock([fakeModel, undefined]);
    const comp = render(<ScorePanel scoreType="world" />);

    expect(comp.container).toHaveTextContent("80%");
  });

  it("returns null when viewModel is not registered", () => {
    useBuilderMock([undefined, undefined]);
    const comp = render(<ScorePanel scoreType="space" />);

    expect(comp.container).toBeEmptyDOMElement();
  });
});
