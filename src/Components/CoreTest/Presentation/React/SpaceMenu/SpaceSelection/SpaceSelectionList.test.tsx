import { mock } from "jest-mock-extended";
import { render } from "@testing-library/react";
import SpaceSelectionViewModel, {
  SpaceSelectionSpaceData,
} from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/SpaceSelectionViewModel";
import React from "react";
import SpaceSelectionList from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/List/SpaceSelectionList";
import ISpaceSelectionController from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/ISpaceSelectionController";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import ICalculateSpaceScoreUseCase from "../../../../../Core/Application/UseCases/CalculateSpaceScore/ICalculateSpaceScoreUseCase";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

const calculateSpaceScoreUseCaseMock = mock<ICalculateSpaceScoreUseCase>();

describe("SpaceSelectionList", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<ICalculateSpaceScoreUseCase>(
      USECASE_TYPES.ICalculateSpaceScore
    ).toConstantValue(calculateSpaceScoreUseCaseMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should render and call controller on click on completed space", () => {
    const vm = new SpaceSelectionViewModel();
    vm.spaces.Value = [
      {
        id: 1,
        name: "test",
        isAvailable: true,
        isCompleted: true,
      } as SpaceSelectionSpaceData,
    ];
    const controllerMock = mock<ISpaceSelectionController>();

    const container = render(
      <Provider container={CoreDIContainer}>
        <SpaceSelectionList controller={controllerMock} viewModel={vm} />
      </Provider>
    );

    // click on the first row
    container.getByRole("button").click();

    expect(controllerMock.onSpaceClicked).toBeCalledWith(1);
  });
  test("should render and call controller on click on available space", () => {
    const vm = new SpaceSelectionViewModel();
    vm.spaces.Value = [
      {
        id: 1,
        name: "test",
        isAvailable: true,
        isCompleted: false,
      } as SpaceSelectionSpaceData,
    ];
    const controllerMock = mock<ISpaceSelectionController>();

    const container = render(
      <Provider container={CoreDIContainer}>
        <SpaceSelectionList controller={controllerMock} viewModel={vm} />
      </Provider>
    );

    // click on the first row
    container.getByRole("button").click();

    expect(controllerMock.onSpaceClicked).toBeCalledWith(1);
  });
  test("should render and call controller on click on unavailable space", () => {
    const vm = new SpaceSelectionViewModel();
    vm.spaces.Value = [
      {
        id: 1,
        name: "test",
        isAvailable: false,
        isCompleted: false,
      } as SpaceSelectionSpaceData,
    ];
    const controllerMock = mock<ISpaceSelectionController>();

    const container = render(
      <Provider container={CoreDIContainer}>
        <SpaceSelectionList controller={controllerMock} viewModel={vm} />
      </Provider>
    );

    // click on the first row
    container.getByRole("button").click();

    expect(controllerMock.onSpaceClicked).toBeCalledWith(1);
  });

  test("should render uncompleted room buttons without issues.", () => {
    const vm = new SpaceSelectionViewModel();
    vm.spaces.Value = [
      {
        id: 1,
        name: "test",
        isAvailable: true,
        isCompleted: false,
      } as SpaceSelectionSpaceData,
    ];
    const controllerMock = mock<ISpaceSelectionController>();

    render(
      <Provider container={CoreDIContainer}>
        <SpaceSelectionList controller={controllerMock} viewModel={vm} />
      </Provider>
    );
  });

  test("should render uncompleted, unavailable room buttons without issues.", () => {
    const vm = new SpaceSelectionViewModel();
    vm.spaces.Value = [
      {
        id: 1,
        name: "test",
        isAvailable: false,
        isCompleted: false,
      } as SpaceSelectionSpaceData,
    ];
    const controllerMock = mock<ISpaceSelectionController>();

    render(
      <Provider container={CoreDIContainer}>
        <SpaceSelectionList viewModel={vm} controller={controllerMock} />
      </Provider>
    );
  });
});
