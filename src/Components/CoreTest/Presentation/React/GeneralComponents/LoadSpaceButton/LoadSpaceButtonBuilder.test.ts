import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import LoadSpaceButtonBuilder from "../../../../../Core/Presentation/React/GeneralComponents/LoadSpaceButton/LoadSpaceButtonBuilder";
import LoadSpaceButtonController from "../../../../../Core/Presentation/React/GeneralComponents/LoadSpaceButton/LoadSpaceButtonController";
import LoadSpaceButtonPresenter from "../../../../../Core/Presentation/React/GeneralComponents/LoadSpaceButton/LoadSpaceButtonPresenter";
import LoadSpaceButtonViewModel from "../../../../../Core/Presentation/React/GeneralComponents/LoadSpaceButton/LoadSpaceButtonViewModel";
import IViewModelControllerProvider from "../../../../../Core/Presentation/ViewModelProvider/IViewModelControllerProvider";

const viewModelControllerProviderMock = mock<IViewModelControllerProvider>();

describe("LoadSpaceButtonBuilder", () => {
  let systemUnderTest: LoadSpaceButtonBuilder;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(
      CORE_TYPES.IViewModelControllerProvider
    ).toConstantValue(viewModelControllerProviderMock);
  });

  beforeEach(() => {
    systemUnderTest = new LoadSpaceButtonBuilder();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("buildController builds the controller and registers it and the viewModel with the VMCProvider", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["controller"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeInstanceOf(
      LoadSpaceButtonController
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledTimes(
      1
    );
    expect(viewModelControllerProviderMock.registerTupel).toHaveBeenCalledWith(
      systemUnderTest["viewModel"],
      systemUnderTest["controller"],
      LoadSpaceButtonViewModel
    );
  });

  test("buildPresenter builds the presenter", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(systemUnderTest["presenter"]).toBeDefined();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(
      LoadSpaceButtonPresenter
    );
  });
});
