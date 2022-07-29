import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import LearningWorldNamePanelViewModel from "../../../../Core/Presentation/React/LearningWorldNamePanel/LearningWorldNamePanelViewModel";
import IMoodleLoginButtonController from "../../../../Core/Presentation/React/MoodleLoginButton/IMoodleLoginButtonController";
import MoodleLoginButton from "../../../../Core/Presentation/React/MoodleLoginButton/MoodleLoginButton";
import MoodleLoginButtonViewModel from "../../../../Core/Presentation/React/MoodleLoginButton/MoodleLoginButtonViewModel";
import useViewModelControllerProviderMock from "../CustomHooks/UseViewModelControllerProvider/useViewModelControllerProviderMock";

let fakeModel = new MoodleLoginButtonViewModel();
const fakeController = mock<IMoodleLoginButtonController>();

describe("MoodleLoginButton", () => {
  test("should render without style of login is not sucessful", () => {
    fakeModel.loginSuccessful.Value = false;
    useViewModelControllerProviderMock<MoodleLoginButtonViewModel, undefined>([
      [fakeModel],
      [],
    ]);
    const componentUnderTest = render(<MoodleLoginButton />);
    const style = window.getComputedStyle(
      componentUnderTest.container.children[0].children[0]
    );
    expect(style.background).toBeFalsy();
  });

  test("should render with style of login is sucessful", () => {
    fakeModel.loginSuccessful.Value = true;
    useViewModelControllerProviderMock<MoodleLoginButtonViewModel, undefined>([
      [fakeModel],
      [],
    ]);
    const componentUnderTest = render(<MoodleLoginButton />);
    const style = window.getComputedStyle(
      componentUnderTest.container.children[0].children[0]
    );
    expect(style.background).toBe("green");
  });

  test("should call controller when clicked", () => {
    useViewModelControllerProviderMock<
      MoodleLoginButtonViewModel,
      IMoodleLoginButtonController
    >([[fakeModel], [fakeController]]);
    const componentUnderTest = render(<MoodleLoginButton />);

    fireEvent.click(componentUnderTest.container.children[0].children[0]);

    expect(fakeController.displayLoginForm).toHaveBeenCalled();
  });
});
