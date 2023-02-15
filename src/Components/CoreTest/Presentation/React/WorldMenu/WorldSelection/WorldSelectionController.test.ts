import { mock } from "jest-mock-extended";
import ILoadWorldUseCase from "../../../../../Core/Application/UseCases/LoadWorld/ILoadWorldUseCase";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import WorldSelectionController from "../../../../../Core/Presentation/React/WorldMenu/WorldSelection/WorldSelectionController";
import WorldSelectionViewModel from "../../../../../Core/Presentation/React/WorldMenu/WorldSelection/WorldSelectionViewModel";

jest.mock("src/Lib/Logger");

const viewModel = new WorldSelectionViewModel();
const loadWorldUseCaseMock = mock<ILoadWorldUseCase>();

describe("WorldSelectionController", () => {
  let systemUnderTest: WorldSelectionController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(USECASE_TYPES.ILoadWorldUseCase).toConstantValue(
      loadWorldUseCaseMock
    );
  });
  beforeEach(() => {
    systemUnderTest = new WorldSelectionController(viewModel);
  });

  test("onWorldRowClicked sets the correct selectedRowID in the viewmodel", () => {
    systemUnderTest.onWorldRowClicked(420);

    expect(viewModel.selectedRowID.Value).toBe(420);
    expect(loadWorldUseCaseMock.executeAsync).toBeCalledWith({
      worldID: 420,
    });
  });
});
