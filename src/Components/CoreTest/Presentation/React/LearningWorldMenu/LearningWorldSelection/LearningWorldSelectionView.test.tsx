import { mock, mockDeep } from "jest-mock-extended";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import { render } from "@testing-library/react";
import LearningWorldSelectionViewModel, {
  LearningWorldSelectionLearningWorldData,
} from "../../../../../Core/Presentation/React/LearningWorldMenu/LearningWorldSelection/LearningWorldSelectionViewModel";
import React from "react";
import LearningWorldSelection from "../../../../../Core/Presentation/React/LearningWorldMenu/LearningWorldSelection/LearningWorldSelection";
import ILearningWorldSelectionController from "../../../../../Core/Presentation/React/LearningWorldMenu/LearningWorldSelection/ILearningWorldSelectionController";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import ILoadUserLearningWorldsInfoUseCase from "../../../../../Core/Application/UseCases/LoadUserLearningWorldsInfo/ILoadUserLearningWorldsInfoUseCase";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import ILoadingScreenPresenter from "../../../../../Core/Presentation/React/GeneralComponents/LoadingScreen/ILoadingScreenPresenter";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";

const loadUserLearningWorldsInfoUseCase =
  mock<ILoadUserLearningWorldsInfoUseCase>();
const loadingScreenPresenterMock = mock<ILoadingScreenPresenter>();

describe("LearningWorldSelection", () => {
  beforeAll(() => {
    CoreDIContainer.unbindAll();

    CoreDIContainer.bind<ILoadUserLearningWorldsInfoUseCase>(
      USECASE_TYPES.ILoadUserLearningWorldsInfoUseCase,
    ).toConstantValue(loadUserLearningWorldsInfoUseCase);
    CoreDIContainer.bind(
      PRESENTATION_TYPES.ILoadingScreenPresenter,
    ).toConstantValue(loadingScreenPresenterMock);
  });

  test("should render and call controller on click", () => {
    const vm = new LearningWorldSelectionViewModel();
    vm.userWorlds.Value = [
      {
        id: 1,
        name: "test",
        isCompleted: true,
      } as LearningWorldSelectionLearningWorldData,
    ];

    const controllerMock = mock<ILearningWorldSelectionController>();
    useBuilderMock([vm, controllerMock]);
    const container = render(
      <Provider container={CoreDIContainer}>
        <LearningWorldSelection />
      </Provider>,
    );

    // click on the first row
    container.getByRole("button").click();

    expect(controllerMock.onLearningWorldRowClicked).toBeCalledWith(1);
  });

  test("doesn't render without controller", () => {
    useBuilderMock([mockDeep<LearningWorldSelectionViewModel>(), undefined]);

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <LearningWorldSelection />
      </Provider>,
    );

    expect(container.firstChild).toBeNull();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, mock<ILearningWorldSelectionController>()]);

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <LearningWorldSelection />
      </Provider>,
    );

    expect(container.firstChild).toBeNull();
  });

  test("should render uncompleted room buttons without issues", () => {
    const vm = new LearningWorldSelectionViewModel();
    vm.userWorlds.Value = [
      {
        id: 1,
        name: "test",
        isCompleted: false,
      } as LearningWorldSelectionLearningWorldData,
    ];
    const controllerMock = mock<ILearningWorldSelectionController>();
    useBuilderMock([vm, controllerMock]);

    render(
      <Provider container={CoreDIContainer}>
        <LearningWorldSelection />
      </Provider>,
    );
  });

  test("scrolls to selectedWorldID after view is rendered", () => {
    Element.prototype.scrollIntoView = jest.fn();

    const vm = new LearningWorldSelectionViewModel();
    vm.selectedWorldID.Value = 3;
    vm.userWorlds.Value = [
      {
        id: 1,
        name: "world1",
        isCompleted: true,
      },
      {
        id: 2,
        name: "world2",
        isCompleted: true,
      },
      {
        id: 3,
        name: "world3",
        isCompleted: false,
      },
      {
        id: 4,
        name: "world4",
        isCompleted: false,
      },
    ];
    const controllerMock = mock<ILearningWorldSelectionController>();
    useBuilderMock([vm, controllerMock]);

    render(
      <Provider container={CoreDIContainer}>
        <LearningWorldSelection />
      </Provider>,
    );

    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });
});
