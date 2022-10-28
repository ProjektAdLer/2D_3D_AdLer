import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { ElementTypeStrings } from "src/Components/Core/Domain/Types/ElementTypes";
import Observable from "src/Lib/Observable";
import DetailSection from "~ReactComponents/SpaceMenu/DetailSection/DetailSection";
import DetailSectionController from "~ReactComponents/SpaceMenu/DetailSection/DetailSectionController";
import DetailSectionViewModel from "~ReactComponents/SpaceMenu/DetailSection/DetailSectionViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

let mockViewModel = new DetailSectionViewModel();
//world data
const mockSpaces: Observable<[number, string][]> = new Observable(
  [1, "spacesTest1"],
  [2, "spacesTest2"]
);
const mockSpacesCompleted: Observable<[number, string][]> = new Observable(
  [10, "spacesTest1"],
  [20, "spacesTest2"]
);
//space data
const mockName: Observable<string> = new Observable("nameTest");
const mockDescription: Observable<string> = new Observable("descriptionTest");
const mockGoals: Observable<string> = new Observable("GoalsTest");
const mockElements: Observable<[ElementTypeStrings, string][]> = new Observable(
  [
    ["text" as ElementTypeStrings, "elementsTest1"],
    ["image" as ElementTypeStrings, "elementsTest2"],
  ]
);
const mockRequiredPoints: Observable<number> = new Observable(1);
//TODO: Fill this with a value
const mockRequirements: Observable<number[]> = new Observable([]);

describe("DetailSection in Space Menu", () => {
  beforeEach(() => {
    useBuilderMock([mockViewModel, new DetailSectionController()]);
    mockViewModel.name = mockName;
    mockViewModel.description = mockDescription;
    mockViewModel.goals = mockGoals;
    mockViewModel.elements = mockElements;
    mockViewModel.requiredPoints = mockRequiredPoints;
    mockViewModel.requirements = mockRequirements;
    mockViewModel.spaces = mockSpaces;
    mockViewModel.spacesCompleted = mockSpacesCompleted;
  });
  test("should render", () => {
    render(<DetailSection />);
  });
  test("should not render if name is undefined", () => {
    mockViewModel.name = undefined;
    const componentUnderTest = render(<DetailSection />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });
  test("should not render if description is undefined", () => {
    mockViewModel.description = undefined;
    const componentUnderTest = render(<DetailSection />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });
  test("should not render if goals is undefined", () => {
    mockViewModel.goals = undefined;
    const componentUnderTest = render(<DetailSection />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });
  test("should not render if elements is undefined", () => {
    mockViewModel.elements = undefined;
    const componentUnderTest = render(<DetailSection />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });
  test("should not render if requiredPoints is undefined", () => {
    mockViewModel.requiredPoints = undefined;
    const componentUnderTest = render(<DetailSection />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });
  test("should not render if requirements is undefined", () => {
    mockViewModel.requirements = undefined;
    const componentUnderTest = render(<DetailSection />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });
  test("should not render if spaces is undefined", () => {
    mockViewModel.spaces = undefined;
    const componentUnderTest = render(<DetailSection />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });
  test("should not render if spacesCompleted is undefined", () => {
    mockViewModel.spacesCompleted = undefined;
    const componentUnderTest = render(<DetailSection />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });
});
