import { mock } from "jest-mock-extended";
import ILoadLearningElementUseCase from "../../../../../Core/Application/UseCases/LoadLearningElement/ILoadLearningElementUseCase";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import LearningElementsDropdownController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningElementsDropdown/LearningElementsDropdownController";

const useCaseMock = mock<ILoadLearningElementUseCase>();

describe("LearningElementsDropdownController", () => {
  let systemUnderTest: LearningElementsDropdownController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.unbindAll();
    CoreDIContainer.bind(
      USECASE_TYPES.ILoadLearningElementUseCase
    ).toConstantValue(useCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = new LearningElementsDropdownController();
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should call the startElement UseCase", () => {
    systemUnderTest.startLearningElement(1337);

    expect(useCaseMock.executeAsync).toHaveBeenCalledTimes(1);
    expect(useCaseMock.executeAsync).toHaveBeenCalledWith(1337);
  });
});
