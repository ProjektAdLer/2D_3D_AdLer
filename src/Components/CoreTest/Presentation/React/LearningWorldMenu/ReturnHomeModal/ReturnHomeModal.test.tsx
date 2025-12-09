import history from "~ReactEntryPoint/history";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import ReturnHomeModalViewModel from "../../../../../Core/Presentation/React/LearningWorldMenu/ReturnHomeModal/ReturnHomeModalViewModel";
import React from "react";
import ReturnHomeModal from "../../../../../Core/Presentation/React/LearningWorldMenu/ReturnHomeModal/ReturnHomeModal";
import { fireEvent, render } from "@testing-library/react";

const mockHistoryPush = jest.spyOn(history, "push");

describe("ReturnHomeModal", () => {
  let mockViewModel: ReturnHomeModalViewModel;
  beforeEach(() => {
    mockViewModel = new ReturnHomeModalViewModel();
    useBuilderMock([mockViewModel, undefined]);
  });

  test("should not render if no viewmodel is provided", () => {
    useBuilderMock([undefined, undefined]);
    expect(render(<ReturnHomeModal />).container).toBeEmptyDOMElement();
  });

  test("should not render", () => {
    expect(render(<ReturnHomeModal />).container).toBeEmptyDOMElement();
  });

  test("should render if viewModel data is set to true", () => {
    mockViewModel.isNoWorldAvailable.Value = true;
    expect(render(<ReturnHomeModal />).container).not.toBeEmptyDOMElement();
  });

  test("click on home button sets history to welcome screen", () => {
    mockViewModel.isNoWorldAvailable.Value = true;
    const componentUnderTest = render(<ReturnHomeModal />);
    fireEvent.click(componentUnderTest.getByAltText("Home Icon"));
    expect(mockHistoryPush).toBeCalledWith("/");
  });
});
