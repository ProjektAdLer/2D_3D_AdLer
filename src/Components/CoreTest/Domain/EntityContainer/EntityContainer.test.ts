import { TestEntity, TestEntity2 } from "./TestEntities";
import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import IEntityContainer from "../../../Core/Domain/EntityContainer/IEntityContainer";

describe("EntityManager", () => {
  let systemUnderTest: IEntityContainer;
  beforeEach(() => {
    CoreDIContainer.snapshot();

    systemUnderTest = CoreDIContainer.get<IEntityContainer>(
      CORE_TYPES.IEntityContainer,
    );
  });

  afterEach(() => {
    CoreDIContainer.restore();
  });

  test("getEntitiesofType returns the proper entities as an array in correct order", () => {
    const entity1 = systemUnderTest.createEntity<TestEntity>(
      {
        test1: "entity1",
      },
      TestEntity,
    );
    const entity2 = systemUnderTest.createEntity<TestEntity>(
      {
        test1: "entity2",
      },
      TestEntity,
    );

    expect(systemUnderTest.getEntitiesOfType(TestEntity)).toEqual([
      entity1,
      entity2,
    ]);
  });

  test("getEntityOfType returns empty array if no entity is found", () => {
    systemUnderTest.createEntity<TestEntity>(
      {
        test1: "entity1",
      },
      TestEntity,
    );
    systemUnderTest.createEntity<TestEntity>(
      {
        test1: "entity2",
      },
      TestEntity,
    );

    expect(systemUnderTest.getEntitiesOfType(TestEntity2)).toEqual([]);
  });

  test("filterEntitiesOfType returns the correct entites", () => {
    const entity1 = systemUnderTest.createEntity<TestEntity>(
      {
        test1: "entity1",
      },
      TestEntity,
    );
    systemUnderTest.createEntity<TestEntity>(
      {
        test1: "entity2",
      },
      TestEntity,
    );

    expect(
      systemUnderTest.filterEntitiesOfType(
        TestEntity,
        (entity) => entity.test1 === "entity1",
      ),
    ).toEqual([entity1]);
  });

  test("filterEntitiesOfType returns empty array if nothing is found", () => {
    systemUnderTest.createEntity<TestEntity>(
      {
        test1: "entity1",
      },
      TestEntity,
    );
    systemUnderTest.createEntity<TestEntity>(
      {
        test1: "entity2",
      },
      TestEntity,
    );

    expect(
      systemUnderTest.filterEntitiesOfType(
        TestEntity,
        (entity) => entity.test1 === "foo",
      ),
    ).toEqual([]);
  });

  test("New Entities are stored correctly", () => {
    systemUnderTest.createEntity<TestEntity>({}, TestEntity);
    systemUnderTest.createEntity<TestEntity>({}, TestEntity);

    systemUnderTest.createEntity<TestEntity2>({}, TestEntity2);

    expect(systemUnderTest.getEntitiesOfType(TestEntity).length).toBe(2);
    expect(systemUnderTest.getEntitiesOfType(TestEntity2).length).toBe(1);
  });

  test("DeleteEntity deletes the right entity", () => {
    const entity1 = systemUnderTest.createEntity<TestEntity>({}, TestEntity);
    const entity2 = systemUnderTest.createEntity<TestEntity>({}, TestEntity);

    systemUnderTest.deleteEntity(entity1);

    expect(systemUnderTest.getEntitiesOfType(TestEntity).length).toBe(1);
    expect(systemUnderTest.getEntitiesOfType(TestEntity)[0]).toBe(entity2);
  });

  test("deleteAll delets all entities", () => {
    systemUnderTest.createEntity<TestEntity>({}, TestEntity);
    systemUnderTest.createEntity<TestEntity2>({}, TestEntity2);

    systemUnderTest.deleteAll();

    expect(systemUnderTest.getEntitiesOfType(TestEntity).length).toBe(0);
    expect(systemUnderTest.getEntitiesOfType(TestEntity2).length).toBe(0);
  });

  test("UseSingletonEntity returns a already exisiting entity", () => {
    const entity1 = systemUnderTest.createEntity<TestEntity>({}, TestEntity);
    systemUnderTest.createEntity<TestEntity2>({}, TestEntity2);

    const entity3 = systemUnderTest.useSingletonEntity<TestEntity>(
      {},
      TestEntity,
    );

    expect(entity3).toBe(entity1);
    expect(systemUnderTest.getEntitiesOfType(TestEntity).length).toBe(1);
  });

  test("UseSingletonEntity creates a new entity with data if no entity is found", () => {
    const entity = systemUnderTest.useSingletonEntity<TestEntity>(
      {
        test1: "test",
      },
      TestEntity,
    );

    expect(entity.test1).toBe("test");
  });

  test("UseSingletonEntity changes the data of an existing entity", () => {
    systemUnderTest.createEntity<TestEntity>(
      {
        test1: "test",
        test2: true,
      },
      TestEntity,
    );

    systemUnderTest.useSingletonEntity<TestEntity>(
      {
        test2: false,
      },
      TestEntity,
    );

    const entityToTest = systemUnderTest.getEntitiesOfType(TestEntity)[0];

    expect(entityToTest.test1).toBe("test");
    expect(entityToTest.test2).toBe(false);
  });

  test("UseSingletonEntity throws if the entity exists multiple times", () => {
    systemUnderTest.createEntity<TestEntity>({}, TestEntity);
    systemUnderTest.createEntity<TestEntity>({}, TestEntity);

    expect(() => {
      systemUnderTest.useSingletonEntity<TestEntity>({}, TestEntity);
    }).toThrow();
  });

  test("should get all Entites", () => {
    const entity1 = systemUnderTest.createEntity<TestEntity>({}, TestEntity);
    const entity2 = systemUnderTest.createEntity<TestEntity>({}, TestEntity);
    const entity3 = systemUnderTest.createEntity<TestEntity2>({}, TestEntity2);

    expect(systemUnderTest.getAllEntities().get(TestEntity)).toEqual([
      entity1,
      entity2,
    ]);
    expect(systemUnderTest.getAllEntities().get(TestEntity2)).toEqual([
      entity3,
    ]);
  });
});
