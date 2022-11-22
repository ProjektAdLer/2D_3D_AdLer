import { mock, mockDeep } from "jest-mock-extended";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import { render } from "@testing-library/react";
import SpaceSelectionViewModel from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/SpaceSelectionViewModel";
import React from "react";
import SpaceSelection from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/SpaceSelection";
import ISpaceSelectionController from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/ISpaceSelectionController";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import ILoadWorldUseCase from "../../../../../Core/Application/UseCases/LoadWorld/ILoadWorldUseCase";
import ICalculateSpaceScoreUseCase from "../../../../../Core/Application/UseCases/CalculateSpaceScore/ICalculateSpaceScoreUseCase";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

const loadWorldUseCase = mock<ILoadWorldUseCase>();
const calculateSpaceScoreUseCase = mock<ICalculateSpaceScoreUseCase>();

describe("SpaceSelection", () => {
  beforeAll(() => {
    CoreDIContainer.unbindAll();

    CoreDIContainer.bind<ILoadWorldUseCase>(
      USECASE_TYPES.ILoadWorldUseCase
    ).toConstantValue(loadWorldUseCase);

    CoreDIContainer.bind<ICalculateSpaceScoreUseCase>(
      USECASE_TYPES.ICalculateSpaceScore
    ).toConstantValue(calculateSpaceScoreUseCase);
  });
  test("should render and call controller on click", () => {
    const vm = new SpaceSelectionViewModel();
    vm.spaces.Value = [[1, "test", true, true]];

    const controllerMock = mock<ISpaceSelectionController>();
    useBuilderMock([vm, controllerMock]);
    const container = render(
      <Provider container={CoreDIContainer}>
        <SpaceSelection />
      </Provider>
    );

    // click on the first row
    container.getByRole("button").click();
    expect(controllerMock.onSpaceRowClicked).toBeCalledWith(1);
  });

  test("doesn't render without controller, viewModel or Data", () => {
    useBuilderMock([mockDeep<SpaceSelectionViewModel>(), undefined]);
    const container = render(
      <Provider container={CoreDIContainer}>
        <SpaceSelection />
      </Provider>
    );

    const element = container.queryByText("Bitte warten, Welt wird geladen...");
    expect(element).not.toBeNull();
  });
  test("should render uncompleted room buttons without issues.", () => {
    const vm = new SpaceSelectionViewModel();
    vm.spaces.Value = [[1, "test", true, false]];
    const controllerMock = mock<ISpaceSelectionController>();
    useBuilderMock([vm, controllerMock]);
    render(
      <Provider container={CoreDIContainer}>
        <SpaceSelection />
      </Provider>
    );
  });
  test("should render uncompleted, unavailable room buttons without issues.", () => {
    const vm = new SpaceSelectionViewModel();
    vm.spaces.Value = [[1, "test", false, false]];
    const controllerMock = mock<ISpaceSelectionController>();
    useBuilderMock([vm, controllerMock]);
    render(
      <Provider container={CoreDIContainer}>
        <SpaceSelection />
      </Provider>
    );
  });
});
