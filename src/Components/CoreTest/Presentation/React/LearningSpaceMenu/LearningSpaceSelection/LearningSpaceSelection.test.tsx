import { render } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import React from "react";
import ILearningSpaceSelectionController from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceSelection/ILearningSpaceSelectionController";
import LearningSpaceSelectionViewModel from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceSelection/LearningSpaceSelectionViewModel";
import LearningSpaceSelection from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceSelection/LearningSpaceSelection";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import IGetUserLocationUseCase from "../../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import ILoadLearningWorldUseCase from "../../../../../Core/Application/UseCases/LoadLearningWorld/ILoadLearningWorldUseCase";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

jest.mock(
  "~ReactComponents/LearningSpaceMenu/LearningSpaceSelection/Graph/LearningSpaceSelectionGraph",
  () => "GraphMock"
);
jest.mock(
  "~ReactComponents/LearningSpaceMenu/LearningSpaceSelection/List/LearningSpaceSelectionList",
  () => "ListMock"
);

const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();
const loadWorldUseCaseMock = mock<ILoadLearningWorldUseCase>();

const userLocationTO = {
  worldID: 1,
  spaceID: 42,
};

describe("LearningSpaceSelection", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase
    ).toConstantValue(getUserLocationUseCaseMock);
    CoreDIContainer.rebind(
      USECASE_TYPES.ILoadLearningWorldUseCase
    ).toConstantValue(loadWorldUseCaseMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should render", () => {
    const vm = new LearningSpaceSelectionViewModel();
    const controllerMock = mock<ILearningSpaceSelectionController>();
    useBuilderMock([vm, controllerMock]);

    getUserLocationUseCaseMock.execute.mockReturnValue(userLocationTO);

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <LearningSpaceSelection />
      </Provider>
    );
  });

  test("shouldn't render without controller", () => {
    const vm = new LearningSpaceSelectionViewModel();
    useBuilderMock([vm, undefined]);

    getUserLocationUseCaseMock.execute.mockReturnValue(userLocationTO);

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <LearningSpaceSelection />
      </Provider>
    );

    expect(container).toBeEmptyDOMElement();
  });

  test("shouldn't render without view model", () => {
    const controllerMock = mock<ILearningSpaceSelectionController>();
    useBuilderMock([undefined, controllerMock]);

    getUserLocationUseCaseMock.execute.mockReturnValue(userLocationTO);

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <LearningSpaceSelection />
      </Provider>
    );

    expect(container).toBeEmptyDOMElement();
  });

  test("calls GetUserLocationUseCase", () => {
    const vm = new LearningSpaceSelectionViewModel();
    const controllerMock = mock<ILearningSpaceSelectionController>();
    useBuilderMock([vm, controllerMock]);

    getUserLocationUseCaseMock.execute.mockReturnValue(userLocationTO);

    render(
      <Provider container={CoreDIContainer}>
        <LearningSpaceSelection />
      </Provider>
    );

    expect(getUserLocationUseCaseMock.execute).toBeCalledTimes(1);
  });

  test("calls LoadWorldUseCase with worldID from GetUserLocationUseCase", () => {
    const vm = new LearningSpaceSelectionViewModel();
    const controllerMock = mock<ILearningSpaceSelectionController>();
    useBuilderMock([vm, controllerMock]);

    getUserLocationUseCaseMock.execute.mockReturnValue(userLocationTO);

    render(
      <Provider container={CoreDIContainer}>
        <LearningSpaceSelection />
      </Provider>
    );

    expect(loadWorldUseCaseMock.executeAsync).toBeCalledTimes(1);
    expect(loadWorldUseCaseMock.executeAsync).toBeCalledWith({
      worldID: userLocationTO.worldID,
    });
  });
});
