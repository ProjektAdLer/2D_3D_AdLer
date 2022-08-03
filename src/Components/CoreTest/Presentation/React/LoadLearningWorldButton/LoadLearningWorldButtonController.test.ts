import { mock } from "jest-mock-extended";
import ILoadWorldUseCase from "../../../../Core/Application/LoadWorld/ILoadWorldUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import LoadLearningWorldButtonController from "../../../../Core/Presentation/React/LoadLearningWorldButton/LoadLearningWorldButtonController";

const unseCaseMock = mock<ILoadWorldUseCase>();
describe("LoadLearningWorldButtonController", () => {
  let systemUnderTest: LoadLearningWorldButtonController;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.unbindAll();
    CoreDIContainer.bind<ILoadWorldUseCase>(
      USECASE_TYPES.ILoadWorldUseCase
    ).toConstantValue(unseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = new LoadLearningWorldButtonController();
  });

  afterEach(() => {
    CoreDIContainer.restore();
  });

  test("should call the LoadWorld Usecase", () => {
    systemUnderTest.loadWorld();
    expect(unseCaseMock.executeAsync).toHaveBeenCalled();
  });
});
