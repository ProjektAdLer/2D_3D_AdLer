import AbstractEntity from "../../../Entities/API/AbstractEntity";
import ObservableClass from "../Observables/ObservableClass";
import { Entity } from "./EntityManagerTypes";

export default interface INewEntityManager {
  /**
   * Creates an Observable Enitity with a uniqe UUID
   * The Entity can always be referenced with this ID
   * @returns The UUID of the new Entity
   * @param entityData The Data of the new Entity as Object (Type Checked)
   * @param classRef The Class of the new Entity (This is needed because of limitations of the Typescript Compiler)
   */
  createEntity<T extends AbstractEntity>(
    entityData: Partial<Entity<T>>,
    classRef: { new (): T }
  ): string;

  /**
   * @returns the Entity with the given ID
   * @param uudi The UUID of the Entity
   */
  getEntityById<T extends AbstractEntity>(uudi: string): ObservableClass<T>;
}
