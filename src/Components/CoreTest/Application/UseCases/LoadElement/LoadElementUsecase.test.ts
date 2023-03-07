import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import { ConstructorReference } from "../../../../Core/Types/EntityManagerTypes";
import { mock } from "jest-mock-extended";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import GetElementSourceUseCase from "../../../../Core/Application/UseCases/GetElementSource/GetElementSourceUseCase";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";
import LoadElementUseCase from "../../../../Core/Application/UseCases/LoadElement/LoadElementUseCase";
import IWorldPort from "../../../../Core/Ports/WorldPort/IWorldPort";

const worldPortMock = mock<IWorldPort>();
const entityContainerMock = mock<IEntityContainer>();
const getElementSourceUseCaseMock = mock<GetElementSourceUseCase>();

describe("LoadElementUseCase", () => {
  let systemUnderTest: LoadElementUseCase;
  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );
    CoreDIContainer.rebind(PORT_TYPES.IWorldPort).toConstantValue(
      worldPortMock
    );
    CoreDIContainer.rebind(
      USECASE_TYPES.IGetElementSourceUseCase
    ).toConstantValue(getElementSourceUseCaseMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(LoadElementUseCase);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("calls executeAsync on the GetElementUseCase", () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 1,
      },
    ]);
    entityContainerMock.filterEntitiesOfType.mockReturnValue([{}]);
    getElementSourceUseCaseMock.executeAsync.mockResolvedValue("path");

    systemUnderTest.executeAsync(1);

    expect(getElementSourceUseCaseMock.executeAsync).toBeCalledTimes(1);
  });

  test("calls the port with the TO", async () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      {
        id: 1,
      },
    ]);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([{}]);
    getElementSourceUseCaseMock.executeAsync.mockResolvedValue("path");

    await systemUnderTest.executeAsync(1);

    expect(worldPortMock.onElementLoaded).toHaveBeenCalledWith({
      id: 1,
      filePath: "path",
    });
  });

  test("should throw, if the Element is not found", async () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([]);

    await expect(systemUnderTest.executeAsync(2)).rejects.toThrow(
      "Could not find element"
    );
  });

  test("should throw, if more than one Element is found", async () => {
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

  test.skip("should throw, if the course is not found", async () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      {
        id: 1,
      },
    ]);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([]);

    await expect(systemUnderTest.executeAsync(1)).rejects.toThrow(
      "Could not find any world"
    );
  });

  test.skip("should throw, if more than one course is found", async () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      {
        id: 1,
      },
    ]);
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      {
        id: 1,
      },
      {
        id: 1,
      },
    ]);

    await expect(systemUnderTest.executeAsync(1)).rejects.toThrow(
      "Found more than one world"
    );
  });

  test("element filter callback should return a boolean", async () => {
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

  test.skip("world filter callback should return a boolean", async () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      {
        id: 1,
      },
    ]);

    let filterReturn: boolean;
    entityContainerMock.filterEntitiesOfType.mockImplementationOnce(
      <T>(
        entityType: ConstructorReference<T>,
        filter: (entity: T) => boolean
      ) => {
        filterReturn = filter(new entityType());
        return [{}];
      }
    );

    await systemUnderTest.executeAsync(1);

    // @ts-ignore TS does not know about the mock
    expect(filterReturn).toBe(false);
  });
});
