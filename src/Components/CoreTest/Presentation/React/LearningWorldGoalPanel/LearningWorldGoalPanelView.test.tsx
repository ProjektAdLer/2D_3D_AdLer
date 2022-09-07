import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import LearningWorldGoalPanel from "../../../../Core/Presentation/React/LearningWorldGoalPanel/LearningWorldGoalPanel";
import LearningWorldGoalPanelViewModel from "../../../../Core/Presentation/React/LearningWorldGoalPanel/LearningWorldGoalPanelViewModel";
import useBuilderMock from "../CustomHooks/useBuilder/useBuilderMock";

const viewModelMock = new LearningWorldGoalPanelViewModel();

describe("LearningWorldGoalPanel", () => {
  test("should render", () => {
    viewModelMock.worldGoal.Value = "Test World";
    useBuilderMock([viewModelMock, undefined]);

    const componentUnderTest = render(<LearningWorldGoalPanel />);

    expect(componentUnderTest.getByText("Test World")).toBeInTheDocument();
  });

  test("should not render, if no Learning World Goal is provided", () => {
    //@ts-ignore
    viewModelMock.worldGoal.Value = undefined;
    useBuilderMock([viewModelMock, undefined]);

    const componentUnderTest = render(<LearningWorldGoalPanel />);

    expect(componentUnderTest.queryByText("Test World")).toBeNull();
  });

  test("onClick sets isOpen state correctly", () => {
    viewModelMock.worldGoal.Value = "Test World";
    useBuilderMock([viewModelMock, undefined]);

    const componentUnderTest = render(
      <LearningWorldGoalPanel key="LearningWorldGoalPanel" />
    );

    expect(componentUnderTest.getByText("Test World")).toBeInTheDocument();
    fireEvent.click(componentUnderTest.getByRole("img"));
    expect(
      componentUnderTest.queryByText("Test World")
    ).not.toBeInTheDocument();
    expect(componentUnderTest.getByText("Lernziel")).toBeInTheDocument();
    fireEvent.click(componentUnderTest.getByRole("img"));
    expect(componentUnderTest.queryByText("Lernziel")).not.toBeInTheDocument();
    expect(componentUnderTest.getByText("Test World")).toBeInTheDocument();
  });
});
