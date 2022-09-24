import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ElementsDropdown from "../../../../../Core/Presentation/React/SpaceDisplay/ElementsDropdown/ElementsDropdown";
import ElementsDropdownViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/ElementsDropdown/ElementsDropdownViewModel";
import mock from "jest-mock-extended/lib/Mock";
import IElementsDropdownController from "../../../../../Core/Presentation/React/SpaceDisplay/ElementsDropdown/IElementsDropdownController";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

const modelWithElements = new ElementsDropdownViewModel();
modelWithElements.elementNames.Value = ["Element 1", "Element 2"];
modelWithElements.elements.Value = [
  {
    id: 1,
    parentCourseId: 1,
    name: "Element 1",
    elementData: {
      type: "h5p",
    },
    value: 10,
  },
  {
    id: 2,
    parentCourseId: 1,
    name: "Element 2",
    elementData: {
      type: "text",
    },
    value: 10,
  },
];

const mockedController = mock<IElementsDropdownController>();

describe("ElementsDropdownView", () => {
  test("does not render, if no Elements are provided", () => {
    useBuilderMock([undefined, mockedController]);
    const elementUnderTest = render(<ElementsDropdown />);
    expect(elementUnderTest.container.children).toBeEmptyDOMElement;
  });

  test("does not render, if no controller is provided", () => {
    useBuilderMock([modelWithElements, undefined]);
    const elementUnderTest = render(<ElementsDropdown />);
    expect(elementUnderTest.container.children).toBeEmptyDOMElement;
  });

  test("renders its Elements", () => {
    useBuilderMock([modelWithElements, mockedController]);
    // simulate click on the dropdown button
    const elementUnderTest = render(<ElementsDropdown />);
    fireEvent.click(elementUnderTest.getByRole("button"));

    expect(elementUnderTest.getByText("Element 1")).toBeInTheDocument();
    expect(elementUnderTest.getByText("Element 2")).toBeInTheDocument();
  });

  test("should call controller with Element Id, when element in clicked", () => {
    // Arrnge
    useBuilderMock([modelWithElements, mockedController]);

    // Act
    // simulate click on the dropdown button
    const elementUnderTest = render(<ElementsDropdown />);
    fireEvent.click(elementUnderTest.getByRole("button"));

    fireEvent.click(elementUnderTest.getByText("Element 1"));

    // Assert
    // 1 is the Id of the first element
    expect(mockedController.startElement).toHaveBeenCalledWith(1);
  });
});
