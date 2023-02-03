import { mock, mockDeep } from "jest-mock-extended";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import { render } from "@testing-library/react";
import WorldSelectionViewModel, {
  WorldSelectionWorldData,
} from "../../../../../Core/Presentation/React/WorldMenu/WorldSelection/WorldSelectionViewModel";
import React from "react";
import WorldSelection from "../../../../../Core/Presentation/React/WorldMenu/WorldSelection/WorldSelection";
import IWorldSelectionController from "../../../../../Core/Presentation/React/WorldMenu/WorldSelection/IWorldSelectionController";
import { Provider } from "inversify-react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";

describe("WorldSelection", () => {
  test("should render and call controller on click", () => {
    const vm = new WorldSelectionViewModel();
    vm.worlds.Value = [
      {
        id: 1,
        title: "test",
        isCompleted: true,
      } as WorldSelectionWorldData,
    ];

    const controllerMock = mock<IWorldSelectionController>();
    useBuilderMock([vm, controllerMock]);
    const container = render(
      <Provider container={CoreDIContainer}>
        <WorldSelection />
      </Provider>
    );

    // click on the first row
    container.getByRole("button").click();

    expect(controllerMock.onWorldRowClicked).toBeCalledWith(1);
  });

  test("doesn't render without controller", () => {
    useBuilderMock([mockDeep<WorldSelectionViewModel>(), undefined]);

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <WorldSelection />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, mock<IWorldSelectionController>()]);

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <WorldSelection />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  test("should render uncompleted room buttons without issues", () => {
    const vm = new WorldSelectionViewModel();
    vm.worlds.Value = [
      {
        id: 1,
        title: "test",
        isCompleted: false,
      } as WorldSelectionWorldData,
    ];
    const controllerMock = mock<IWorldSelectionController>();
    useBuilderMock([vm, controllerMock]);

    render(
      <Provider container={CoreDIContainer}>
        <WorldSelection />
      </Provider>
    );
  });
});
