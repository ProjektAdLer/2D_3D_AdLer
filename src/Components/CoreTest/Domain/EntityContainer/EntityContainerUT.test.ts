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

  test("The Root Entity of the Entity Manager is always defined", () => {
    const container = getContainer();
    expect(container.getRootEntity()).toBeDefined();
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
      container.filterEntitiesOfTye(
        TestEntity,
        (entity) => entity.test1 === "entity1"
      )
    ).toEqual([entity1]);
  });

  test("filterEntitiesOfType returns empty Array, if nothing is found", () => {
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

    expect(
      container.filterEntitiesOfTye(
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
});
function getContainer() {
  return CoreDIContainer.get<IEntityContainer>(CORE_TYPES.IEntityContainer);
}
