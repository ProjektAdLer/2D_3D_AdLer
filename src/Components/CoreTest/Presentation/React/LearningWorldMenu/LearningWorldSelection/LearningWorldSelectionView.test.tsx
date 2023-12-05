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
import ILoadUserInitialLearningWorldsInfoUseCase from "../../../../../Core/Application/UseCases/LoadUserInitialLearningWorldsInfo/ILoadUserInitialLearningWorldsInfoUseCase";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

const loadUserInitialWorldsInfoUseCase =
  mock<ILoadUserInitialLearningWorldsInfoUseCase>();
describe("LearningWorldSelection", () => {
  beforeAll(() => {
    CoreDIContainer.unbindAll();

    CoreDIContainer.bind<ILoadUserInitialLearningWorldsInfoUseCase>(
      USECASE_TYPES.ILoadUserInitialLearningWorldsInfoUseCase
    ).toConstantValue(loadUserInitialWorldsInfoUseCase);
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
      </Provider>
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
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, mock<ILearningWorldSelectionController>()]);

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <LearningWorldSelection />
      </Provider>
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
      </Provider>
    );
  });
});
