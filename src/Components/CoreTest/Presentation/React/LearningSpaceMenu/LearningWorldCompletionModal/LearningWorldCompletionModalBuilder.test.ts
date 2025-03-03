import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import ILearningWorldCompletionModalPresenter from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningWorldCompletionModal/ILearningWorldCompletionModalPresenter";
import LearningWorldCompletionModalBuilder from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModalBuilder";
import UserDataEntity from "../../../../../Core/Domain/Entities/UserDataEntity";
import IEntityContainer from "../../../../../Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import IGetLearningWorldUseCase from "../../../../../Core/Application/UseCases/GetLearningWorld/IGetLearningWorldUseCase";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

describe("LearningWorldCompletionModalBuilder", () => {
  let systemUnderTest: LearningWorldCompletionModalBuilder;

  beforeEach(() => {
    systemUnderTest = new LearningWorldCompletionModalBuilder();

    // Vorherige Bindings für IGetLearningWorldUseCase unbinden
    if (CoreDIContainer.isBound(USECASE_TYPES.IGetLearningWorldUseCase)) {
      CoreDIContainer.unbind(USECASE_TYPES.IGetLearningWorldUseCase);
    }

    // UserDataEntity hinzufügen
    const mockUserDataEntity = new UserDataEntity();
    mockUserDataEntity.isLoggedIn = true;
    const entityContainer = CoreDIContainer.get<IEntityContainer>(
      CORE_TYPES.IEntityContainer,
    );
    entityContainer.createEntity(mockUserDataEntity, UserDataEntity);

    // IGetLearningWorldUseCase mocken
    CoreDIContainer.bind<IGetLearningWorldUseCase>(
      USECASE_TYPES.IGetLearningWorldUseCase,
    ).toConstantValue({ execute: jest.fn() });
  });

  test("buildPresenter registers presenter with the CoreDIContainer", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(
      CoreDIContainer.isBound(
        PRESENTATION_TYPES.ILearningWorldCompletionModalPresenter,
      ),
    ).toBe(true);
    expect(
      CoreDIContainer.get(
        PRESENTATION_TYPES.ILearningWorldCompletionModalPresenter,
      ),
    ).toBe(systemUnderTest.getPresenter()!);
  });

  test("buildPresenter unbinds the presenter if it is already bound", () => {
    CoreDIContainer.bind(
      PRESENTATION_TYPES.ILearningWorldCompletionModalPresenter,
    ).toConstantValue(mock<ILearningWorldCompletionModalPresenter>);

    const unbindSpy = jest.spyOn(CoreDIContainer, "unbind");

    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(unbindSpy).toHaveBeenCalledTimes(1);
  });
});
