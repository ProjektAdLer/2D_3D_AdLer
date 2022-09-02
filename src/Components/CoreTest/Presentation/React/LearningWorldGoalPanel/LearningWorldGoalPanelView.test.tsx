import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import LearningWorldGoalPanel from "../../../../Core/Presentation/React/LearningWorldGoalPanel/LearningWorldGoalPanel";
import LearningWorldGoalPanelViewModel from "../../../../Core/Presentation/React/LearningWorldGoalPanel/LearningWorldGoalPanelViewModel";
import useBuilderMock from "../CustomHooks/useBuilder/useBuilderMock";

const fakeModel = new LearningWorldGoalPanelViewModel();

describe("LearningWorldGoalPanel", () => {
  test("should render", () => {
    fakeModel.worldGoal.Value = "Test World";
    useBuilderMock([fakeModel, undefined]);

    const componentUnderTest = render(<LearningWorldGoalPanel />);

    expect(componentUnderTest.getByText("Test World")).toBeInTheDocument();
  });

  test("should nor render, if no Learning World Goal is provided", () => {
    //@ts-ignore
    fakeModel.worldGoal.Value = undefined;
    useBuilderMock([fakeModel, undefined]);

    const componentUnderTest = render(<LearningWorldGoalPanel />);

    expect(componentUnderTest.queryByText("Test World")).toBeNull();
  });
});
