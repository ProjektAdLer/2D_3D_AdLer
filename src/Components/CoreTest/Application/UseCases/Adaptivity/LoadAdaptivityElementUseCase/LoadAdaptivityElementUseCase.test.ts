import LoadAdaptivityElementUseCase, {
  generateAdaptivityContentsTO,
} from "../../../../../Core/Application/UseCases/Adaptivity/LoadAdaptivityElementUseCase/LoadAdaptivityElementUseCase";
import { mock } from "jest-mock-extended";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import ILearningWorldPort from "../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ILoadAdaptivityElementUseCase from "../../../../../Core/Application/UseCases/Adaptivity/LoadAdaptivityElementUseCase/ILoadAdaptivityElementUseCase";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

const worldPortMock = mock<ILearningWorldPort>();

describe("LoadAdaptivityElementUseCase", () => {
  let systemUnderTest: ILoadAdaptivityElementUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LoadAdaptivityElementUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test.skip("calls executeAsync on the LoadAdaptivityElementUseCase", () => {
    systemUnderTest.executeAsync();

    expect(worldPortMock.onAdaptivityElementLoaded).toHaveBeenCalledWith(
      generateAdaptivityContentsTO()
    );
  });
});
