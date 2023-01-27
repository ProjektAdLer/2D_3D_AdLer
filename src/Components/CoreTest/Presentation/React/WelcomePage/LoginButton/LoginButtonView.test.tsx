import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import React from "react";
import ILoginButtonController from "../../../../../Core/Presentation/React/WelcomePage/LoginButton/ILoginButtonController";
import LoginButton from "../../../../../Core/Presentation/React/WelcomePage/LoginButton/LoginButton";
import LoginButtonViewModel from "../../../../../Core/Presentation/React/WelcomePage/LoginButton/LoginButtonViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

let fakeModel = new LoginButtonViewModel();
const fakeController = mock<ILoginButtonController>();

describe("LoginButton", () => {
  test("doesn't render without controller", () => {
    useBuilderMock([fakeModel, undefined]);
    const { container } = render(<LoginButton />);
    expect(container.firstChild).toBeNull();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, fakeController]);
    const { container } = render(<LoginButton />);
    expect(container.firstChild).toBeNull();
  });

  test("LoginButton Tailwind Styling contains normal backgroundColor if not logged in", () => {
    fakeModel.loginSuccessful.Value = false;
    useBuilderMock([fakeModel, fakeController]);
    const componentUnderTest = render(<LoginButton />);

    const style = componentUnderTest.container.children[0].className;
    expect(style).toContain("bg-adlerblue");
  });

  test("LoginButton Tailwind Styling contains green backgroundColor if logged in", () => {
    fakeModel.loginSuccessful.Value = true;
    useBuilderMock([fakeModel, fakeController]);
    const componentUnderTest = render(<LoginButton />);
    const style = componentUnderTest.container.children[0].className;
    expect(style).toContain("bg-adlergreen");
  });

  test("should render modal when clicked", () => {
    useBuilderMock([fakeModel, fakeController]);
    const componentUnderTest = render(<LoginButton />);

    fireEvent.click(componentUnderTest.container.children[0].children[0]);

    expect(componentUnderTest.findByTitle("Moodle Login")).toBeTruthy();
  });
});
