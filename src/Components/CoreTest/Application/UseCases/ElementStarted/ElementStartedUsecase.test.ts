import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import IEntityContainer from "../../../../Core/Domain/EntityContainer/IEntityContainer";
import { ConstructorReference } from "../../../../Core/Types/EntityManagerTypes";

import { mock } from "jest-mock-extended";
import PORT_TYPES from "../../../../Core/DependencyInjection/Ports/PORT_TYPES";
import ElementStartedUseCase from "../../../../Core/Application/UseCases/ElementStarted/ElementStartedUseCase";
import IElementPort from "../../../../Core/Ports/ElementPort/IElementPort";
import GetElementSourceUseCase from "../../../../Core/Application/UseCases/GetElementSourceUseCase/GetElementSourceUseCase";
import USECASE_TYPES from "../../../../Core/DependencyInjection/UseCases/USECASE_TYPES";

const elementPortMock = mock<IElementPort>();
const entityContainerMock = mock<IEntityContainer>();
const getElementSourceUseCaseMock = mock<GetElementSourceUseCase>();

describe("Element Started Usecase", () => {
  let systemUnderTest: ElementStartedUseCase;
  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.IEntityContainer).toConstantValue(
      entityContainerMock
    );
    CoreDIContainer.rebind(PORT_TYPES.IElementPort).toConstantValue(
      elementPortMock
    );
    CoreDIContainer.rebind(USECASE_TYPES.IGetElementSource).toConstantValue(
      getElementSourceUseCaseMock
    );
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(ElementStartedUseCase);
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
    entityContainerMock.getEntitiesOfType.mockReturnValue([{}]);
    getElementSourceUseCaseMock.executeAsync.mockResolvedValue("path");

    systemUnderTest.executeAsync(1);

    expect(getElementSourceUseCaseMock.executeAsync).toBeCalledTimes(1);
  });

  test("calls the port with the TO", async () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValue([
      {
        id: 1,
      },
    ]);
    entityContainerMock.getEntitiesOfType.mockReturnValue([{}]);
    getElementSourceUseCaseMock.executeAsync.mockResolvedValue("path");

    await systemUnderTest.executeAsync(1);

    expect(elementPortMock.onElementLoaded).toHaveBeenCalledWith({
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

  test("should throw, if the course is not found", async () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      {
        id: 1,
      },
    ]);
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([]);

    await expect(systemUnderTest.executeAsync(1)).rejects.toThrow(
      "Could not find any world"
    );
  });

  test("should throw, if more than one course is found", async () => {
    entityContainerMock.filterEntitiesOfType.mockReturnValueOnce([
      {
        id: 1,
      },
    ]);
    entityContainerMock.getEntitiesOfType.mockReturnValueOnce([
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

  test("filter Callback should return a boolean", async () => {
    let filterReturn: boolean;
    entityContainerMock.filterEntitiesOfType.mockImplementation(
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
    entityContainerMock.getEntitiesOfType.mockReturnValue([
      {
        worldID: 1,
      },
    ]);

    await systemUnderTest.executeAsync(1);

    // @ts-ignore TS does not know about the mock
    expect(filterReturn).toBe(false);
  });
});
