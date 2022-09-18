import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import WorldGoalPanel from "../../../../../Core/Presentation/React/SpaceDisplay/WorldGoalPanel/WorldGoalPanel";
import WorldGoalPanelViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/WorldGoalPanel/WorldGoalPanelViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

const viewModelMock = new WorldGoalPanelViewModel();

describe("WorldGoalPanel", () => {
  test("should render", () => {
    viewModelMock.worldGoal.Value = "Test World";
    useBuilderMock([viewModelMock, undefined]);

    const componentUnderTest = render(<WorldGoalPanel />);

    expect(componentUnderTest.getByText("Lernziel")).toBeInTheDocument();
  });

  test("should not render, if no  World Goal is provided", () => {
    //@ts-ignore
    viewModelMock.worldGoal.Value = undefined;
    useBuilderMock([viewModelMock, undefined]);

    const componentUnderTest = render(<WorldGoalPanel />);

    expect(componentUnderTest.queryByText("Test World")).toBeNull();
  });

  test("onClick sets isOpen state correctly", () => {
    viewModelMock.worldGoal.Value = "Test World";
    useBuilderMock([viewModelMock, undefined]);

    const componentUnderTest = render(<WorldGoalPanel key="WorldGoalPanel" />);

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
