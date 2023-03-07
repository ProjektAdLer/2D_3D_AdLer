import { mock } from "jest-mock-extended";
import ILoadElementUseCase from "../../../../../Core/Application/UseCases/LoadElement/ILoadElementUseCase";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import ElementsDropdownController from "../../../../../Core/Presentation/React/SpaceDisplay/ElementsDropdown/ElementsDropdownController";

const useCaseMock = mock<ILoadElementUseCase>();

describe("ElementsDropdownController", () => {
  let systemUnderTest: ElementsDropdownController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.unbindAll();
    CoreDIContainer.bind(USECASE_TYPES.ILoadElementUseCase).toConstantValue(
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

    expect(useCaseMock.executeAsync).toHaveBeenCalledTimes(1);
    expect(useCaseMock.executeAsync).toHaveBeenCalledWith(1337);
  });
});
