import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import FullscreenSwitch from "../../../../Core/Presentation/React/FullscreenSwitch/FullscreenSwitch";
import useViewModelControllerProviderMock from "../CustomHooks/UseViewModelControllerProvider/useViewModelControllerProviderMock";

describe("FullscreenSwitchView", () => {
  test("should render", () => {
    useViewModelControllerProviderMock();
    render(<FullscreenSwitch />);
  });
});
