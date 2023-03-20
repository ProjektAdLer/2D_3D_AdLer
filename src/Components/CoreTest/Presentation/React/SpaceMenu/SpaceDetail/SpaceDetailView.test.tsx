import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { ElementTypeStrings } from "../../../../../Core/Domain/Types/ElementTypes";
import Observable from "../../../../../../Lib/Observable";
import SpaceDetail from "../../../../../Core/Presentation/React/SpaceMenu/SpaceDetail/SpaceDetail";
import SpaceDetailController from "../../../../../Core/Presentation/React/SpaceMenu/SpaceDetail/SpaceDetailController";
import SpaceDetailViewModel, {
  SpaceDetailSpaceData,
} from "../../../../../Core/Presentation/React/SpaceMenu/SpaceDetail/SpaceDetailViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import React from "react";

let mockViewModel = new SpaceDetailViewModel();
//world data
const mockSpaces: Observable<SpaceDetailSpaceData[]> = new Observable([
  { id: 1, name: "spacesTest1", isCompleted: true },
  { id: 2, name: "spacesTest2", isCompleted: false },
]);
//space data
const mockName: Observable<string> = new Observable("nameTest");
const mockDescription: Observable<string> = new Observable("descriptionTest");
const mockGoals: Observable<string[]> = new Observable(["GoalsTest"]);
const mockElements: Observable<[ElementTypeStrings, string][]> = new Observable(
  [
    ["text" as ElementTypeStrings, "elementsTest1"],
    ["image" as ElementTypeStrings, "elementsTest2"],
  ]
);
const mockRequiredPoints: Observable<number> = new Observable(1);
const mockRequirements: Observable<number[]> = new Observable([2]);

describe("SpaceDetail in Space Menu", () => {
  beforeEach(() => {
    useBuilderMock([mockViewModel, new SpaceDetailController(mockViewModel)]);
    mockViewModel.name = mockName;
    mockViewModel.description = mockDescription;
    mockViewModel.goals = mockGoals;
    mockViewModel.elements = mockElements;
    mockViewModel.requiredPoints = mockRequiredPoints;
    mockViewModel.requirements = mockRequirements;
    mockViewModel.spaces = mockSpaces;
  });
  test("should render", () => {
    render(<SpaceDetail />);
  });
  test("should render without requirements if requirement does not match with spaceid.", () => {
    mockViewModel.requirements.Value = [20];
    render(<SpaceDetail />);
  });
  test("should not render if name is undefined", () => {
    mockViewModel.name = undefined;
    const componentUnderTest = render(<SpaceDetail />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });
  test("should not render if description is undefined", () => {
    mockViewModel.description = undefined;
    const componentUnderTest = render(<SpaceDetail />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });
  test("should not render if goals is undefined", () => {
    mockViewModel.goals = undefined;
    const componentUnderTest = render(<SpaceDetail />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });
  test("should not render if elements is undefined", () => {
    mockViewModel.elements = undefined;
    const componentUnderTest = render(<SpaceDetail />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });
  test("should not render if requiredPoints is undefined", () => {
    mockViewModel.requiredPoints = undefined;
    const componentUnderTest = render(<SpaceDetail />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });
  test("should not render if requirements is undefined", () => {
    mockViewModel.requirements = undefined;
    const componentUnderTest = render(<SpaceDetail />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });
  test("should not render if spaces is undefined", () => {
    mockViewModel.spaces = undefined;
    const componentUnderTest = render(<SpaceDetail />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });
});
