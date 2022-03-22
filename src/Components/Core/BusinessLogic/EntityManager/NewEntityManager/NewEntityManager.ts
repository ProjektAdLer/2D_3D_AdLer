import { injectable } from "inversify";
import TestEntity from "../../../Entities/Entities/TestEntity";
import ObservableClass from "../Observables/ObservableClass";
import { Entity } from "./EntityManagerTypes";
import INewEntityManager from "./INewEntityManager";

@injectable()
export default class NewEntityManager implements INewEntityManager {
  createEntity<T>(entityData: Partial<Entity<T>>): void {
    const test = new ObservableClass<TestEntity>(TestEntity);
    // This fills all Public Members of the Entity with the Data from the Data Object
    // Typescript ensures, that the Data Object has the same Members as the Entity
    Object.assign(test.Value, entityData);
  }
}
