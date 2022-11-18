import "@testing-library/jest-dom";
import { mock } from "jest-mock-extended";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import UseGuide from "../../../../../Core/Presentation/React/SpaceDisplay/UseGuide/UseGuide";
import UseGuideViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/UseGuide/UseGuideViewModel";
import IUseGuideController from "../../../../../Core/Presentation/React/SpaceDisplay/UseGuide/IUseGuideController";

const viewModelMock = mock<UseGuideViewModel>();
const controllerMock = mock<IUseGuideController>();
describe("UseGuide View", () => {
  beforeAll(() => {});
  test("should render", () => {
    useBuilderMock([viewModelMock, controllerMock]);
    render(<UseGuide />);
  });
  test("should not render if controller is undefined", () => {
    useBuilderMock([viewModelMock, undefined]);
    const componentUnderTest = render(<UseGuide />);
    expect(componentUnderTest.container).toBeEmptyDOMElement();
  });
  test("onClick works", () => {
    useBuilderMock([viewModelMock, controllerMock]);
    const componentUnderTest = render(<UseGuide />);
    fireEvent.click(componentUnderTest.container.children[0].children[0]);
    expect(componentUnderTest.queryByText("Steuerung")).not.toBeInTheDocument();
  });
});
