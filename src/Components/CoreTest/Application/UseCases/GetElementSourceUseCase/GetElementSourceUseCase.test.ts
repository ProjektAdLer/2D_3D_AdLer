import { mock } from "jest-mock-extended";
import IBackendAdapter from "../../../../Core/Adapters/BackendAdapter/IBackendAdapter";
import GetElementSourceUseCase from "../../../../Core/Application/UseCases/GetElementSourceUseCase/GetElementSourceUseCase";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";

const entityContainerMock = mock<IEntityContainer>();
const backendMock = mock<IBackendAdapter>();

describe("GetElementSource", () => {
  let systemUnderTest: GetElementSourceUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.unbindAll();
    CoreDIContainer.bind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.bind<IBackendAdapter>(
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

    const result = await systemUnderTest.executeAsync({
      elementId: 1,
      courseId: 1,
    });

    expect(result).toBe(
      "wwwroot\\courses\\2\\World_For_Evaluation\\h5p\\H5P-SchiebeSpiel"
    );
  });
});
