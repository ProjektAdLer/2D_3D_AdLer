import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import LoadLearningWorldButtonBuilder from "../../../../Core/Presentation/React/LoadLearningWorldButton/LoadLearningWorldButtonBuilder";
import LoadLearningWorldButtonController from "../../../../Core/Presentation/React/LoadLearningWorldButton/LoadLearningWorldButtonController";
import LoadLearningWorldButtonPresenter from "../../../../Core/Presentation/React/LoadLearningWorldButton/LoadLearningWorldButtonPresenter";
import LoadLearningWorldButtonViewModel from "../../../../Core/Presentation/React/LoadLearningWorldButton/LoadLearningWorldButtonViewModel";
import IViewModelControllerProvider from "../../../../Core/Presentation/ViewModelProvider/IViewModelControllerProvider";

const viewModelControllerProviderMock = mock<IViewModelControllerProvider>();

describe("LoadLearningWorldButtonBuilder", () => {
  let systemUnderTest: LoadLearningWorldButtonBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(
      CORE_TYPES.IViewModelControllerProvider
    ).toConstantValue(viewModelControllerProviderMock);
  });

  beforeEach(() => {
    systemUnderTest = new LoadLearningWorldButtonBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildController builds the controller and registers it and the viewModel with the VMCProvider", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["controller"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeInstanceOf(
      LoadLearningWorldButtonController
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledTimes(
      1
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledWith(
      systemUnderTest["viewModel"],
      systemUnderTest["controller"],
      LoadLearningWorldButtonViewModel
    );
  });

  test("buildPresenter builds the presenter", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      LoadLearningWorldButtonPresenter
    );
  });
});
