import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";

import { validate as uuidValidate } from "uuid";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import IEntityManager from "../../../Core/Domain/EntityManager/IEntityManager";
import RootEntity from "../../../Core/Domain/Entities/RootEntity";
import TestEntity from "./TestEntity";
import ObservableClass from "../../../Core/Domain/EntityManager/Observables/ObservableClass";

describe("EntityManager", () => {
  beforeEach(() => {
    CoreDIContainer.snapshot();
  });

  afterEach(() => {
    CoreDIContainer.restore();
  });

  test("When a new Entity is created, is has a valid UUID", () => {
    const testEntity = new ObservableClass<TestEntity>(TestEntity);
    expect(uuidValidate(testEntity.Value.id)).toBe(true);
  });

  test("The Root Entity of the Entity Manager is always defined", () => {
    const manager = CoreDIContainer.get<IEntityManager>(
      CORE_TYPES.IEntityManager
    );
    expect(uuidValidate(manager.getRootEntity().Value.id)).toBe(true);
  });

  test("When an Entity is created, its ID is referenced in a parent Entity", () => {
    const manager = CoreDIContainer.get<IEntityManager>(
      CORE_TYPES.IEntityManager
    );

    const rootId = manager.getRootEntity().Value.id;
    const newId = manager.createEntity<TestEntity, RootEntity>(
      {
        member1: true,
        member2: "false",
      },
      rootId,
      "testEntity",
      TestEntity
    );

    expect(manager.getRootEntity().Value.testEntity.Value).toBe(newId);
  });

  test("getEntityById returns the propper Entity", () => {
    const manager = CoreDIContainer.get<IEntityManager>(
      CORE_TYPES.IEntityManager
    );

    const rootId = manager.getRootEntity().Value.id;
    const newId = manager.createEntity<TestEntity, RootEntity>(
      {
        member1: true,
        member2: "false",
      },
      rootId,
      "testEntity",
      TestEntity
    );
    expect(manager.getEntityById<TestEntity>(newId, TestEntity).Value.id).toBe(
      newId
    );
  });

  test("getEntityById throws, if it is passed the wrong classw type", () => {
    const manager = CoreDIContainer.get<IEntityManager>(
      CORE_TYPES.IEntityManager
    );

    const rootId = manager.getRootEntity().Value.id;
    const newId = manager.createEntity<TestEntity, RootEntity>(
      {
        member1: true,
        member2: "false",
      },
      rootId,
      "testEntity",
      TestEntity
    );
    expect(() =>
      ///@ts-ignore
      manager.getEntityById<TestEntity>(newId, RootEntity)
    ).toThrow();
  });

  test("getEntityById throws, if it is passed a wrong Id", () => {
    const manager = CoreDIContainer.get<IEntityManager>(
      CORE_TYPES.IEntityManager
    );

    expect(() =>
      ///@ts-ignore
      manager.getEntityById<TestEntity>("", TestEntity)
    ).toThrow();
  });
});
