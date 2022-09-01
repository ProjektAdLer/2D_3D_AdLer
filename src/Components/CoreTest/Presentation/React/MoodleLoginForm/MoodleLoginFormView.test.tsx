import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import IMoodleLoginFormController from "../../../../Core/Presentation/React/MoodleLoginForm/IMoodleLoginFormController";
import MoodleLoginForm from "../../../../Core/Presentation/React/MoodleLoginForm/MoodleLoginForm";
import MoodleLoginFormViewModel from "../../../../Core/Presentation/React/MoodleLoginForm/MoodleLoginFormViewModel";
import useBuilderMock from "../CustomHooks/useBuilder/useBuilderMock";

let fakeModel = new MoodleLoginFormViewModel();
const fakeController = mock<IMoodleLoginFormController>();

describe("MoodleLoginFomr", () => {
  test("should render if visible", () => {
    fakeModel.visible.Value = true;
    useBuilderMock([fakeModel, fakeController]);
    const componentUnderTest = render(<MoodleLoginForm />);
    expect(componentUnderTest.container.children[0].children[0]).toBeTruthy();
  });

  test("should close, if closed", () => {
    fakeModel.visible.Value = true;
    useBuilderMock([fakeModel, fakeController]);
    const componentUnderTest = render(<MoodleLoginForm />);
    fireEvent.click(componentUnderTest.getByText("X"));
    expect(componentUnderTest.container.children.length).toBe(0);
  });

  test("should set text in username and password field", () => {
    fakeModel.visible.Value = true;
    useBuilderMock([fakeModel, fakeController]);
    const componentUnderTest = render(<MoodleLoginForm />);
    fireEvent.change(componentUnderTest.getByPlaceholderText("Nutzername"), {
      target: { value: "test" },
    });
    fireEvent.change(componentUnderTest.getByPlaceholderText("Passwort"), {
      target: { value: "test" },
    });

    fireEvent.click(componentUnderTest.getByText("Login"));

    expect(fakeController.loginAsync).toHaveBeenCalledWith("test", "test");
  });

  test("should alert, when password is missing", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();
    fakeModel.visible.Value = true;
    useBuilderMock([fakeModel, fakeController]);

    const componentUnderTest = render(<MoodleLoginForm />);

    fireEvent.click(componentUnderTest.getByText("Passwort vergessen?"));

    expect(alertMock).toHaveBeenCalledWith(
      "Hier kannst du bald dein neues Passwort bekommen!"
    );
  });
});
