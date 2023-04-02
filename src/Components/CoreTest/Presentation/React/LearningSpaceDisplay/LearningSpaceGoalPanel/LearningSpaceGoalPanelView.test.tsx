import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import LearningSpaceGoalPanel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceGoalPanel/LearningSpaceGoalPanel";
import LearningSpaceGoalPanelViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceGoalPanel/LearningSpaceGoalPanelViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

const viewModelMock = new LearningSpaceGoalPanelViewModel();

describe("LearningSpaceGoalPanel", () => {
  test("should render", () => {
    viewModelMock.goals.Value = ["Lernziel"];
    useBuilderMock([viewModelMock, undefined]);

    const componentUnderTest = render(<LearningSpaceGoalPanel />);

    expect(
      componentUnderTest.getByAltText("Learning-Goal-Icon")
    ).toBeInTheDocument();
  });

  test("should not render, if no  World Goal is provided", () => {
    //@ts-ignore
    viewModelMock.goals.Value = undefined;
    useBuilderMock([viewModelMock, undefined]);

    const componentUnderTest = render(<LearningSpaceGoalPanel />);

    expect(componentUnderTest.queryByText("Test World")).toBeNull();
  });

  test("onClick sets isOpen state correctly", () => {
    viewModelMock.goals.Value = ["Test World"];
    useBuilderMock([viewModelMock, undefined]);

    const componentUnderTest = render(
      <LearningSpaceGoalPanel key="WorldGoalPanel" />
    );

    expect(
      componentUnderTest.queryByText("Test World")
    ).not.toBeInTheDocument();
    fireEvent.click(componentUnderTest.getByRole("img"));
    expect(componentUnderTest.getByText("Test World")).toBeInTheDocument();
    fireEvent.click(componentUnderTest.getByRole("img"));
    expect(
      componentUnderTest.queryByText("Test World")
    ).not.toBeInTheDocument();
    expect(
      componentUnderTest.queryByText("Test World")
    ).not.toBeInTheDocument();
  });
});
