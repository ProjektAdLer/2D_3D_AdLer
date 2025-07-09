import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import { LearningElementTypeStrings } from "../../../../../Core/Domain/Types/LearningElementTypes";
import Observable from "../../../../../../Lib/Observable";
import LearningSpaceDetail from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceDetail/LearningSpaceDetail";
import LearningSpaceDetailController from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceDetail/LearningSpaceDetailController";
import LearningSpaceDetailViewModel from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceDetail/LearningSpaceDetailViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import React from "react";
import PointBasedDisplay from "../../../../../Core/Presentation/Utils/ElementCompletionDisplay/PointBasedDisplay";

let mockViewModel = new LearningSpaceDetailViewModel();
const mockName: Observable<string> = new Observable("nameTest");
const mockDescription: Observable<string> = new Observable("descriptionTest");
const mockGoals: Observable<string[]> = new Observable(["GoalsTest"]);
const mockElements: Observable<
  [LearningElementTypeStrings, string, boolean][]
> = new Observable([
  ["text" as LearningElementTypeStrings, "elementsTest1", false],
  ["image" as LearningElementTypeStrings, "elementsTest2", true],
]);
const mockRequiredPoints: Observable<number> = new Observable(1);
const mockCurrentXP: Observable<number> = new Observable(0);
const mockMaxXP: Observable<number> = new Observable(1);
const mockAccumulatedEstimatedTime: Observable<number> = new Observable(30);

describe("LearningSpaceDetail in Space Menu", () => {
  beforeEach(() => {
    useBuilderMock([
      mockViewModel,
      new LearningSpaceDetailController(mockViewModel),
    ]);
    mockViewModel.name = mockName;
    mockViewModel.description = mockDescription;
    mockViewModel.goals = mockGoals;
    mockViewModel.elements = mockElements;
    mockViewModel.requiredPoints = mockRequiredPoints;
    mockViewModel.completionDisplay = new PointBasedDisplay();
    mockViewModel.currentXP = mockCurrentXP;
    mockViewModel.maxXP = mockMaxXP;
    mockViewModel.accumulatedEstimatedTime = mockAccumulatedEstimatedTime;
    mockViewModel.isAvailable = new Observable(true);
  });

  test("should render", () => {
    render(<LearningSpaceDetail />);
  });

  test("should not render if name is undefined", () => {
    mockViewModel.name = undefined;
    const componentUnderTest = render(<LearningSpaceDetail />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });

  test("should not render if description is undefined", () => {
    mockViewModel.description = undefined;
    const componentUnderTest = render(<LearningSpaceDetail />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });

  test("should not render if goals is undefined", () => {
    mockViewModel.goals = undefined;
    const componentUnderTest = render(<LearningSpaceDetail />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });

  test("should not render if elements is undefined", () => {
    mockViewModel.elements = undefined;
    const componentUnderTest = render(<LearningSpaceDetail />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });

  test("should not render if requiredPoints is undefined", () => {
    mockViewModel.requiredPoints = undefined;
    const componentUnderTest = render(<LearningSpaceDetail />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });

  // ANF-ID: [EWE0034]
  test("displays successfully scored learning elements with check-icon", () => {
    let mockData = new Observable([
      ["text" as LearningElementTypeStrings, "elementsTest1", false],
      ["image" as LearningElementTypeStrings, "elementsTest2", false],
    ]);
    mockViewModel.elements = mockData;
    let componentUnderTest = render(<LearningSpaceDetail />);
    waitFor(() => {
      expect(
        componentUnderTest.getByTestId("checkMark"),
      ).not.toBeInTheDocument();
    });

    mockData.Value[0][2] = true;
    componentUnderTest = render(<LearningSpaceDetail />);
    waitFor(() => {
      expect(componentUnderTest.getByTestId("checkMark")).toBeInTheDocument();
    });
  });
});
