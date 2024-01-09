import LearningWorldCompletionModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModalViewModel";
import LearningWorldCompletionModalController from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModalController";
import { mock } from "jest-mock-extended";
import ISetWorldCompletionModalToShownUseCase from "../../../../../Core/Application/UseCases/SetWorldCompletionModalToShown/ISetWorldCompletionModalToShownUseCase";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

const setWorldCompletionModalToShownMock =
  mock<ISetWorldCompletionModalToShownUseCase>();

describe("LearningWorldCompletionModal", () => {
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.ISetWorldCompletionModalToShownUseCase
    ).toConstantValue(setWorldCompletionModalToShownMock);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });
  test("should set its clicked state in the ViewModel", () => {
    const viewModel = new LearningWorldCompletionModalViewModel();
    const controller = new LearningWorldCompletionModalController(viewModel);
    controller.CloseButtonClicked();
    expect(viewModel.showModal.Value).toBeFalsy();
  });
});
