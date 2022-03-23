import { injectable } from "inversify";
import AbstractEntity from "../../../Entities/API/AbstractEntity";
import ObservableClass from "../Observables/ObservableClass";
import { Entity } from "./EntityManagerTypes";
import INewEntityManager from "./INewEntityManager";

@injectable()
export default class NewEntityManager implements INewEntityManager {
  private entityMap: Map<string, ObservableClass<any>> = new Map();
  createEntity<T extends AbstractEntity>(
    entityData: Partial<Entity<T>>,
    classRef: { new (): T }
  ): string {
    const newObservableWithEntity = new ObservableClass<T>(classRef);
    // This fills all Public Members of the Entity with the Data from the Data Object
    // Typescript ensures, that the Data Object has the same Members as the Entity
    Object.assign(newObservableWithEntity.Value, entityData);
    this.entityMap.set(
      newObservableWithEntity.Value.id,
      newObservableWithEntity
    );

    return newObservableWithEntity.Value.id;
  }

  getEntityById<T extends AbstractEntity>(uudi: string): ObservableClass<T> {
    if (!this.entityMap.has(uudi)) {
      throw new Error("Entity with given UUID not found");
    }
    return this.entityMap.get(uudi) as ObservableClass<T>;
  }
}
