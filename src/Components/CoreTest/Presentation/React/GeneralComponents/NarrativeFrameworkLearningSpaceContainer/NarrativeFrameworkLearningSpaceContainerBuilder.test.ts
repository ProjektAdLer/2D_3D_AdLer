import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import NarrativeFrameworkLearningSpaceContainerBuilder from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkLearningSpaceContainer/NarrativeFrameworkLearningSpaceContainerBuilder";
import INarrativeFrameworkLearningSpaceContainerPresenter from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkLearningSpaceContainer/INarrativeFrameworkLearningSpaceContainerPresenter";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IGetNarrativeFrameworkInfoUseCase from "../../../../../Core/Application/UseCases/GetNarrativeFrameworkInfo/IGetNarrativeFrameworkInfoUseCase";

let mockUseCase = mock<IGetNarrativeFrameworkInfoUseCase>();
describe("NarrativeFrameworkLearningSpaceContainerBuilder", () => {
  let systemUnderTest: NarrativeFrameworkLearningSpaceContainerBuilder;
  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetNarrativeFrameworkInfoUseCase,
    ).toConstantValue(mockUseCase);
  });
  beforeEach(() => {
    systemUnderTest = new NarrativeFrameworkLearningSpaceContainerBuilder();
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
        PRESENTATION_TYPES.INarrativeFrameworkLearningSpaceContainerPresenter,
      ),
    ).toBe(true);
    expect(
      CoreDIContainer.get(
        PRESENTATION_TYPES.INarrativeFrameworkLearningSpaceContainerPresenter,
      ),
    ).toBe(systemUnderTest.getPresenter()!);
  });
  test("buildPresenter unbinds the presenter if it is already bound", () => {
    CoreDIContainer.bind(
      PRESENTATION_TYPES.INarrativeFrameworkLearningSpaceContainerPresenter,
    ).toConstantValue(mock<INarrativeFrameworkLearningSpaceContainerPresenter>);

    const unbindSpy = jest.spyOn(CoreDIContainer, "unbind");

    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(unbindSpy).toHaveBeenCalledTimes(1);
  });
});
