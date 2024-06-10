import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import React from "react";
import HelpDeskButtonViewModel from "../../../../../Core/Presentation/React/GeneralComponents/HelpDeskButton/HelpDeskButtonViewModel";
import IHelpDeskButtonController from "../../../../../Core/Presentation/React/GeneralComponents/HelpDeskButton/IHelpDeskButtonController";
import mock from "jest-mock-extended/lib/Mock";
import { fireEvent, render } from "@testing-library/react";
import HelpDeskButton from "../../../../../Core/Presentation/React/GeneralComponents/HelpDeskButton/HelpDeskButton";

const viewModel = new HelpDeskButtonViewModel();
const controllerMock = mock<IHelpDeskButtonController>();
describe("HelpDeskButtonView", () => {
  //ANF-ID: [ELG0012]
  test("should render", () => {
    useBuilderMock([viewModel, controllerMock]);
    render(<HelpDeskButton />);
  });
  test("onClick calls controller", () => {
    useBuilderMock([viewModel, controllerMock]);
    const componentUnderTest = render(<HelpDeskButton />);
    const button = componentUnderTest.getByRole("button");
    fireEvent.click(button);
    expect(controllerMock.onHelpDeskButtonClicked).toHaveBeenCalled();
  });
});
