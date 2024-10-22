import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import history from "history/browser";
import mock from "jest-mock-extended/lib/Mock";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import ISideBarController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/SideBar/ISideBarController";
import SideBar from "../../../../../Core/Presentation/React/LearningSpaceDisplay/SideBar/SideBar";
import React from "react";
import SideBarViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/SideBar/SideBarViewModel";
import Observable from "../../../../../../Lib/Observable";

const mockHistoryBack = jest.spyOn(history, "back");

jest.mock(
  "../../../../../Core/Presentation/React/LearningSpaceDisplay/FullscreenSwitch/FullscreenSwitch",
  () => "string",
);

describe("SideBar", () => {
  let viewModel: SideBarViewModel;

  beforeEach(() => {
    viewModel = new SideBarViewModel();
  });

  test("should render", () => {
    useBuilderMock([viewModel, mock<ISideBarController>()]);
    // disable console.error
    const originalError = console.error;
    console.error = jest.fn();
    render(<SideBar />);
    // restore console.error
    console.error = originalError;
  });
});
