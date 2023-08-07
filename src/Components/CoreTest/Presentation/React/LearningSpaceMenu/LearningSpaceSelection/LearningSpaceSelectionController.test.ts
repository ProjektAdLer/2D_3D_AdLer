import LearningSpaceSelectionController from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceSelection/LearningSpaceSelectionController";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";

import { mock } from "jest-mock-extended";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import ILoadLearningSpaceUseCase from "../../../../../Core/Application/UseCases/LoadLearningSpace/ILoadLearningSpaceUseCase";
import LearningSpaceSelectionViewModel from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceSelection/LearningSpaceSelectionViewModel";

const loadSpaceUseCaseMock = mock<ILoadLearningSpaceUseCase>();

const viewModel = new LearningSpaceSelectionViewModel();

describe("SpaceSelectionController", () => {
  let systemUnderTest: LearningSpaceSelectionController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.ILoadLearningSpaceUseCase
    ).toConstantValue(loadSpaceUseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = new LearningSpaceSelectionController(viewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("onSpaceRowClicked calls LoadSpaceUseCase", () => {
    viewModel.worldID.Value = 1;

    systemUnderTest.onLearningSpaceClicked(42);

    expect(loadSpaceUseCaseMock.executeAsync).toBeCalledWith({
      spaceID: 42,
      worldID: 1,
    });
  });
});
