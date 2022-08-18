import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import IMoodleLoginButtonController from "../../../../Core/Presentation/React/MoodleLoginButton/IMoodleLoginButtonController";
import MoodleLoginButton from "../../../../Core/Presentation/React/MoodleLoginButton/MoodleLoginButton";
import MoodleLoginButtonViewModel from "../../../../Core/Presentation/React/MoodleLoginButton/MoodleLoginButtonViewModel";
import useViewModelControllerProviderMock from "../CustomHooks/UseViewModelControllerProvider/useViewModelControllerProviderMock";

let fakeModel = new MoodleLoginButtonViewModel();
const fakeController = mock<IMoodleLoginButtonController>();

describe("MoodleLoginButton", () => {
  test("MoodleLoginButton Tailwind Styling contains normal backgroundColor if not logged in", () => {
    fakeModel.loginSuccessful.Value = false;
    useViewModelControllerProviderMock<MoodleLoginButtonViewModel, undefined>([
      [fakeModel],
      [],
    ]);
    const componentUnderTest = render(<MoodleLoginButton />);

    const style = componentUnderTest.container.children[0].className;
    expect(style).toContain("bg-adlerblue");
  });

  test("MoodleLoginButton Tailwind Styling contains green backgroundColor if logged in", () => {
    fakeModel.loginSuccessful.Value = true;
    useViewModelControllerProviderMock<MoodleLoginButtonViewModel, undefined>([
      [fakeModel],
      [],
    ]);
    const componentUnderTest = render(<MoodleLoginButton />);
    const style = componentUnderTest.container.children[0].className;
    expect(style).toContain("bg-adlergreen");
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
