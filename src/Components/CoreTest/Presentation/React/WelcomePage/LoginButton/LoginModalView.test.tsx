import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import React from "react";
import LoginButtonViewModel from "../../../../../Core/Presentation/React/WelcomePage/LoginButton/LoginButtonViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import LoginModal from "../../../../../Core/Presentation/React/WelcomePage/LoginButton/LoginModal";
import ILoginButtonController from "../../../../../Core/Presentation/React/WelcomePage/LoginButton/ILoginButtonController";

let viewModel = new LoginButtonViewModel();
const mockedController = mock<ILoginButtonController>();

describe("LoginModal", () => {
  test("should render if visible", () => {
    viewModel.modalVisible.Value = true;
    const componentUnderTest = render(
      <LoginModal controller={mockedController} viewModel={viewModel} />
    );
    expect(componentUnderTest.container.children[0].children[0]).toBeTruthy();
  });

  test("should close, if closed", () => {
    viewModel.modalVisible.Value = true;
    useBuilderMock([viewModel, mockedController]);
    const componentUnderTest = render(
      <LoginModal controller={mockedController} viewModel={viewModel} />
    );
    fireEvent.click(componentUnderTest.getByText("X"));
    expect(componentUnderTest.container.children.length).toBe(0);
  });

  test("should set text in username and password field", () => {
    viewModel.modalVisible.Value = true;
    useBuilderMock([viewModel, mockedController]);
    const componentUnderTest = render(
      <LoginModal controller={mockedController} viewModel={viewModel} />
    );
    fireEvent.change(componentUnderTest.getByPlaceholderText("Nutzername"), {
      target: { value: "test" },
    });
    fireEvent.change(componentUnderTest.getByPlaceholderText("Passwort"), {
      target: { value: "test" },
    });

    fireEvent.click(componentUnderTest.getByText("Login"));

    expect(mockedController.loginAsync).toHaveBeenCalledWith("test", "test");
  });

  test("should alert, when password is missing", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();
    viewModel.modalVisible.Value = true;
    useBuilderMock([viewModel, mockedController]);

    const componentUnderTest = render(
      <LoginModal controller={mockedController} viewModel={viewModel} />
    );

    fireEvent.click(componentUnderTest.getByText("Passwort vergessen?"));

    expect(alertMock).toHaveBeenCalledWith(
      "Hier kannst du bald dein neues Passwort bekommen!"
    );
  });
});
