import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import SpaceGoalPanel from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceGoalPanel/SpaceGoalPanel";
import SpaceGoalPanelViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceGoalPanel/SpaceGoalPanelViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

const viewModelMock = new SpaceGoalPanelViewModel();

describe("WorldGoalPanel", () => {
  test("should render", () => {
    viewModelMock.goal.Value = "Test World";
    useBuilderMock([viewModelMock, undefined]);

    const componentUnderTest = render(<SpaceGoalPanel />);

    expect(componentUnderTest.getByText("Lernziel")).toBeInTheDocument();
  });

  test("should not render, if no  World Goal is provided", () => {
    //@ts-ignore
    viewModelMock.goal.Value = undefined;
    useBuilderMock([viewModelMock, undefined]);

    const componentUnderTest = render(<SpaceGoalPanel />);

    expect(componentUnderTest.queryByText("Test World")).toBeNull();
  });

  test("onClick sets isOpen state correctly", () => {
    viewModelMock.goal.Value = "Test World";
    useBuilderMock([viewModelMock, undefined]);

    const componentUnderTest = render(<SpaceGoalPanel key="WorldGoalPanel" />);

    expect(componentUnderTest.getByText("Lernziel")).toBeInTheDocument();
    fireEvent.click(componentUnderTest.getByRole("img"));
    expect(componentUnderTest.queryByText("Lernziel")).not.toBeInTheDocument();
    expect(componentUnderTest.getByText("Test World")).toBeInTheDocument();
    fireEvent.click(componentUnderTest.getByRole("img"));
    expect(
      componentUnderTest.queryByText("Test World")
    ).not.toBeInTheDocument();
    expect(componentUnderTest.getByText("Lernziel")).toBeInTheDocument();
  });
});
