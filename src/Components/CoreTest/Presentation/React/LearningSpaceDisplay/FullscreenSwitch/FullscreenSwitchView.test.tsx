import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import FullscreenSwitch from "../../../../../Core/Presentation/React/LearningSpaceDisplay/FullscreenSwitch/FullscreenSwitch";
import IFullscreenSwitchController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/FullscreenSwitch/IFullscreenSwitchController";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import React from "react";

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
