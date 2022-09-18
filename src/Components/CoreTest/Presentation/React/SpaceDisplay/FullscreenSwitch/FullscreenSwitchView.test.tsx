import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import FullscreenSwitch from "~ReactComponents/SpaceDisplay/FullscreenSwitch/FullscreenSwitch";
import IFullscreenSwitchController from "~ReactComponents/SpaceDisplay/FullscreenSwitch/IFullscreenSwitchController";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

const controllerMock = mock<IFullscreenSwitchController>();

describe("FullscreenSwitchView", () => {
  test("should render", () => {
    useBuilderMock([undefined, undefined]);
    render(<FullscreenSwitch />);
  });

  test("should call its controller, when clicked", () => {
    useBuilderMock([undefined, controllerMock]);
    const systemUnderTest = render(<FullscreenSwitch />);
    fireEvent.click(systemUnderTest.getByRole("button"));

    expect(controllerMock.toggleFullscreen).toHaveBeenCalled();
  });
});
