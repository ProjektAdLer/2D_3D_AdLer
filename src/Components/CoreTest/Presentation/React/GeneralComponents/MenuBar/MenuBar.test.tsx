import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import history from "history/browser";
import mock from "jest-mock-extended/lib/Mock";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import IMenuBarController from "../../../../../Core/Presentation/React/GeneralComponents/MenuBar/IMenuBarController";
import MenuBar from "../../../../../Core/Presentation/React/GeneralComponents/MenuBar/MenuBar";

const mockHistoryBack = jest.spyOn(history, "back");
jest.mock(
  "../../../../../Core/Presentation/React/GeneralComponents/MoodleLoginButton/MoodleLoginButton",
  () => "string"
);

jest.mock(
  "../../../../../Core/Presentation/React/SpaceDisplay/FullscreenSwitch/FullscreenSwitch",
  () => "string"
);

describe("MenuBar", () => {
  test("should render", () => {
    useBuilderMock([undefined, mock<IMenuBarController>()]);
    // disable console.error
    const originalError = console.error;
    console.error = jest.fn();
    render(<MenuBar />);
    // restore console.error
    console.error = originalError;
  });
});
