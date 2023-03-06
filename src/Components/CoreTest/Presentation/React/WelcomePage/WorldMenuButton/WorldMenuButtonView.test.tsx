import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import WorldMenuButton from "../../../../../Core/Presentation/React/WelcomePage/WorldMenuButton/WorldMenuButtonView";
import WorldMenuButtonViewModel from "../../../../../Core/Presentation/React/WelcomePage/WorldMenuButton/WorldMenuButtonViewModel";
import history from "history/browser";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import { mock } from "jest-mock-extended";
import IGetLoginStatusUseCase from "../../../../../Core/Application/UseCases/GetLoginStatus/IGetLoginStatusUseCase";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

let mockViewModel = new WorldMenuButtonViewModel();
const historyPushMock = jest.spyOn(history, "push");
const getLoginStatusUseCaseMock = mock<IGetLoginStatusUseCase>();

describe("WorldMenuButton", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind<IGetLoginStatusUseCase>(
      USECASE_TYPES.IGetLoginStatusUseCase
    ).toConstantValue(getLoginStatusUseCaseMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should render", () => {
    useBuilderMock([mockViewModel, undefined]);
    render(
      <Provider container={CoreDIContainer}>
        <WorldMenuButton />
      </Provider>
    );
  });

  test("LoginComponent calls GetLoginStatusUseCase.execute on mount", () => {
    useBuilderMock([mockViewModel, undefined]);

    render(
      <Provider container={CoreDIContainer}>
        <WorldMenuButton />
      </Provider>
    );

    expect(getLoginStatusUseCaseMock.execute).toBeCalledTimes(1);
  });

  test("WorldMenuButton Tailwind Styling contains grey backgroundColor if not logged in", () => {
    mockViewModel.userLoggedIn.Value = false;
    getLoginStatusUseCaseMock.execute.mockReturnValue(false);
    useBuilderMock([mockViewModel, undefined]);

    const componentUnderTest = render(
      <Provider container={CoreDIContainer}>
        <WorldMenuButton />
      </Provider>
    );

    const style =
      componentUnderTest.container.children[0].children[0].className;
    expect(style).toContain("bg-adlerdeactivated");
  });

  test("WorldMenuButton Tailwind Styling contains normal backgroundColor if logged in", () => {
    mockViewModel.userLoggedIn.Value = true;
    getLoginStatusUseCaseMock.execute.mockReturnValue(true);
    useBuilderMock([mockViewModel, undefined]);

    const componentUnderTest = render(
      <Provider container={CoreDIContainer}>
        <WorldMenuButton />
      </Provider>
    );

    const style =
      componentUnderTest.container.children[0].children[0].className;
    expect(style).toContain("bg-adlerblue");
  });

  test("on click calls history.push", () => {
    mockViewModel.userLoggedIn.Value = true;
    getLoginStatusUseCaseMock.execute.mockReturnValue(true);
    useBuilderMock([mockViewModel, undefined]);

    const componentUnderTest = render(
      <Provider container={CoreDIContainer}>
        <WorldMenuButton />
      </Provider>
    );

    let button: HTMLElement = componentUnderTest.getByRole("button");

    fireEvent.click(button);

    expect(historyPushMock).toHaveBeenCalledTimes(1);
  });
});
