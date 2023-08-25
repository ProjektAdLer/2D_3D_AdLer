import LoadQuizElementUseCase, {
  generateAdaptivityContentsTO,
} from "../../../../../Core/Application/UseCases/Adaptability/LoadQuizElementUseCase/LoadQuizElementUseCase";
import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import ILearningWorldPort from "../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ILoadQuizElementUseCase from "../../../../../Core/Application/UseCases/Adaptability/LoadQuizElementUseCase/ILoadQuizElementUseCase";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

const worldPortMock = mock<ILearningWorldPort>();

describe("LoadQuizElementUseCase", () => {
  let systemUnderTest: LoadQuizElementUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LoadQuizElementUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("calls executeAsync on the LoadQuizElementUseCase", () => {
    systemUnderTest.executeAsync();

    expect(worldPortMock.onAdaptivityElementLoaded).toHaveBeenCalledWith(
      generateAdaptivityContentsTO()
    );
  });
});
