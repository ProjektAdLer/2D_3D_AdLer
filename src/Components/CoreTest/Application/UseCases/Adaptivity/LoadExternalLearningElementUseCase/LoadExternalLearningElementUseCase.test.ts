import { LearningElementTypeStrings } from "./../../../../../Core/Domain/Types/LearningElementTypes";
import ExternalLearningElementEntity from "../../../../../Core/Domain/Entities/Adaptivity/ExternalLearningElementEntity";
import mock from "jest-mock-extended/lib/Mock";
import LoadExternalLearningElementUseCase from "../../../../../Core/Application/UseCases/Adaptivity/LoadExternalLearningElementUseCase/LoadExternalLearningElementUseCase";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import IGetUserLocationUseCase from "../../../../../Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import USECASE_TYPES from "../../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import UserLocationTO from "../../../../../Core/Application/DataTransferObjects/UserLocationTO";
import IEntityContainer from "../../../../../Core/Domain/EntityContainer/IEntityContainer";
import CORE_TYPES from "../../../../../Core/DependencyInjection/CoreTypes";
import IGetLearningElementSourceUseCase from "../../../../../Core/Application/UseCases/GetLearningElementSource/IGetLearningElementSourceUseCase";
import ILearningWorldPort from "../../../../../Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "../../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import { ConstructorReference } from "../../../../../Core/Types/EntityManagerTypes";

const getUserLocationUseCaseMock = mock<IGetUserLocationUseCase>();
const entityContainerMock = mock<IEntityContainer>();
const getElementSourceUseCaseMock = mock<IGetLearningElementSourceUseCase>();
const worldPortMock = mock<ILearningWorldPort>();

describe("LoadExternalLearningElementUseCase", () => {
  let systemUnderTest: LoadExternalLearningElementUseCase;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(
      USECASE_TYPES.IGetUserLocationUseCase
    ).toConstantValue(getUserLocationUseCaseMock);

    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );

    CoreDIContainer.rebind(
      USECASE_TYPES.IGetLearningElementSourceUseCase
    ).toConstantValue(getElementSourceUseCaseMock);

    CoreDIContainer.rebind(PORT_TYPES.ILearningWorldPort).toConstantValue(
      worldPortMock
    );
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(
      LoadExternalLearningElementUseCase
    );
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("should throw, if user is not in LearningSpace", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: undefined,
      worldID: 1,
    } as UserLocationTO);

    await expect(systemUnderTest.executeAsync(2)).rejects.toThrow(
      `User is not in a space!`
    );
  });

  test("should throw, if the external LearningElement is not found", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);

    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);

    await expect(systemUnderTest.executeAsync(2)).rejects.toThrow(
      "Could not find element"
    );
  });

  test("should throw, if more than one external LearningElement is found", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 1,
      },
      {
        id: 1,
      },
    ]);

    await expect(systemUnderTest.executeAsync(1)).rejects.toThrow(
      "Found more than one element"
    );
  });

  test("calls executeAsync on the GetLearningElementSourceUseCase", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);

    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 1,
        worldID: 1,
        name: "",
        type: "text",
      } as ExternalLearningElementEntity,
    ]);

    getElementSourceUseCaseMock.internalExecuteAsync.mockResolvedValue("path");

    await systemUnderTest.executeAsync(1);

    expect(getElementSourceUseCaseMock.internalExecuteAsync).toBeCalledTimes(1);
  });

  test("calls the port with the TO", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      {
        id: 1,
      },
    ]);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      {
        id: 1,
        worldID: 1,
        name: "",
        type: "text",
      } as ExternalLearningElementEntity,
    ]);
    getElementSourceUseCaseMock.internalExecuteAsync.mockResolvedValue("path");

    await systemUnderTest.executeAsync(1);

    expect(worldPortMock.onLearningElementLoaded).toHaveBeenCalledWith({
      id: 1,
      filePath: "path",
    });
  });

  test("element filter callback should return a boolean", async () => {
    getUserLocationUseCaseMock.execute.mockReturnValueOnce({
      spaceID: 1,
      worldID: 1,
    } as UserLocationTO);
    let filterReturn: boolean;
    entityContainerMock.filterEntitiesOfType.mockImplementationOnce(
      <T>(
        entityType: ConstructorReference<T>,
        filter: (entity: T) => boolean
      ) => {
        filterReturn = filter(new entityType());
        return [
          {
            elements: [],
          },
        ];
      }
    );
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      {
        worldID: 1,
      },
    ]);

    await systemUnderTest.executeAsync(1);

    // @ts-ignore TS does not know about the mock
    expect(filterReturn).toBe(false);
  });
});
