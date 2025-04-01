import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import NarrativeFrameworkLoadingScreenContainerBuilder from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkLoadingScreenContainer/NarrativeFrameworkLoadingScreenContainerBuilder";
import INarrativeFrameworkLoadingScreenContainerPresenter from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkLoadingScreenContainer/INarrativeFrameworkLoadingScreenContainerPresenter";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IGetNarrativeFrameworkInfoUseCase from "../../../../../Core/Application/UseCases/GetNarrativeFrameworkInfo/IGetNarrativeFrameworkInfoUseCase";

let mockUseCase = mock<IGetNarrativeFrameworkInfoUseCase>();
describe("NarrativeFrameworkLoadingScreenContainerBuilder", () => {
  let systemUnderTest: NarrativeFrameworkLoadingScreenContainerBuilder;
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetNarrativeFrameworkInfoUseCase,
    ).toConstantValue(mockUseCase);
  });
  beforeEach(() => {
    systemUnderTest = new NarrativeFrameworkLoadingScreenContainerBuilder();
  });
  afterAll(() => {
    CoreDIContainer.restore();
  });
  test("builder does its job of building the mvc construct", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();

    expect(systemUnderTest["viewModel"]).toBeDefined();
    expect(systemUnderTest["controller"]).toBeDefined();
  });
  test("buildPresenter registers presenter with the CoreDIContainer", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(
      CoreDIContainer.isBound(
        PRESENTATION_TYPES.INarrativeFrameworkLoadingScreenContainerPresenter,
      ),
    ).toBe(true);
    expect(
      CoreDIContainer.get(
        PRESENTATION_TYPES.INarrativeFrameworkLoadingScreenContainerPresenter,
      ),
    ).toBe(systemUnderTest.getPresenter()!);
  });
  test("buildPresenter unbinds the presenter if it is already bound", () => {
    CoreDIContainer.bind(
      PRESENTATION_TYPES.INarrativeFrameworkLoadingScreenContainerPresenter,
    ).toConstantValue(mock<INarrativeFrameworkLoadingScreenContainerPresenter>);

    const unbindSpy = jest.spyOn(CoreDIContainer, "unbind");

    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(unbindSpy).toHaveBeenCalledTimes(1);
  });
});
