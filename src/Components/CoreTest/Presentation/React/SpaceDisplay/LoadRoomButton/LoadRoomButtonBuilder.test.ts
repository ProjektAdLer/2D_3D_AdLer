import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import LoadRoomButtonBuilder from "../../../../../Core/Presentation/React/LearningRoomDisplay/LoadRoomButton/LoadRoomButtonBuilder";
import LoadRoomButtonController from "../../../../../Core/Presentation/React/LearningRoomDisplay/LoadRoomButton/LoadRoomButtonController";
import LoadRoomButtonPresenter from "../../../../../Core/Presentation/React/LearningRoomDisplay/LoadRoomButton/LoadRoomButtonPresenter";
import LoadRoomButtonViewModel from "../../../../../Core/Presentation/React/LearningRoomDisplay/LoadRoomButton/LoadRoomButtonViewModel";
import IViewModelControllerProvider from "../../../../../Core/Presentation/ViewModelProvider/IViewModelControllerProvider";

const viewModelControllerProviderMock = mock<IViewModelControllerProvider>();

describe("LoadRoomButtonBuilder", () => {
  let systemUnderTest: LoadRoomButtonBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(
      CORE_TYPES.IViewModelControllerProvider
    ).toConstantValue(viewModelControllerProviderMock);
  });

  beforeEach(() => {
    systemUnderTest = new LoadRoomButtonBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildController builds the controller and registers it and the viewModel with the VMCProvider", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["controller"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeInstanceOf(
      LoadRoomButtonController
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledTimes(
      1
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledWith(
      systemUnderTest["viewModel"],
      systemUnderTest["controller"],
      LoadRoomButtonViewModel
    );
  });

  test("buildPresenter builds the presenter", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      LoadRoomButtonPresenter
    );
  });
});
