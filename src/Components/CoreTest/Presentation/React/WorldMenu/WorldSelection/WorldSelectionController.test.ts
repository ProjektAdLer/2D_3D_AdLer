import WorldSelectionController from "../../../../../Core/Presentation/React/WorldMenu/WorldSelection/WorldSelectionController";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";

import { mock } from "jest-mock-extended";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import ILoadWorldUseCase from "../../../../../Core/Application/UseCases/LoadWorld/ILoadWorldUseCase";
import WorldSelectionViewModel from "../../../../../Core/Presentation/React/WorldMenu/WorldSelection/WorldSelectionViewModel";

jest.mock("src/Lib/Logger");

const viewModel = new WorldSelectionViewModel();

describe("WorldSelectionController", () => {
  let systemUnderTest: WorldSelectionController;

  beforeEach(() => {
    systemUnderTest = new WorldSelectionController(viewModel);
  });

  test("onWorldRowClicked sets the correct selectedRowID in the viewmodel", () => {
    systemUnderTest.onWorldRowClicked(420);

    expect(viewModel.selectedRowID.Value).toBe(420);
  });
});
