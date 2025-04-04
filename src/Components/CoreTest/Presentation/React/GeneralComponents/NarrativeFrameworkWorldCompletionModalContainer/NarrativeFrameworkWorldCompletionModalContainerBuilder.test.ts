import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "../../../../../Core/DependencyInjection/Presentation/PRESENTATION_TYPES";
import NarrativeFrameworkWorldCompletionModalContainerBuilder from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkWorldCompletionModalContainer/NarrativeFrameworkWorldCompletionModalContainerBuilder";
import INarrativeFrameworkWorldCompletionModalContainerPresenter from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkWorldCompletionModalContainer/INarrativeFrameworkWorldCompletionModalContainerPresenter";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import IGetNarrativeFrameworkInfoUseCase from "../../../../../Core/Application/UseCases/GetNarrativeFrameworkInfo/IGetNarrativeFrameworkInfoUseCase";

let mockUseCase = mock<IGetNarrativeFrameworkInfoUseCase>();
describe("NarrativeFrameworkWorldCompletionModalContainerBuilder", () => {
  let systemUnderTest: NarrativeFrameworkWorldCompletionModalContainerBuilder;

  beforeEach(() => {
    systemUnderTest =
      new NarrativeFrameworkWorldCompletionModalContainerBuilder();
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
        PRESENTATION_TYPES.INarrativeFrameworkWorldCompletionModalContainerPresenter,
      ),
    ).toBe(true);
    expect(
      CoreDIContainer.get(
        PRESENTATION_TYPES.INarrativeFrameworkWorldCompletionModalContainerPresenter,
      ),
    ).toBe(systemUnderTest.getPresenter()!);
  });
  test("buildPresenter unbinds the presenter if it is already bound", () => {
    CoreDIContainer.bind(
      PRESENTATION_TYPES.INarrativeFrameworkWorldCompletionModalContainerPresenter,
    ).toConstantValue(
      mock<INarrativeFrameworkWorldCompletionModalContainerPresenter>,
    );

    const unbindSpy = jest.spyOn(CoreDIContainer, "unbind");

    systemUnderTest.buildViewModel();
    systemUnderTest.buildPresenter();

    expect(unbindSpy).toHaveBeenCalledTimes(1);
  });
});
