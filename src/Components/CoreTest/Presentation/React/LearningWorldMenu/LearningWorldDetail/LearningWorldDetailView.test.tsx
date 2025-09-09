import { render } from "@testing-library/react";
import React from "react";
import Observable from "../../../../../../Lib/Observable";
import LearningWorldDetail from "../../../../../Core/Presentation/React/LearningWorldMenu/LearningWorldDetail/LearningWorldDetail";
import LearningWorldDetailController from "../../../../../Core/Presentation/React/LearningWorldMenu/LearningWorldDetail/LearningWorldDetailController";
import LearningWorldDetailViewModel from "../../../../../Core/Presentation/React/LearningWorldMenu/LearningWorldDetail/LearningWorldDetailViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import LearningSpaceTO from "../../../../../Core/Application/DataTransferObjects/LearningSpaceTO";

let mockViewModel = new LearningWorldDetailViewModel();
const mockSpaces: Observable<LearningSpaceTO[]> = new Observable([
  { name: "Space1", id: "1", currentScore: 5, requiredScore: 0 },
  { name: "Space2", id: "2", currentScore: 0, requiredScore: 10 },
  { name: "Space3", id: "3", currentScore: 0, requiredScore: 0 },
]) as unknown as Observable<LearningSpaceTO[]>;
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

  //ANF-ID: [EWE0025]
  test("Renders green swoosh on listed Spaces, if they're completed", () => {
    mockViewModel.spaces = new Observable([
      { name: "Space1", id: "1", currentScore: 5, requiredScore: 0 },
    ]) as unknown as Observable<LearningSpaceTO[]>;
    const componentUnderTest = render(<LearningWorldDetail />);

    expect(componentUnderTest.getByTestId("greenSwosh-1")).toBeInTheDocument();
  });
});
