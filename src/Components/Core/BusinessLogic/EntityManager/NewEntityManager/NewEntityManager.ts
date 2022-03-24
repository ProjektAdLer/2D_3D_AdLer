import { injectable } from "inversify";
import AbstractEntity from "../../../Entities/API/AbstractEntity";
import RootEntity from "../../../Entities/Entities/RootEntity";
import ObservableClass from "../Observables/ObservableClass";
import { Entity, EntityReference } from "../../../Types/EntityManagerTypes";
import INewEntityManager from "./INewEntityManager";
import ObservablePrimitive from "../Observables/ObservablePrimitive";

// TODO: What happens, when we create an Entity, when there is already on Present in the Parent
// TODO: Implement CRUD Operations

@injectable()
export default class NewEntityManager implements INewEntityManager {
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
    classRef: { new (): T }
  ): string {
    const newObservableWithEntity = new ObservableClass<T>(classRef);
    // This fills all Public Members of the Entity with the Data from the Data Object
    // Typescript ensures, that the Data Object has the same Members as the Entity

    Object.assign(newObservableWithEntity.Value, entityData);

    // Object.entries(entityData).forEach(([key, value]) => {
    //   ///@ts-ignore
    //   newObservableWithEntity.Value[key].setValue(value);
    // });

    this.entityMap.set(
      newObservableWithEntity.Value.id,
      newObservableWithEntity
    );

    const parent = this.entityMap.get(parentEntityId)!;

    parent.Value[parentEntityMember].setValue(newObservableWithEntity.Value.id);

    return newObservableWithEntity.Value.id;
  }

  getEntityById<T extends AbstractEntity>(
    uuid: string,
    classRef: { new (): T }
  ): ObservableClass<T> {
    if (!this.entityMap.has(uuid))
      throw new Error("Entity with given UUID not found");

    const entity = this.entityMap.get(uuid);

    if (!(entity?.Value instanceof classRef))
      throw new Error("Entity has the wrong Class");

    return entity as ObservableClass<T>;
  }

  getRootEntity(): ObservableClass<RootEntity> {
    return this.rootEntity;
  }
}
