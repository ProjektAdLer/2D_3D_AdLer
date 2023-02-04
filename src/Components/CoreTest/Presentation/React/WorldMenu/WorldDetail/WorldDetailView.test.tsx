import { render } from "@testing-library/react";
import React from "react";
import Observable from "../../../../../../Lib/Observable";
import WorldDetail from "../../../../../Core/Presentation/React/WorldMenu/WorldDetail/WorldDetail";
import WorldDetailController from "../../../../../Core/Presentation/React/WorldMenu/WorldDetail/WorldDetailController";
import WorldDetailViewModel from "../../../../../Core/Presentation/React/WorldMenu/WorldDetail/WorldDetailViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

let mockViewModel = new WorldDetailViewModel();
const mockSpaceCount: Observable<number> = new Observable(42);
const mockName: Observable<string> = new Observable("nameTest");
const mockDescription: Observable<string> = new Observable("descriptionTest");
const mockGoals: Observable<string> = new Observable("GoalsTest");

describe("WorldDetail in World Menu", () => {
  beforeEach(() => {
    useBuilderMock([mockViewModel, new WorldDetailController(mockViewModel)]);
    mockViewModel.name = mockName;
    mockViewModel.description = mockDescription;
    mockViewModel.goals = mockGoals;
    mockViewModel.spaceCount = mockSpaceCount;
  });
  test("should render", () => {
    render(<WorldDetail />);
  });
  test("should not render if name is undefined", () => {
    mockViewModel.name = undefined;
    const componentUnderTest = render(<WorldDetail />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });
  test("should not render if description is undefined", () => {
    mockViewModel.description = undefined;
    const componentUnderTest = render(<WorldDetail />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });
  test("should not render if goals is undefined", () => {
    mockViewModel.goals = undefined;
    const componentUnderTest = render(<WorldDetail />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });
});
