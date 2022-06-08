import { TestEntity, TestEntity2 } from "./TestEntities";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import IEntityContainer from "../../../Core/Domain/EntityContainer/IEntityContainer";

describe("EntityManager", () => {
  beforeEach(() => {
    CoreDIContainer.snapshot();
  });

  afterEach(() => {
    CoreDIContainer.restore();
  });

  test("getEntitiesofType returns the propper Entities as an Array in correct order", () => {
    const container = getContainer();

    const entity1 = container.createEntity<TestEntity>(
      {
        test1: "entity1",
      },
      TestEntity
    );
    const entity2 = container.createEntity<TestEntity>(
      {
        test1: "entity2",
      },
      TestEntity
    );

    expect(container.getEntitiesOfType(TestEntity)).toEqual([entity1, entity2]);
  });

  test("getEntityOfType returns Empty array if no Entity is found", () => {
    const container = getContainer();

    container.createEntity<TestEntity>(
      {
        test1: "entity1",
      },
      TestEntity
    );
    container.createEntity<TestEntity>(
      {
        test1: "entity2",
      },
      TestEntity
    );

    expect(container.getEntitiesOfType(TestEntity2)).toEqual([]);
  });

  test("filterEntitiesOfType returns the correct Entites", () => {
    const container: IEntityContainer = getContainer();

    const entity1 = container.createEntity<TestEntity>(
      {
        test1: "entity1",
      },
      TestEntity
    );
    const entity2 = container.createEntity<TestEntity>(
      {
        test1: "entity2",
      },
      TestEntity
    );

    expect(
      container.filterEntitiesOfType(
        TestEntity,
        (entity) => entity.test1 === "entity1"
      )
    ).toEqual([entity1]);
  });

  test("filterEntitiesOfType returns empty Array, if nothing is found", () => {
    const container = getContainer();

    container.createEntity<TestEntity>(
      {
        test1: "entity1",
      },
      TestEntity
    );
    container.createEntity<TestEntity>(
      {
        test1: "entity2",
      },
      TestEntity
    );

    expect(
      container.filterEntitiesOfType(
        TestEntity,
        (entity) => entity.test1 === "foo"
      )
    ).toEqual([]);
  });

  test("New Entities are Stored Correctly", () => {
    const container = getContainer();

    container.createEntity<TestEntity>({}, TestEntity);
    container.createEntity<TestEntity>({}, TestEntity);

    container.createEntity<TestEntity2>({}, TestEntity2);

    expect(container.getEntitiesOfType(TestEntity).length).toBe(2);
    expect(container.getEntitiesOfType(TestEntity2).length).toBe(1);
  });

  test("DeleteEntity deletes the right Entity", () => {
    const container = getContainer();

    const entity1 = container.createEntity<TestEntity>({}, TestEntity);
    const entity2 = container.createEntity<TestEntity>({}, TestEntity);

    container.deleteEntity(entity1);

    expect(container.getEntitiesOfType(TestEntity).length).toBe(1);
    expect(container.getEntitiesOfType(TestEntity)[0]).toBe(entity2);
  });

  test("UseSingletonEntity returns a alreay exisiting Entity", () => {
    const container = getContainer();

    const entity1 = container.createEntity<TestEntity>({}, TestEntity);
    container.createEntity<TestEntity2>({}, TestEntity2);

    const entity3 = container.useSingletonEntity<TestEntity>({}, TestEntity);

    expect(entity3).toBe(entity1);
    expect(container.getEntitiesOfType(TestEntity).length).toBe(1);
  });

  test("UseSingletonEntity creates a new Entity with Data, if no Entity is found", () => {
    const container = getContainer();

    const entity = container.useSingletonEntity<TestEntity>(
      {
        test1: "test",
      },
      TestEntity
    );

    expect(entity.test1).toBe("test");
  });

  test("UseSingletonEntity changes the Data of an Existing Entity", () => {
    const container = getContainer();

    container.createEntity<TestEntity>(
      {
        test1: "test",
        test2: true,
      },
      TestEntity
    );

    container.useSingletonEntity<TestEntity>(
      {
        test2: false,
      },
      TestEntity
    );

    const entityToTest = container.getEntitiesOfType(TestEntity)[0];

    expect(entityToTest.test1).toBe("test");
    expect(entityToTest.test2).toBe(false);
  });

  test("UseSingletonEntity throws, if the Entity exists multible times", () => {
    const container = getContainer();

    container.createEntity<TestEntity>({}, TestEntity);
    container.createEntity<TestEntity>({}, TestEntity);

    expect(() => {
      container.useSingletonEntity<TestEntity>({}, TestEntity);
    }).toThrow();
  });
});
function getContainer() {
  return CoreDIContainer.get<IEntityContainer>(CORE_TYPES.IEntityContainer);
}
