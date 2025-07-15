import { mock } from "jest-mock-extended";
import { fireEvent, render } from "@testing-library/react";
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
      USECASE_TYPES.ICalculateLearningSpaceScoreUseCase,
    ).toConstantValue(calculateSpaceScoreUseCaseMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  // ANF-ID: [EWE0024, EWE0025]
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
      </Provider>,
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
      </Provider>,
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
      </Provider>,
    );

    // click on the first row
    container.getByRole("button").click();

    expect(controllerMock.onLearningSpaceClicked).toBeCalledWith(1);
  });

  test("should render and call controller on doubleclick on available space", () => {
    const vm = new LearningSpaceSelectionViewModel();
    vm.spaces.Value = [
      {
        id: 2,
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
      </Provider>,
    );

    fireEvent.doubleClick(container.getByRole("button"));

    expect(controllerMock.onLearningSpaceDoubleClicked).toBeCalledWith(2, true);
  });

  test("should render and call controller on doubleclick on unavailable space", () => {
    const vm = new LearningSpaceSelectionViewModel();
    vm.spaces.Value = [
      {
        id: 2,
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
      </Provider>,
    );

    fireEvent.doubleClick(container.getByRole("button"));

    expect(controllerMock.onLearningSpaceDoubleClicked).toBeCalledWith(
      2,
      false,
    );
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
      </Provider>,
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
      </Provider>,
    );
  });

  test("scrolls to selected learning Space after list is rendered", () => {
    Element.prototype.scrollIntoView = jest.fn();

    const vm = new LearningSpaceSelectionViewModel();
    vm.spaces.Value = [
      {
        id: 1,
        name: "test",
        isAvailable: true,
        isCompleted: true,
      } as LearningSpaceSelectionLearningSpaceData,
      {
        id: 2,
        name: "test",
        isAvailable: true,
        isCompleted: false,
      } as LearningSpaceSelectionLearningSpaceData,
      {
        id: 3,
        name: "test",
        isAvailable: false,
        isCompleted: false,
      } as LearningSpaceSelectionLearningSpaceData,
      {
        id: 4,
        name: "test",
        isAvailable: false,
        isCompleted: false,
      } as LearningSpaceSelectionLearningSpaceData,
    ];

    vm.selectedSpaceID.Value = 3;
    const controllerMock = mock<ILearningSpaceSelectionController>();

    render(
      <Provider container={CoreDIContainer}>
        <LearningSpaceSelectionList
          viewModel={vm}
          controller={controllerMock}
        />
      </Provider>,
    );

    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });
});
