import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import BottomTooltip from "../../../../Core/Presentation/React/BottomTooltip/BottomTooltip";
import BottomTooltipViewModel from "../../../../Core/Presentation/React/BottomTooltip/BottomTooltipViewModel";
import useViewModelControllerProviderMock from "../CustomHooks/UseViewModelControllerProvider/useViewModelControllerProviderMock";

let fakeModel = new BottomTooltipViewModel();

describe("BottomTooltip", () => {
  test("should render when open", () => {
    fakeModel.show.Value = true;
    fakeModel.iconType.Value = "test";
    fakeModel.text.Value = "testText";

    useViewModelControllerProviderMock<BottomTooltipViewModel, undefined>([
      [fakeModel],
      [],
    ]);

    const componentUnderTest = render(<BottomTooltip />);

    expect(componentUnderTest.getByText("testText")).toBeInTheDocument();
  });

  test("should not render when closed", () => {
    fakeModel.show.Value = false;
    fakeModel.iconType.Value = "test";
    fakeModel.text.Value = "testText";

    useViewModelControllerProviderMock<BottomTooltipViewModel, undefined>([
      [fakeModel],
      [],
    ]);

    const componentUnderTest = render(<BottomTooltip />);

    expect(componentUnderTest.queryByText("testText")).not.toBeInTheDocument();
  });
});
