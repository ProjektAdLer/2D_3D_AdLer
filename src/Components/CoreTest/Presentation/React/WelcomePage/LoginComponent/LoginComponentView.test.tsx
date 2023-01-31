import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import React from "react";
import ILoginComponentController from "../../../../../Core/Presentation/React/WelcomePage/LoginComponent/ILoginComponentController";
import LoginComponent from "../../../../../Core/Presentation/React/WelcomePage/LoginComponent/LoginComponent";
import LoginComponentViewModel from "../../../../../Core/Presentation/React/WelcomePage/LoginComponent/LoginComponentViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

let fakeModel = new LoginComponentViewModel();
const fakeController = mock<ILoginComponentController>();

describe("LoginComponent", () => {
  test("doesn't render without controller", () => {
    useBuilderMock([fakeModel, undefined]);
    const { container } = render(<LoginComponent />);
    expect(container.firstChild).toBeNull();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, fakeController]);
    const { container } = render(<LoginComponent />);
    expect(container.firstChild).toBeNull();
  });

  test("LoginComponent Tailwind Styling contains normal backgroundColor if not logged in", () => {
    fakeModel.loginSuccessful.Value = false;
    useBuilderMock([fakeModel, fakeController]);
    const componentUnderTest = render(<LoginComponent />);

    const style = componentUnderTest.container.children[0].className;
    expect(style).toContain("bg-adlerblue");
  });

  test("LoginComponent Tailwind Styling contains green backgroundColor if logged in", () => {
    fakeModel.loginSuccessful.Value = true;
    useBuilderMock([fakeModel, fakeController]);
    const componentUnderTest = render(<LoginComponent />);
    const style = componentUnderTest.container.children[0].className;
    expect(style).toContain("bg-adlergreen");
  });

  test("should render modal when clicked", () => {
    useBuilderMock([fakeModel, fakeController]);
    const componentUnderTest = render(<LoginComponent />);

    fireEvent.click(componentUnderTest.container.children[0].children[0]);

    expect(componentUnderTest.findByTitle("Moodle Login")).toBeTruthy();
  });
});
