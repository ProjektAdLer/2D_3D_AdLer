import { mock } from "jest-mock-extended";
import GetElementSourceUseCase from "../../../../Core/Application/UseCases/GetElementSource/GetElementSourceUseCase";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import IBackendPort from "../../../../Core/Application/Ports/Interfaces/IBackendPort";

const entityContainerMock = mock<IEntityContainer>();
const backendMock = mock<IBackendPort>();

describe("GetElementSource", () => {
  let systemUnderTest: GetElementSourceUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.unbindAll();
    CoreDIContainer.bind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.bind<IBackendPort>(
      CORE_TYPES.IBackendAdapter
    ).toConstantValue(backendMock);

    systemUnderTest = CoreDIContainer.resolve(GetElementSourceUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

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
