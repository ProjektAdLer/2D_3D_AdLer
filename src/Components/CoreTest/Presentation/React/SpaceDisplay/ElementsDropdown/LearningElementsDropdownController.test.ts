import { mock } from "jest-mock-extended";
import IElementStartedUseCase from "../../../../../Core/Application/UseCases/ElementStarted/IElementStartedUseCase";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import ElementsDropdownController from "../../../../../Core/Presentation/React/SpaceDisplay/ElementsDropdown/ElementsDropdownController";

const useCaseMock = mock<IElementStartedUseCase>();

describe("ElementsDropdownController", () => {
  let systemUnderTest: ElementsDropdownController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.unbindAll();
    CoreDIContainer.bind(USECASE_TYPES.IElementStartedUseCase).toConstantValue(
      useCaseMock
    );
  });

  beforeEach(() => {
    systemUnderTest = new ElementsDropdownController();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should call the startElement UseCase", () => {
    systemUnderTest.startElement(1337);
    expect(useCaseMock.execute).toHaveBeenCalledTimes(1);
    expect(useCaseMock.execute).toHaveBeenCalledWith({
      elementId: 1337,
    });
  });
});
