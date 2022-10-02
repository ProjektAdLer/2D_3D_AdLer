import ScoreElementUseCase from "../../../../Core/Application/UseCases/ScoreElement/ScoreElementUseCase";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import { filterEntitiesOfTypeMockImplUtil } from "../../../TestUtils";
import ICalculateSpaceScoreUseCase from "../../../../Core/Application/UseCases/CalculateSpaceScore/ICalculateSpaceScoreUseCase";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import { mock } from "jest-mock-extended";
import IBackendAdapter from "../../../../Core/Adapters/BackendAdapter/IBackendAdapter";
import UserDataEntity from "../../../../Core/Domain/Entities/UserDataEntity";

const entityContainerMock = mock<IEntityContainer>();
const backendMock = mock<IBackendAdapter>();
const CalculateSpaceScoreMock = mock<ICalculateSpaceScoreUseCase>();

describe("ScoreElementUseCase", () => {
  let systemUnderTest: ScoreElementUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);

    CoreDIContainer.rebind<IEntityContainer>(
      CORE_TYPES.IEntityContainer
    ).toConstantValue(entityContainerMock);
    CoreDIContainer.rebind<IBackendAdapter>(
      CORE_TYPES.IBackendAdapter
    ).toConstantValue(backendMock);
    CoreDIContainer.rebind<ICalculateSpaceScoreUseCase>(
      USECASE_TYPES.ICalculateSpaceScore
    ).toConstantValue(CalculateSpaceScoreMock);

    systemUnderTest = CoreDIContainer.resolve(ScoreElementUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("executeAsync throws error if ElementId is not provided", async () => {
    const userEntity = new UserDataEntity();
    userEntity.userToken = "token";
    entityContainerMock.getEntitiesOfType.mockReturnValue([userEntity]);

    await expect(systemUnderTest.executeAsync()).rejects.toThrowError();
  });

  test("executeAsync throws error if entity container returns no element entity with matching ID", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([]);

    const userEntity = new UserDataEntity();
    userEntity.userToken = "token";
    entityContainerMock.getEntitiesOfType.mockReturnValue([userEntity]);
    expect(() =>
      systemUnderTest.executeAsync({ elementId: 1 })
    ).rejects.toThrowError("Could not find");
  });

  test("executeAsync throws error if entity container returns multiple element entities with matching ID", () => {
    const userEntity = new UserDataEntity();
    userEntity.userToken = "token";
    entityContainerMock.getEntitiesOfType.mockReturnValue([userEntity]);

    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      { id: 1 },
      { id: 1 },
    ]);

    expect(() =>
      systemUnderTest.executeAsync({ elementId: 1 })
    ).rejects.toThrowError("Found more than one");
  });

  test("executeAsync throws error if backend throws error", async () => {
    const userEntity = new UserDataEntity();
    userEntity.userToken = "token";
    entityContainerMock.getEntitiesOfType.mockReturnValue([userEntity]);

    containerSetup();

    backendMock.scoreElement.mockRejectedValue("error");

    await expect(
      systemUnderTest.executeAsync({ elementId: 1 })
    ).rejects.toThrowError("Could not score");
  });

  test("executeAsync throws error if entity container returns no matching space", async () => {
    const userEntity = new UserDataEntity();
    userEntity.userToken = "token";
    entityContainerMock.getEntitiesOfType.mockReturnValue([userEntity]);

    const ElementEntities = [
      {
        id: 1,
        hasScored: false,
        value: 10,
      },
    ];
    const mock = filterEntitiesOfTypeMockImplUtil(ElementEntities);

    entityContainerMock.filterEntitiesOfType.mockImplementationOnce(mock);
    entityContainerMock.filterEntitiesOfType.mockImplementationOnce(
      filterEntitiesOfTypeMockImplUtil([])
    );

    await expect(
      systemUnderTest.executeAsync({ elementId: 1 })
    ).rejects.toThrowError("Could not find");
  });

  test("executeAsync successfully gets element with given id, scores it, gets the space id and starts use case to calcualte new space score", async () => {
    const userEntity = new UserDataEntity();
    userEntity.userToken = "token";
    entityContainerMock.getEntitiesOfType.mockReturnValue([userEntity]);

    containerSetup();

    await expect(
      systemUnderTest.executeAsync({
        elementId: 1,
      })
    ).resolves.toBeUndefined();

    expect(CalculateSpaceScoreMock.execute).toHaveBeenCalledTimes(1);
  });
});

function containerSetup(): void {
  const elementId = 1;
  const element = {
    id: elementId,
    hasScored: false,
    value: 10,
  };
  const ElementEntities = [
    {
      element: element,
    },
  ];
  const spaceId = 1;
  const space = {
    id: spaceId,
    elements: [element],
  };
  const spaceEntites = [
    {
      space,
    },
  ];

  entityContainerMock.filterEntitiesOfType.mockReturnValueOnce(ElementEntities);
  entityContainerMock.filterEntitiesOfType.mockReturnValueOnce(spaceEntites);
}
