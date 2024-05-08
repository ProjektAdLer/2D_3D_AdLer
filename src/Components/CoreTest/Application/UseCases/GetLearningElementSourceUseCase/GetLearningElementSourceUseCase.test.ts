import { mock } from "jest-mock-extended";
import GetLearningElementSourceUseCase from "../../../../Core/Application/UseCases/GetLearningElementSource/GetLearningElementSourceUseCase";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import IBackendPort from "../../../../Core/Application/Ports/Interfaces/IBackendPort";
import Logger from "../../../../Core/Adapters/Logger/Logger";

const entityContainerMock = mock<IEntityContainer>();
const backendMock = mock<IBackendPort>();
const mockLogger = mock<Logger>();

describe("GetLearningElementSource UseCase", () => {
  let systemUnderTest: GetLearningElementSourceUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.unbindAll();
    CoreDIContainer.bind<Logger>(CORE_TYPES.ILogger).toConstantValue(
      mockLogger
    );
    CoreDIContainer.bind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.bind<IBackendPort>(
      CORE_TYPES.IBackendAdapter
    ).toConstantValue(backendMock);

    systemUnderTest = CoreDIContainer.resolve(GetLearningElementSourceUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  //ANF-ID: [ELG0029]
  test("should get Element Source", async () => {
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {
        userToken: "token",
      },
    ]);

    backendMock.getElementSource.mockResolvedValue(
      "wwwroot\\courses\\2\\World_For_Evaluation\\h5p\\H5P-SchiebeSpiel"
    );

    const result = await systemUnderTest.internalExecuteAsync({
      elementID: 1,
      courseID: 1,
    });

    expect(result).toBe(
      "wwwroot\\courses\\2\\World_For_Evaluation\\h5p\\H5P-SchiebeSpiel"
    );
  });
});
