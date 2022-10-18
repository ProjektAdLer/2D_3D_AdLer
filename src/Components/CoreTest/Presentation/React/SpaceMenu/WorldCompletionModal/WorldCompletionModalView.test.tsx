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
    useBuilderMock([new WorldCompletionModalViewModel(), controllerMock]);
    const { container } = render(<WorldCompletionModal />);
    expect(container).toBeInTheDocument();
  });
  test("should net render when not openend", () => {
    useBuilderMock([new WorldCompletionModalViewModel(), undefined]);
    const { container } = render(<WorldCompletionModal />);
  });

  test("should call controller when clicked", () => {
    useBuilderMock([new WorldCompletionModalViewModel(), controllerMock]);
    const component = render(<WorldCompletionModal />);
    fireEvent.click(component.getByText("X", { exact: false }));
    expect(controllerMock.CloseButtonClicked).toBeCalled();
  });
});
