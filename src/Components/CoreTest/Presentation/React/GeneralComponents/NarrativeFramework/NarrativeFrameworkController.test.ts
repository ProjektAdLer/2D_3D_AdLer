import { mock } from "jest-mock-extended";
import NarrativeFrameworkController from "../../../../../../Components/Core/Presentation/React/GeneralComponents/NarrativeFramework/NarrativeFrameworkController";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import NarrativeFrameworkViewModel from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFramework/NarrativeFrameworkViewModel";
import ISetNarrativeFrameworkToShownUseCase from "../../../../../Core/Application/UseCases/SetNarrativeFrameworkToShown/ISetNarrativeFrameworkToShownUseCase";

const setNarrativeFrameworkToShownMock =
  mock<ISetNarrativeFrameworkToShownUseCase>();

const viewModel = new NarrativeFrameworkViewModel();

describe("NarrativeFrameworkController", () => {
  let systemUnderTest: NarrativeFrameworkController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.rebind(
      USECASE_TYPES.ISetNarrativeFrameworkToShownUseCase,
    ).toConstantValue(setNarrativeFrameworkToShownMock);
  });
  beforeEach(() => {
    systemUnderTest = new NarrativeFrameworkController(viewModel);
  });
  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("closeNarrativeFramework sets open in viewmodel to false", () => {
    viewModel.isOpen.Value = true;
    systemUnderTest.closeNarrativeFramework();
    expect(viewModel.isOpen.Value).toBe(false);
  });
});
