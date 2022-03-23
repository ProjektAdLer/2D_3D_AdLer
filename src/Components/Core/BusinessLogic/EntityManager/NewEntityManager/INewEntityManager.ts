import AbstractEntity from "../../../Entities/API/AbstractEntity";
import RootEntity from "../../../Entities/Entities/RootEntity";
import ObservableClass from "../Observables/ObservableClass";
import { Entity, EntityReference } from "../../../Types/EntityManagerTypes";

export default interface INewEntityManager {
  /**
   * Creates an Observable Enitity with a uniqe UUID
   * The Entity can always be referenced with this ID
   * A new Entity must always have a parent Entity, thats why it is passed in this method
   * @returns The UUID of the new Entity
   * @param entityData The Data of the new Entity as Object (Type Checked)
   * @param parentEntityId The UUID of the Parent Entity
   * @param parentEntityMember The Member of the Parent Entity where the new Entity will be stored
   * @param classRef The Class of the new Entity (This is needed because of limitations of the Typescript Compiler)
   */
  createEntity<T extends AbstractEntity, U extends AbstractEntity>(
    entityData: Partial<Entity<T>>,
    parentEntityId: string,
    parentEntityMember: EntityReference<U>,
    classRef: { new (): T }
  ): string;

  /**
   * @returns the Entity with the given ID
   * @param uudi The UUID of the Entity
   * @param classRef The Class of the Entity (This is needed because of limitations of the Typescript Compiler)
   */
  getEntityById<T extends AbstractEntity>(
    uuid: string,
    classRef: { new (): T }
  ): ObservableClass<T>;

  /**
   * @returns the Root Entity
   */
  getRootEntity(): ObservableClass<RootEntity>;
}
