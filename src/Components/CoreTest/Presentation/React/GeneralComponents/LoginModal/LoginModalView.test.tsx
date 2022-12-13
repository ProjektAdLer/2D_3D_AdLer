import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import React from "react";
import ILoginModalController from "../../../../../Core/Presentation/React/GeneralComponents/LoginModal/ILoginModalController";
import LoginModal from "../../../../../Core/Presentation/React/GeneralComponents/LoginModal/LoginModal";
import LoginModalViewModel from "../../../../../Core/Presentation/React/GeneralComponents/LoginModal/LoginModalViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

let fakeModel = new LoginModalViewModel();
const fakeController = mock<ILoginModalController>();

describe("MoodleLoginFomr", () => {
  test("doesn't render without controller", () => {
    useBuilderMock([fakeModel, undefined]);
    const { container } = render(<LoginModal />);
    expect(container.firstChild).toBeNull();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, fakeController]);
    const { container } = render(<LoginModal />);
    expect(container.firstChild).toBeNull();
  });

  test("should render if visible", () => {
    fakeModel.visible.Value = true;
    useBuilderMock([fakeModel, fakeController]);
    const componentUnderTest = render(<LoginModal />);
    expect(componentUnderTest.container.children[0].children[0]).toBeTruthy();
  });

  test("should close, if closed", () => {
    fakeModel.visible.Value = true;
    useBuilderMock([fakeModel, fakeController]);
    const componentUnderTest = render(<LoginModal />);
    fireEvent.click(componentUnderTest.getByText("X"));
    expect(componentUnderTest.container.children.length).toBe(0);
  });

  test("should set text in username and password field", () => {
    fakeModel.visible.Value = true;
    useBuilderMock([fakeModel, fakeController]);
    const componentUnderTest = render(<LoginModal />);
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

    const componentUnderTest = render(<LoginModal />);

    fireEvent.click(componentUnderTest.getByText("Passwort vergessen?"));

    expect(alertMock).toHaveBeenCalledWith(
      "Hier kannst du bald dein neues Passwort bekommen!"
    );
  });
});
