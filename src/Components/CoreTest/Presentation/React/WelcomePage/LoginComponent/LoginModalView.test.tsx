import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import React from "react";
import LoginComponentViewModel from "../../../../../Core/Presentation/React/WelcomePage/LoginComponent/LoginComponentViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import LoginModal from "../../../../../Core/Presentation/React/WelcomePage/LoginComponent/LoginModal";
import ILoginComponentController from "../../../../../Core/Presentation/React/WelcomePage/LoginComponent/ILoginComponentController";

let viewModel = new LoginComponentViewModel();
const mockedController = mock<ILoginComponentController>();

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
    fireEvent.change(componentUnderTest.getByPlaceholderText("userName"), {
      target: { value: "test" },
    });
    fireEvent.change(componentUnderTest.getByPlaceholderText("password"), {
      target: { value: "test" },
    });

    fireEvent.click(componentUnderTest.getByText("loginButton"));

    expect(mockedController.login).toHaveBeenCalledWith("test", "test");
  });

  test.skip("should alert on passwort forgotten button click", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();
    viewModel.modalVisible.Value = true;
    useBuilderMock([viewModel, mockedController]);

    const componentUnderTest = render(
      <LoginModal controller={mockedController} viewModel={viewModel} />
    );

    fireEvent.click(componentUnderTest.getByText("Passwort vergessen?"));
    waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        "Hier kannst du bald dein neues Passwort bekommen!"
      );
    });
  });
});
