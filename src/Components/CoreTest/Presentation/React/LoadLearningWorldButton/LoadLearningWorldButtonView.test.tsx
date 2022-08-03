import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import ILoadLearningWorldButtonController from "../../../../Core/Presentation/React/LoadLearningWorldButton/ILoadLearningWorldButtonController";
import LoadLearningWorldButton from "../../../../Core/Presentation/React/LoadLearningWorldButton/LoadLearningWorldButton";
import useViewModelControllerProviderMock from "../CustomHooks/UseViewModelControllerProvider/useViewModelControllerProviderMock";

const fakeController = mock<ILoadLearningWorldButtonController>();

describe("LoadLearningWorldButtonView", () => {
  test("should render", () => {
    useViewModelControllerProviderMock();
    render(<LoadLearningWorldButton />);
  });

  test("should call controller when clicked", () => {
    useViewModelControllerProviderMock([[], [fakeController]]);

    const componentUnderTest = render(<LoadLearningWorldButton />);

    fireEvent.click(componentUnderTest.getByRole("button"));
    expect(fakeController.loadWorld).toHaveBeenCalled();
  });
});
