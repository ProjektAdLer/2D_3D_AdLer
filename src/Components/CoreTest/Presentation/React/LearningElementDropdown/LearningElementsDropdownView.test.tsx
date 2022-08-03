import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import LearningElementsDropdown from "../../../../Core/Presentation/React/LearningElementsDropdown/LearningElementsDropdown";
import useViewModelControllerProviderMock from "../CustomHooks/UseViewModelControllerProvider/useViewModelControllerProviderMock";
import LearningElementsDropdownViewModel from "../../../../Core/Presentation/React/LearningElementsDropdown/LearningElementsDropdownViewModel";
import LearningElementsDropdownController from "../../../../Core/Presentation/React/LearningElementsDropdown/LearningElementsDropdownController";
import mock from "jest-mock-extended/lib/Mock";
import ILearningElementsDropdownController from "../../../../Core/Presentation/React/LearningElementsDropdown/ILearningElementsDropdownController";

const modelWithElements = new LearningElementsDropdownViewModel();
modelWithElements.learningElementNames.Value = ["Element 1", "Element 2"];
modelWithElements.learningElements.Value = [
  {
    id: 1,
    name: "Element 1",
    learningElementData: {
      type: "h5p",
    },
  },
  {
    id: 2,
    name: "Element 2",
    learningElementData: {
      type: "text",
    },
  },
];

const mockedController = mock<ILearningElementsDropdownController>();

describe("LearningElementsDrowdownView", () => {
  it("does no render, if no Learning Elements are provided", () => {
    useViewModelControllerProviderMock<
      LearningElementsDropdownViewModel,
      LearningElementsDropdownController
    >([[], []]);
    const elementUnderTest = render(<LearningElementsDropdown />);
    expect(elementUnderTest.container.children).toBeEmptyDOMElement;
  });

  it("renders its Learning Elements", () => {
    useViewModelControllerProviderMock<
      LearningElementsDropdownViewModel,
      LearningElementsDropdownController
    >([[modelWithElements], []]);
    // simulate click on the dropdown button
    const elementUnderTest = render(<LearningElementsDropdown />);
    fireEvent.click(elementUnderTest.getByRole("button"));

    expect(elementUnderTest.getByText("Element 1")).toBeInTheDocument();
    expect(elementUnderTest.getByText("Element 2")).toBeInTheDocument();
  });

  it("should call controller with LearningElement Idd, when element in clicked", () => {
    // Arrnge
    useViewModelControllerProviderMock<
      LearningElementsDropdownViewModel,
      LearningElementsDropdownController
    >([[modelWithElements], [mockedController]]);

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
