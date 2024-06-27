import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import LearningSpaceGoalPanel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceGoalPanel/LearningSpaceGoalPanel";
import LearningSpaceGoalPanelViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceGoalPanel/LearningSpaceGoalPanelViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import LearningSpaceGoalPanelController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceGoalPanel/LearningSpaceGoalPanelController";

const viewModelMock = new LearningSpaceGoalPanelViewModel();
const controllerMock = new LearningSpaceGoalPanelController(viewModelMock);

describe("LearningSpaceGoalPanel", () => {
  test("should not render, if isOpen is false", () => {
    viewModelMock.goals.Value = ["Lernziel"];
    viewModelMock.isOpen.Value = false;
    useBuilderMock([viewModelMock, undefined]);

    const componentUnderTest = render(<LearningSpaceGoalPanel />);

    expect(componentUnderTest.queryByText("Test World")).toBeNull();
  });

  test("onclose should set isOpen to false", () => {
    viewModelMock.goals.Value = ["Lernziel"];
    viewModelMock.isOpen.Value = true;
    useBuilderMock([viewModelMock, controllerMock]);

    const componentUnderTest = render(<LearningSpaceGoalPanel />);

    fireEvent.click(componentUnderTest.getByRole("button"));
    expect(viewModelMock.isOpen.Value).toBe(false);
  });

  test("should render single learning space goal", () => {
    viewModelMock.goals.Value = ["Learning goal 1"];
    viewModelMock.isOpen.Value = true;
    useBuilderMock([viewModelMock, controllerMock]);
    const componentUnderTest = render(<LearningSpaceGoalPanel />);

    expect(componentUnderTest.queryByText("Learning goal 1")).not.toBeNull();
  });

  test("should render multiple learning space goals", () => {
    viewModelMock.goals.Value = [
      "Learning goal 1",
      "Learning goal 2",
      "Learning goal 3",
    ];
    viewModelMock.isOpen.Value = true;
    useBuilderMock([viewModelMock, controllerMock]);
    const componentUnderTest = render(<LearningSpaceGoalPanel />);

    expect(componentUnderTest.queryByText("Learning goal 1")).not.toBeNull();
    expect(componentUnderTest.queryByText("Learning goal 2")).not.toBeNull();
    expect(componentUnderTest.queryByText("Learning goal 3")).not.toBeNull();
  });
});
