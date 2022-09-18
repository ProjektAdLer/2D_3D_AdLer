import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import FullscreenSwitchBuilder from "../../../../../Core/Presentation/React/SpaceDisplay/FullscreenSwitch/FullscreenSwitchBuilder";
import FullscreenSwitchController from "../../../../../Core/Presentation/React/SpaceDisplay/FullscreenSwitch/FullscreenSwitchController";
import FullscreenSwitchPresenter from "../../../../../Core/Presentation/React/SpaceDisplay/FullscreenSwitch/FullscreenSwitchPresenter";
import FullscreenSwitchViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/FullscreenSwitch/FullscreenSwitchViewModel";
import IViewModelControllerProvider from "../../../../../Core/Presentation/ViewModelProvider/IViewModelControllerProvider";

const viewModelControllerProviderMock = mock<IViewModelControllerProvider>();

describe("FullscreenSwitchBuilder", () => {
  let systemUnderTest: FullscreenSwitchBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(
      CORE_TYPES.IViewModelControllerProvider
    ).toConstantValue(viewModelControllerProviderMock);
  });

  beforeEach(() => {
    systemUnderTest = new FullscreenSwitchBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildController builds the controller and registers it and the viewModel with the VMCProvider", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["controller"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeInstanceOf(
      FullscreenSwitchController
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledTimes(
      1
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledWith(
      systemUnderTest["viewModel"],
      systemUnderTest["controller"],
      FullscreenSwitchViewModel
    );
  });

  test("buildPresenter builds the presenter", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      FullscreenSwitchPresenter
    );
  });
});
