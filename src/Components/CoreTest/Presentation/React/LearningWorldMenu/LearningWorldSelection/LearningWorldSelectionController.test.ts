import { mock } from "jest-mock-extended";
import ILoadLearningWorldUseCase from "../../../../../Core/Application/UseCases/LoadLearningWorld/ILoadLearningWorldUseCase";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import LearningWorldSelectionController from "../../../../../Core/Presentation/React/LearningWorldMenu/LearningWorldSelection/LearningWorldSelectionController";
import LearningWorldSelectionViewModel from "../../../../../Core/Presentation/React/LearningWorldMenu/LearningWorldSelection/LearningWorldSelectionViewModel";

jest.mock("src/Lib/Logger");

const viewModel = new LearningWorldSelectionViewModel();
const loadWorldUseCaseMock = mock<ILoadLearningWorldUseCase>();

describe("LearningWorldSelectionController", () => {
  let systemUnderTest: LearningWorldSelectionController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.ILoadLearningWorldUseCase
    ).toConstantValue(loadWorldUseCaseMock);
  });
  beforeEach(() => {
    systemUnderTest = new LearningWorldSelectionController(viewModel);
  });

  test("onLearningWorldRowClicked sets the correct selectedRowID in the viewmodel", () => {
    systemUnderTest.onLearningWorldRowClicked(420);

    expect(viewModel.selectedRowID.Value).toBe(420);
    expect(loadWorldUseCaseMock.executeAsync).toBeCalledWith({
      worldID: 420,
    });
  });
});
