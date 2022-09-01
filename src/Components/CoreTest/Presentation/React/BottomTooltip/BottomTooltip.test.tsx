import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import BottomTooltip from "../../../../Core/Presentation/React/BottomTooltip/BottomTooltip";
import BottomTooltipViewModel from "../../../../Core/Presentation/React/BottomTooltip/BottomTooltipViewModel";
import useBuilderMock from "../CustomHooks/useBuilder/useBuilderMock";

let fakeModel = new BottomTooltipViewModel();

describe("BottomTooltip", () => {
  test("should render when open", () => {
    fakeModel.show.Value = true;
    fakeModel.iconType.Value = "test";
    fakeModel.text.Value = "testText";

    useBuilderMock([fakeModel, undefined]);

    const componentUnderTest = render(<BottomTooltip />);

    expect(componentUnderTest.getByText("testText")).toBeInTheDocument();
  });

  test("should not render when closed", () => {
    fakeModel.show.Value = false;
    fakeModel.iconType.Value = "test";
    fakeModel.text.Value = "testText";

    useBuilderMock([fakeModel, undefined]);

    const componentUnderTest = render(<BottomTooltip />);

    expect(componentUnderTest.queryByText("testText")).not.toBeInTheDocument();
  });
});
