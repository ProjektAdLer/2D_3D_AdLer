import { injectable } from "inversify";
import AbstractEntity from "../../Entities/API/AbstractEntity";
import RootEntity from "../../Entities/Entities/RootEntity";
import ObservableClass from "./Observables/ObservableClass";
import { Entity, EntityReference } from "../../Types/EntityManagerTypes";
import IEntityManager from "./INewEntityManager";
import ObservablePrimitive from "./Observables/ObservablePrimitive";
import Observable from "./Observables/Observable";

// TODO: What happens, when we create an Entity, when there is already on Present in the Parent
// TODO: Implement CRUD Operations

@injectable()
export default class EntityManager implements IEntityManager {
  private entityMap: Map<string, ObservableClass<any>> = new Map();
  private rootEntity: ObservableClass<RootEntity>;

  constructor() {
    this.rootEntity = new ObservableClass<RootEntity>(RootEntity);
    this.entityMap.set(this.rootEntity.Value.id, this.rootEntity);
  }

  createEntity<T extends AbstractEntity, U extends AbstractEntity>(
    entityData: Partial<Entity<T>>,
    parentEntityId: string,
    parentEntityMember: EntityReference<U>,
    entityType: { new (): T }
  ): string {
    const newObservableEntity = new ObservableClass<T>(entityType);

    // fill the members of the new entity with the data from the data object
    // TypeScript ensures, that keys and value types of the data object match to the entity
    Object.entries(entityData).forEach(([key, value]) => {
      newObservableEntity.Value[key as keyof T] = new ObservablePrimitive(
        value
      ) as any;
    });

    this.entityMap.set(newObservableEntity.Value.id, newObservableEntity);

    const parent = this.entityMap.get(parentEntityId)!;
    parent.Value[parentEntityMember].setValue(newObservableEntity.Value.id);

    return newObservableEntity.Value.id;
  }

  getEntityById<T extends AbstractEntity>(
    uuid: string,
    entityType: { new (): T }
  ): ObservableClass<T> {
    if (!this.entityMap.has(uuid))
      throw new Error("Entity with UUID " + uuid + " not found");

    const entity = this.entityMap.get(uuid);

    if (!(entity?.Value instanceof entityType))
      throw new Error(
        "Entity with UUID " +
          uuid +
          "doesn't match the class type " +
          entityType.name
      );

    return entity as ObservableClass<T>;
  }

  getRootEntity(): ObservableClass<RootEntity> {
    return this.rootEntity;
  }
}
