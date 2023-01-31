import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import history from "history/browser";
import mock from "jest-mock-extended/lib/Mock";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import ISideBarController from "../../../../../Core/Presentation/React/SpaceDisplay/SideBar/ISideBarController";
import SideBar from "../../../../../Core/Presentation/React/SpaceDisplay/SideBar/SideBar";
import React from "react";

const mockHistoryBack = jest.spyOn(history, "back");

jest.mock(
  "../../../../../Core/Presentation/React/SpaceDisplay/FullscreenSwitch/FullscreenSwitch",
  () => "string"
);

describe("SideBar", () => {
  test("should render", () => {
    useBuilderMock([undefined, mock<ISideBarController>()]);
    // disable console.error
    const originalError = console.error;
    console.error = jest.fn();
    render(<SideBar />);
    // restore console.error
    console.error = originalError;
  });
});
