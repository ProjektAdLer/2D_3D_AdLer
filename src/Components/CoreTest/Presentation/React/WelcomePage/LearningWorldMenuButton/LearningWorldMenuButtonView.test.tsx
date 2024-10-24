import { fireEvent, render } from "@testing-library/react";
import React from "react";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import LearningWorldMenuButton from "../../../../../Core/Presentation/React/WelcomePage/LearningWorldMenuButton/LearningWorldMenuButtonView";
import LearningWorldMenuButtonViewModel from "../../../../../Core/Presentation/React/WelcomePage/LearningWorldMenuButton/LearningWorldMenuButtonViewModel";
import history from "history/browser";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import { mock } from "jest-mock-extended";
import IGetLoginStatusUseCase from "../../../../../Core/Application/UseCases/GetLoginStatus/IGetLoginStatusUseCase";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

let mockViewModel = new LearningWorldMenuButtonViewModel();
const historyPushMock = jest.spyOn(history, "push");
const getLoginStatusUseCaseMock = mock<IGetLoginStatusUseCase>();

describe("LearningWorldMenuButton", () => {
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
    getLoginStatusUseCaseMock.execute.mockReturnValue({
      isLoggedIn: false,
      userName: "",
    });

    render(
      <Provider container={CoreDIContainer}>
        <LearningWorldMenuButton />
      </Provider>
    );
  });

  test.todo("fix test for call to GetLoginStatusUseCase.execute");
  test.skip("calls GetLoginStatusUseCase.execute on mount", () => {
    useBuilderMock([mockViewModel, undefined]);
    getLoginStatusUseCaseMock.execute.mockReset();
    getLoginStatusUseCaseMock.execute.mockReturnValue({
      isLoggedIn: false,
      userName: "",
    });

    render(
      <Provider container={CoreDIContainer}>
        <LearningWorldMenuButton />
      </Provider>
    );

    expect(getLoginStatusUseCaseMock.execute).toBeCalledTimes(1);
  });

  test("LearningWorldMenuButton Tailwind Styling contains grey backgroundColor if not logged in", () => {
    mockViewModel.userLoggedIn.Value = false;
    getLoginStatusUseCaseMock.execute.mockReturnValue({
      isLoggedIn: false,
      userName: "",
    });
    useBuilderMock([mockViewModel, undefined]);

    const componentUnderTest = render(
      <Provider container={CoreDIContainer}>
        <LearningWorldMenuButton />
      </Provider>
    );

    const buttonStyle = componentUnderTest.getByRole("button").className;
    expect(buttonStyle).toMatchSnapshot();
  });

  test("LearningWorldMenuButton Tailwind Styling contains normal backgroundColor if logged in", () => {
    mockViewModel.userLoggedIn.Value = true;
    getLoginStatusUseCaseMock.execute.mockReturnValue({
      isLoggedIn: true,
      userName: "",
    });
    useBuilderMock([mockViewModel, undefined]);

    const componentUnderTest = render(
      <Provider container={CoreDIContainer}>
        <LearningWorldMenuButton />
      </Provider>
    );

    const buttonStyle = componentUnderTest.getByRole("button").className;
    expect(buttonStyle).toMatchSnapshot();
  });

  test("on click calls history.push", () => {
    mockViewModel.userLoggedIn.Value = true;
    getLoginStatusUseCaseMock.execute.mockReturnValue({
      isLoggedIn: true,
      userName: "",
    });
    useBuilderMock([mockViewModel, undefined]);

    const componentUnderTest = render(
      <Provider container={CoreDIContainer}>
        <LearningWorldMenuButton />
      </Provider>
    );

    let button: HTMLElement = componentUnderTest.getByRole("button");

    fireEvent.click(button);

    expect(historyPushMock).toHaveBeenCalledTimes(1);
  });
});
