import LearningWorldCompletionModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModalViewModel";
import LearningWorldCompletionModalController from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModalController";
import LearningWorldCompletionModal from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModal";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import { mock } from "jest-mock-extended";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

const controllerMock = mock<LearningWorldCompletionModalController>();

describe("LearningWorldCompletionModalView", () => {
  //ANF-ID: [EWE0028]
  test("should render when openend", () => {
    const vm = new LearningWorldCompletionModalViewModel();
    vm.showModal.Value = true;
    useBuilderMock([vm, controllerMock]);

    const container = render(<LearningWorldCompletionModal />);

    expect(container.getByText("learningWorldCompleted")).toBeInTheDocument();
  });

  test("should not render when not openend", () => {
    const vm = new LearningWorldCompletionModalViewModel();
    vm.showModal.Value = false;
    useBuilderMock([vm, undefined]);

    const container = render(<LearningWorldCompletionModal />);

    expect(
      container.queryByText("Du hast alle Lernräume erfolgreich"),
    ).not.toBeInTheDocument();
  });

  //ANF-ID: [EWE0028]
  test("should call controller when clicked", () => {
    const vm = new LearningWorldCompletionModalViewModel();
    vm.showModal.Value = true;
    useBuilderMock([vm, controllerMock]);

    const component = render(<LearningWorldCompletionModal />);
    fireEvent.click(component.getByRole("button"));

    expect(controllerMock.CloseButtonClicked).toHaveBeenCalled();
  });
});
