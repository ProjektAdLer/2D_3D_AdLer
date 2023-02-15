import { mock, mockDeep } from "jest-mock-extended";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import { render } from "@testing-library/react";
import SpaceSelectionViewModel, {
  SpaceSelectionSpaceData,
} from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/SpaceSelectionViewModel";
import React from "react";
import SpaceSelection from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/SpaceSelection";
import ISpaceSelectionController from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/ISpaceSelectionController";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import ILoadWorldUseCase from "../../../../../Core/Application/UseCases/LoadWorld/ILoadWorldUseCase";
import ICalculateSpaceScoreUseCase from "../../../../../Core/Application/UseCases/CalculateSpaceScore/ICalculateSpaceScoreUseCase";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IGetCurrentUserLocationUseCase from "../../../../../Core/Application/UseCases/GetCurrentUserLocation/IGetCurrentUserLocationUseCase";

const loadWorldUseCaseMock = mock<ILoadWorldUseCase>();
const calculateSpaceScoreUseCaseMock = mock<ICalculateSpaceScoreUseCase>();
const getCurrentUserLocationUseCaseMock =
  mock<IGetCurrentUserLocationUseCase>();

const getCurrentUserLocationUseCaseReturnValue = {
  worldID: 1,
  spaceID: undefined,
};

describe("SpaceSelection", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind<ILoadWorldUseCase>(
      USECASE_TYPES.ILoadWorldUseCase
    ).toConstantValue(loadWorldUseCaseMock);
    CoreDIContainer.rebind<ICalculateSpaceScoreUseCase>(
      USECASE_TYPES.ICalculateSpaceScore
    ).toConstantValue(calculateSpaceScoreUseCaseMock);
    CoreDIContainer.rebind<IGetCurrentUserLocationUseCase>(
      USECASE_TYPES.IGetCurrentUserLocationUseCase
    ).toConstantValue(getCurrentUserLocationUseCaseMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should render and call controller on click", () => {
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
    useBuilderMock([vm, controllerMock]);

    getCurrentUserLocationUseCaseMock.execute.mockReturnValue(
      getCurrentUserLocationUseCaseReturnValue
    );

    const container = render(
      <Provider container={CoreDIContainer}>
        <SpaceSelection />
      </Provider>
    );

    // click on the first row
    container.getByRole("button").click();

    expect(controllerMock.onSpaceRowClicked).toBeCalledWith(1);
  });

  test("doesn't render without controller", () => {
    useBuilderMock([mockDeep<SpaceSelectionViewModel>(), undefined]);

    getCurrentUserLocationUseCaseMock.execute.mockReturnValue(
      getCurrentUserLocationUseCaseReturnValue
    );

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <SpaceSelection />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, mock<ISpaceSelectionController>()]);

    getCurrentUserLocationUseCaseMock.execute.mockReturnValue(
      getCurrentUserLocationUseCaseReturnValue
    );

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <SpaceSelection />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
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
    useBuilderMock([vm, controllerMock]);

    getCurrentUserLocationUseCaseMock.execute.mockReturnValue(
      getCurrentUserLocationUseCaseReturnValue
    );

    render(
      <Provider container={CoreDIContainer}>
        <SpaceSelection />
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
    useBuilderMock([vm, controllerMock]);

    getCurrentUserLocationUseCaseMock.execute.mockReturnValue(
      getCurrentUserLocationUseCaseReturnValue
    );

    render(
      <Provider container={CoreDIContainer}>
        <SpaceSelection />
      </Provider>
    );
  });
});
