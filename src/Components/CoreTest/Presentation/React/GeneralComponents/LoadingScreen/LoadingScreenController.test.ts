import { mock } from "jest-mock-extended";
import LoadingScreenController from "../../../../../Core/Presentation/React/GeneralComponents/LoadingScreen/LoadingScreenController";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import LoadingScreenViewModel from "../../../../../Core/Presentation/React/GeneralComponents/LoadingScreen/LoadingScreenViewModel";
import IBeginStoryElementIntroCutSceneUseCase from "../../../../../Core/Application/UseCases/BeginStoryElementIntroCutScene/BeginStoryElementIntroCutSceneUseCase";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

const beginStoryElementIntroCutSceneUseCaseMock =
  mock<IBeginStoryElementIntroCutSceneUseCase>();

describe("LoadingScreenController", () => {
  let systemUnderTest: LoadingScreenController;
  let viewModel: LoadingScreenViewModel;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(
      USECASE_TYPES.IBeginStoryElementIntroCutSceneUseCase
    ).toConstantValue(beginStoryElementIntroCutSceneUseCaseMock);
  });

  beforeEach(() => {
    viewModel = new LoadingScreenViewModel();
    systemUnderTest = new LoadingScreenController(viewModel);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("closeLoadingScreen should set viewModel Data accordingly", () => {
    systemUnderTest.closeLoadingScreen();
    expect(viewModel.isOpen.Value).toBe(false);
  });

  //ANF-ID: [EWE0036]
  test("closeLoadingScreen calls beginStoryElementIntroCutSceneUseCase when loadingLocation is spacedisplay", () => {
    viewModel.loadingLocation.Value = "spacedisplay";

    systemUnderTest.closeLoadingScreen();

    expect(
      beginStoryElementIntroCutSceneUseCaseMock.execute
    ).toHaveBeenCalledTimes(1);
  });
});
