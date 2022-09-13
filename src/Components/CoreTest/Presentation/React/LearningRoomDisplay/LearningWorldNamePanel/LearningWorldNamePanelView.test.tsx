import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import LearningWorldNamePanel from "../../../../../Core/Presentation/React/LearningRoomDisplay/LearningWorldNamePanel/LearningWorldNamePanel";
import LearningWorldNamePanelViewModel from "../../../../../Core/Presentation/React/LearningRoomDisplay/LearningWorldNamePanel/LearningWorldNamePanelViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

const fakeModel = new LearningWorldNamePanelViewModel();

describe("LearningWorldNamePanel", () => {
  test("should render", () => {
    fakeModel.worldName.Value = "Test World";
    useBuilderMock([fakeModel, undefined]);

    const componentUnderTest = render(<LearningWorldNamePanel />);

    expect(componentUnderTest.getByText("Test World")).toBeInTheDocument();
  });

  test("should nor render, if no Learning World name is provided", () => {
    useBuilderMock([new LearningWorldNamePanelViewModel(), undefined]);

    const componentUnderTest = render(<LearningWorldNamePanel />);

    expect(componentUnderTest.queryByText("Test World")).toBeNull();
  });
});
