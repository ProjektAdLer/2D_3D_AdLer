import { render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import React from "react";
import ISpaceSelectionController from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/ISpaceSelectionController";
import SpaceSelectionViewModel from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/SpaceSelectionViewModel";
import SpaceSelection from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/SpaceSelection";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import IGetCurrentUserLocationUseCase from "../../../../../Core/Application/UseCases/GetCurrentUserLocation/IGetCurrentUserLocationUseCase";
import ILoadWorldUseCase from "../../../../../Core/Application/UseCases/LoadWorld/ILoadWorldUseCase";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

jest.mock(
  "~ReactComponents/SpaceMenu/SpaceSelection/Graph/SpaceSelectionGraph",
  () => "GraphMock"
);
jest.mock(
  "~ReactComponents/SpaceMenu/SpaceSelection/List/SpaceSelectionList",
  () => "ListMock"
);

const getCurrentUserLocationUseCaseMock =
  mock<IGetCurrentUserLocationUseCase>();
const loadWorldUseCaseMock = mock<ILoadWorldUseCase>();

const userLocationTO = {
  worldID: 1,
  spaceID: 42,
};

describe("SpaceSelection", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetCurrentUserLocationUseCase
    ).toConstantValue(getCurrentUserLocationUseCaseMock);
    CoreDIContainer.rebind(USECASE_TYPES.ILoadWorldUseCase).toConstantValue(
      loadWorldUseCaseMock
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should render", () => {
    const vm = new SpaceSelectionViewModel();
    const controllerMock = mock<ISpaceSelectionController>();
    useBuilderMock([vm, controllerMock]);

    getCurrentUserLocationUseCaseMock.execute.mockReturnValue(userLocationTO);

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <SpaceSelection />
      </Provider>
    );
  });

  test("shouldn't render without controller", () => {
    const vm = new SpaceSelectionViewModel();
    useBuilderMock([vm, undefined]);

    getCurrentUserLocationUseCaseMock.execute.mockReturnValue(userLocationTO);

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <SpaceSelection />
      </Provider>
    );

    expect(container).toBeEmptyDOMElement();
  });

  test("shouldn't render without view model", () => {
    const controllerMock = mock<ISpaceSelectionController>();
    useBuilderMock([undefined, controllerMock]);

    getCurrentUserLocationUseCaseMock.execute.mockReturnValue(userLocationTO);

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <SpaceSelection />
      </Provider>
    );

    expect(container).toBeEmptyDOMElement();
  });

  test("calls GetCurrentUserLocationUseCase", () => {
    const vm = new SpaceSelectionViewModel();
    const controllerMock = mock<ISpaceSelectionController>();
    useBuilderMock([vm, controllerMock]);

    getCurrentUserLocationUseCaseMock.execute.mockReturnValue(userLocationTO);

    render(
      <Provider container={CoreDIContainer}>
        <SpaceSelection />
      </Provider>
    );

    expect(getCurrentUserLocationUseCaseMock.execute).toBeCalledTimes(1);
  });

  test("calls LoadWorldUseCase with worldID from GetCurrentUserLocationUseCase", () => {
    const vm = new SpaceSelectionViewModel();
    const controllerMock = mock<ISpaceSelectionController>();
    useBuilderMock([vm, controllerMock]);

    getCurrentUserLocationUseCaseMock.execute.mockReturnValue(userLocationTO);

    render(
      <Provider container={CoreDIContainer}>
        <SpaceSelection />
      </Provider>
    );

    expect(loadWorldUseCaseMock.executeAsync).toBeCalledTimes(1);
    expect(loadWorldUseCaseMock.executeAsync).toBeCalledWith({
      worldID: userLocationTO.worldID,
    });
  });
});
