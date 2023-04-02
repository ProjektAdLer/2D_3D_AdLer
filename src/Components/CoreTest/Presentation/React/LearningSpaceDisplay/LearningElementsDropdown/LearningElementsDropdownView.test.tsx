import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import LearningElementsDropdown from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementsDropdown/LearningElementsDropdown";
import LearningElementsDropdownViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementsDropdown/LearningElementsDropdownViewModel";
import mock from "jest-mock-extended/lib/Mock";
import ILearningElementsDropdownController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementsDropdown/ILearningElementsDropdownController";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import React from "react";

const modelWithElements = new LearningElementsDropdownViewModel();
modelWithElements.elementNames.Value = ["Element 1", "Element 2"];
modelWithElements.elements.Value = [
  {
    id: 1,
    name: "Element 1",
    type: "h5p",
    goals: "goals",
    description: "description",
    value: 10,
    parentSpaceID: 1,
  },
  {
    id: 2,
    name: "Element 2",
    type: "text",
    description: "This is a text element",
    goals: "goals",
    value: 10,
    parentSpaceID: 1,
  },
];

const mockedController = mock<ILearningElementsDropdownController>();

describe("LearningElementsDropdownView", () => {
  test("does not render, if no Elements are provided", () => {
    useBuilderMock([undefined, mockedController]);
    const elementUnderTest = render(<LearningElementsDropdown />);
    expect(elementUnderTest.container.children).toBeEmptyDOMElement;
  });

  test("does not render, if no controller is provided", () => {
    useBuilderMock([modelWithElements, undefined]);
    const elementUnderTest = render(<LearningElementsDropdown />);
    expect(elementUnderTest.container.children).toBeEmptyDOMElement;
  });

  test("renders its Elements", () => {
    useBuilderMock([modelWithElements, mockedController]);
    // simulate click on the dropdown button
    const elementUnderTest = render(<LearningElementsDropdown />);
    fireEvent.click(elementUnderTest.getByRole("button"));

    expect(elementUnderTest.getByText("Element 1")).toBeInTheDocument();
    expect(elementUnderTest.getByText("Element 2")).toBeInTheDocument();
  });

  test("should call controller with Element Id, when element in clicked", () => {
    // Arrnge
    useBuilderMock([modelWithElements, mockedController]);

    // Act
    // simulate click on the dropdown button
    const elementUnderTest = render(<LearningElementsDropdown />);
    fireEvent.click(elementUnderTest.getByRole("button"));

    fireEvent.click(elementUnderTest.getByText("Element 1"));

    // Assert
    // 1 is the Id of the first element
    expect(mockedController.startLearningElement).toHaveBeenCalledWith(1);
  });
});
