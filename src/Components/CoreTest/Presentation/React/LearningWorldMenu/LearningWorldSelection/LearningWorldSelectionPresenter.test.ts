import { mock } from "jest-mock-extended";
import UserInitialLearningWorldsInfoTO from "../../../../../Core/Application/DataTransferObjects/UserInitialLearningWorldsInfoTO";
import UserLearningWorldsInfoTO from "../../../../../Core/Application/DataTransferObjects/UserLearningWorldsInfoTO";
import LearningWorldSelectionPresenter from "../../../../../Core/Presentation/React/LearningWorldMenu/LearningWorldSelection/LearningWorldSelectionPresenter";
import LearningWorldSelectionViewModel from "../../../../../Core/Presentation/React/LearningWorldMenu/LearningWorldSelection/LearningWorldSelectionViewModel";
import ILoadLearningWorldUseCase from "../../../../../Core/Application/UseCases/LoadLearningWorld/ILoadLearningWorldUseCase";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

const loadWorldUseCaseMock = mock<ILoadLearningWorldUseCase>();

describe("LearningWorldSelectionPresenter", () => {
  let systemUnderTest: LearningWorldSelectionPresenter;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.ILoadLearningWorldUseCase
    ).toConstantValue(loadWorldUseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = new LearningWorldSelectionPresenter(
      new LearningWorldSelectionViewModel()
    );
  });
  test("onUserInitialLearningWorldsInfoLoaded should set the correct values in the vm", () => {
    const userWorlds: UserInitialLearningWorldsInfoTO = {
      worldInfo: [
        { worldID: 1, worldName: "Test World 1" },
        { worldID: 2, worldName: "Test World 2" },
      ],
    };
    systemUnderTest.onUserInitialLearningWorldsInfoLoaded(userWorlds);
    expect(systemUnderTest["viewModel"].userWorlds.Value).toEqual([
      { id: 1, name: "Test World 1", isCompleted: false },
      { id: 2, name: "Test World 2", isCompleted: false },
    ]);
  });
  test("onUserLearningWorldsInfoLoaded should set the correct values in the vm", () => {
    const userWorlds: UserLearningWorldsInfoTO = {
      worldInfo: [
        { worldID: 1, worldName: "Test World 1", isCompleted: false },
        { worldID: 2, worldName: "Test World 2", isCompleted: true },
      ],
    };
    systemUnderTest.onUserLearningWorldsInfoLoaded(userWorlds);
    expect(systemUnderTest["viewModel"].userWorlds.Value).toEqual([
      { id: 1, name: "Test World 1", isCompleted: false },
      { id: 2, name: "Test World 2", isCompleted: true },
    ]);
  });
});
