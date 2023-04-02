import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import LearningSpaceNamePanelViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceNamePanel/LearningSpaceNamePanelViewModel";
import LearningSpaceNamePanel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceNamePanel/LearningSpaceNamePanel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import React from "react";

const fakeModel = new LearningSpaceNamePanelViewModel();

describe("LearningWorldNamePanel", () => {
  test("should render", () => {
    fakeModel.name.Value = "Test World";
    useBuilderMock([fakeModel, undefined]);

    const componentUnderTest = render(<LearningSpaceNamePanel />);

    expect(componentUnderTest.getByText("Test World")).toBeInTheDocument();
  });

  test("should nor render, if no World name is provided", () => {
    useBuilderMock([new LearningSpaceNamePanelViewModel(), undefined]);

    const componentUnderTest = render(<LearningSpaceNamePanel />);

    expect(componentUnderTest.queryByText("Test World")).toBeNull();
  });
});
