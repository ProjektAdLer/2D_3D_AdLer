import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import LearningWorldGoalPanel from "../../../../Core/Presentation/React/LearningWorldGoalPanel/LearningWorldGoalPanel";
import LearningWorldGoalPanelViewModel from "../../../../Core/Presentation/React/LearningWorldGoalPanel/LearningWorldGoalPanelViewModel";
import useViewModelControllerProviderMock from "../CustomHooks/UseViewModelControllerProvider/useViewModelControllerProviderMock";

const fakeModel = new LearningWorldGoalPanelViewModel();

describe("LearningWorldGoalPanel", () => {
  test("should render", () => {
    fakeModel.worldGoal.Value = "Test World";
    useViewModelControllerProviderMock<
      LearningWorldGoalPanelViewModel,
      undefined
    >([[fakeModel], []]);

    const componentUnderTest = render(<LearningWorldGoalPanel />);

    expect(componentUnderTest.getByText("Test World")).toBeInTheDocument();
  });

  test("should nor render, if no Learning World Goal is provided", () => {
    useViewModelControllerProviderMock<
      LearningWorldGoalPanelViewModel,
      undefined
    >([[new LearningWorldGoalPanelViewModel()], []]);

    const componentUnderTest = render(<LearningWorldGoalPanel />);

    expect(componentUnderTest.queryByText("Test World")).toBeNull();
  });
});
