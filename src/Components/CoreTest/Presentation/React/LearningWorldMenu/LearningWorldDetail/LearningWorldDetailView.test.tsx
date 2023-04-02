import { render } from "@testing-library/react";
import React from "react";
import Observable from "../../../../../../Lib/Observable";
import LearningWorldDetail from "../../../../../Core/Presentation/React/LearningWorldMenu/LearningWorldDetail/LearningWorldDetail";
import LearningWorldDetailController from "../../../../../Core/Presentation/React/LearningWorldMenu/LearningWorldDetail/LearningWorldDetailController";
import LearningWorldDetailViewModel, {
  LearningWorldDetailLearningSpaceData,
} from "../../../../../Core/Presentation/React/LearningWorldMenu/LearningWorldDetail/LearningWorldDetailViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

let mockViewModel = new LearningWorldDetailViewModel();
const mockSpaces: Observable<LearningWorldDetailLearningSpaceData[]> =
  new Observable([
    { name: "Space1", id: "1", isCompleted: true },
    { name: "Space2", id: "2", isCompleted: false },
    { name: "Space3", id: "3", isCompleted: false },
  ]);
const mockName: Observable<string> = new Observable("nameTest");
const mockDescription: Observable<string> = new Observable("descriptionTest");
const mockGoals: Observable<string[]> = new Observable(["GoalsTest"]);

describe("LearningWorldDetail in World Menu", () => {
  beforeEach(() => {
    useBuilderMock([
      mockViewModel,
      new LearningWorldDetailController(mockViewModel),
    ]);
    mockViewModel.name = mockName;
    mockViewModel.description = mockDescription;
    mockViewModel.goals = mockGoals;
    mockViewModel.spaces = mockSpaces;
  });
  test("should render", () => {
    render(<LearningWorldDetail />);
  });
  test("should not render if name is undefined", () => {
    mockViewModel.name = undefined;
    const componentUnderTest = render(<LearningWorldDetail />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });
});
