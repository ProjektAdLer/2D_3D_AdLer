import { injectable } from "inversify";
import ObservableClass from "../Observables/ObservableClass";
import { Entity } from "./EntityManagerTypes";
import INewEntityManager from "./INewEntityManager";

@injectable()
export default class NewEntityManager implements INewEntityManager {
  createEntity<T>(
    entityData: Partial<Entity<T>>,
    classRef: { new (): T }
  ): void {
    const test = new ObservableClass<T>(classRef);
    // This fills all Public Members of the Entity with the Data from the Data Object
    // Typescript ensures, that the Data Object has the same Members as the Entity
    Object.assign(test.Value, entityData);
    console.log(test.Value);
  }
}
