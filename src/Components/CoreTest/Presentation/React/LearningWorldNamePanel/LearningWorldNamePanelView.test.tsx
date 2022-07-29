import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import LearningWorldNamePanel from "../../../../Core/Presentation/React/LearningWorldNamePanel/LearningWorldNamePanel";
import LearningWorldNamePanelViewModel from "../../../../Core/Presentation/React/LearningWorldNamePanel/LearningWorldNamePanelViewModel";
import useViewModelControllerProviderMock from "../CustomHooks/UseViewModelControllerProvider/useViewModelControllerProviderMock";

const fakeModel = new LearningWorldNamePanelViewModel();

describe("LearningWorldNamePanel", () => {
  test("should render", () => {
    fakeModel.worldName.Value = "Test World";
    useViewModelControllerProviderMock<
      LearningWorldNamePanelViewModel,
      undefined
    >([[fakeModel], []]);

    const componentUnderTest = render(<LearningWorldNamePanel />);

    expect(componentUnderTest.getByText("Test World")).toBeInTheDocument();
  });

  test("should nor render, if no Learning World name is provided", () => {
    useViewModelControllerProviderMock<
      LearningWorldNamePanelViewModel,
      undefined
    >([[new LearningWorldNamePanelViewModel()], []]);

    const componentUnderTest = render(<LearningWorldNamePanel />);

    expect(componentUnderTest.queryByText("Test World")).toBeNull();
  });
});
