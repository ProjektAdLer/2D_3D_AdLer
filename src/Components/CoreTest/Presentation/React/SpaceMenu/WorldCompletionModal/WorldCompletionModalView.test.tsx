import WorldCompletionModalViewModel from "../../../../../Core/Presentation/React/SpaceMenu/WorldCompletionModal/WorldCompletionModalViewModel";
import WorldCompletionModalController from "../../../../../Core/Presentation/React/SpaceMenu/WorldCompletionModal/WorldCompletionModalController";
import WorldCompletionModal from "../../../../../Core/Presentation/React/SpaceMenu/WorldCompletionModal/WorldCompletionModal";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import { mock } from "jest-mock-extended";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

const controllerMock = mock<WorldCompletionModalController>();

describe("WorldCompletionModalView", () => {
  test("should render when openend", () => {
    const vm = new WorldCompletionModalViewModel();
    vm.showModal.Value = true;
    useBuilderMock([vm, controllerMock]);

    const container = render(<WorldCompletionModal />);

    expect(
      container.getByText(
        "Du hast alle Lernräume erfolgreich abgeschlossen und somit die Lernwelt bestanden, herzlichen Glückwunsch!"
      )
    ).toBeInTheDocument();
  });

  test("should not render when not openend", () => {
    const vm = new WorldCompletionModalViewModel();
    vm.showModal.Value = false;
    useBuilderMock([vm, undefined]);

    const container = render(<WorldCompletionModal />);

    expect(
      container.queryByText("Du hast alle Lernräume erfolgreich")
    ).not.toBeInTheDocument();
  });

  test("should call controller when clicked", () => {
    const vm = new WorldCompletionModalViewModel();
    vm.showModal.Value = true;
    useBuilderMock([vm, controllerMock]);

    const component = render(<WorldCompletionModal />);
    fireEvent.click(component.getByRole("button"));

    expect(controllerMock.CloseButtonClicked).toHaveBeenCalled();
  });
});
