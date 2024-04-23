import { mock } from "jest-mock-extended";
import { render } from "@testing-library/react";
import LearningSpaceSelectionViewModel, {
  LearningSpaceSelectionLearningSpaceData,
} from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceSelection/LearningSpaceSelectionViewModel";
import React from "react";
import LearningSpaceSelectionList from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceSelection/List/LearningSpaceSelectionList";
import ILearningSpaceSelectionController from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceSelection/ILearningSpaceSelectionController";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import ICalculateLearningSpaceScoreUseCase from "../../../../../Core/Application/UseCases/CalculateLearningSpaceScore/ICalculateLearningSpaceScoreUseCase";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

const calculateSpaceScoreUseCaseMock =
  mock<ICalculateLearningSpaceScoreUseCase>();

describe("LearningSpaceSelectionList", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<ICalculateLearningSpaceScoreUseCase>(
      USECASE_TYPES.ICalculateLearningSpaceScoreUseCase
    ).toConstantValue(calculateSpaceScoreUseCaseMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  // ANF-ID: [EWE0024]
  test("should render and call controller on click on completed space", () => {
    const vm = new LearningSpaceSelectionViewModel();
    vm.spaces.Value = [
      {
        id: 1,
        name: "test",
        isAvailable: true,
        isCompleted: true,
      } as LearningSpaceSelectionLearningSpaceData,
    ];
    const controllerMock = mock<ILearningSpaceSelectionController>();

    const container = render(
      <Provider container={CoreDIContainer}>
        <LearningSpaceSelectionList
          controller={controllerMock}
          viewModel={vm}
        />
      </Provider>
    );

    // click on the first row
    container.getByRole("button").click();

    expect(controllerMock.onLearningSpaceClicked).toBeCalledWith(1);
  });
  test("should render and call controller on click on available space", () => {
    const vm = new LearningSpaceSelectionViewModel();
    vm.spaces.Value = [
      {
        id: 1,
        name: "test",
        isAvailable: true,
        isCompleted: false,
      } as LearningSpaceSelectionLearningSpaceData,
    ];
    const controllerMock = mock<ILearningSpaceSelectionController>();

    const container = render(
      <Provider container={CoreDIContainer}>
        <LearningSpaceSelectionList
          controller={controllerMock}
          viewModel={vm}
        />
      </Provider>
    );

    // click on the first row
    container.getByRole("button").click();

    expect(controllerMock.onLearningSpaceClicked).toBeCalledWith(1);
  });
  test("should render and call controller on click on unavailable space", () => {
    const vm = new LearningSpaceSelectionViewModel();
    vm.spaces.Value = [
      {
        id: 1,
        name: "test",
        isAvailable: false,
        isCompleted: false,
      } as LearningSpaceSelectionLearningSpaceData,
    ];
    const controllerMock = mock<ILearningSpaceSelectionController>();

    const container = render(
      <Provider container={CoreDIContainer}>
        <LearningSpaceSelectionList
          controller={controllerMock}
          viewModel={vm}
        />
      </Provider>
    );

    // click on the first row
    container.getByRole("button").click();

    expect(controllerMock.onLearningSpaceClicked).toBeCalledWith(1);
  });

  test("should render uncompleted room buttons without issues.", () => {
    const vm = new LearningSpaceSelectionViewModel();
    vm.spaces.Value = [
      {
        id: 1,
        name: "test",
        isAvailable: true,
        isCompleted: false,
      } as LearningSpaceSelectionLearningSpaceData,
    ];
    const controllerMock = mock<ILearningSpaceSelectionController>();

    render(
      <Provider container={CoreDIContainer}>
        <LearningSpaceSelectionList
          controller={controllerMock}
          viewModel={vm}
        />
      </Provider>
    );
  });

  test("should render uncompleted, unavailable room buttons without issues.", () => {
    const vm = new LearningSpaceSelectionViewModel();
    vm.spaces.Value = [
      {
        id: 1,
        name: "test",
        isAvailable: false,
        isCompleted: false,
      } as LearningSpaceSelectionLearningSpaceData,
    ];
    const controllerMock = mock<ILearningSpaceSelectionController>();

    render(
      <Provider container={CoreDIContainer}>
        <LearningSpaceSelectionList
          viewModel={vm}
          controller={controllerMock}
        />
      </Provider>
    );
  });
});
