import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import BottomTooltip from "../../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/BottomTooltip";
import BottomTooltipViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/BottomTooltip/BottomTooltipViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import React from "react";
import PointBasedDisplay from "../../../../../Core/Presentation/Utils/ElementCompletionDisplay/PointBasedDisplay";

let fakeModel = new BottomTooltipViewModel();

describe("BottomTooltip", () => {
  test("should render when open", () => {
    fakeModel.show.Value = true;
    fakeModel.iconType.Value = "text";
    fakeModel.text.Value = "testText";
    fakeModel.displayStrategy = new PointBasedDisplay();

    useBuilderMock([fakeModel, undefined]);

    const componentUnderTest = render(<BottomTooltip />);

    expect(componentUnderTest.getByText("testText")).toBeInTheDocument();
  });

  test("should not render when closed", () => {
    fakeModel.show.Value = false;
    fakeModel.iconType.Value = "text";
    fakeModel.text.Value = "testText";
    fakeModel.displayStrategy = new PointBasedDisplay();

    useBuilderMock([fakeModel, undefined]);

    const componentUnderTest = render(<BottomTooltip />);

    expect(componentUnderTest.queryByText("testText")).not.toBeInTheDocument();
  });
});
