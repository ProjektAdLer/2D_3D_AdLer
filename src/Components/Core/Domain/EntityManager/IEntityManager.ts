import AbstractEntity from "../../Domain/Entities/AbstractEntity";
import RootEntity from "../../Domain/Entities/RootEntity";
import ObservableClass from "./Observables/ObservableClass";
import { Entity, EntityReference } from "../../Types/EntityManagerTypes";

export default interface IEntityManager {
  /**
   * Creates an Observable Entity with a unique UUID
   * The entity can always be referenced with this ID
   * A new entity must always have a parent entity, thats why it is passed in this method
   * @template T The type of the entity
   * @template U The type of the parent entity
   * @returns the UUID of the new entity
   * @param entityData The data of the new entity as object (type checked)
   * @param parentEntityId The UUID of the parent entity
   * @param parentEntityMember The member of the parent entity where the new entity will be stored
   * @param entityType The type of the new entity (This is needed because of limitations of the TypeScript compiler)
   */
  createEntity<T extends AbstractEntity, U extends AbstractEntity>(
    entityData: Partial<Entity<T>>,
    parentEntityId: string,
    parentEntityMember: EntityReference<U>,
    entityType: { new (): T }
  ): string;

  /**
   * @template T The type of the entity
   * @returns the entity with the given ID
   * @param uuid The UUID of the entity
   * @param entityType The class of the entity (This is needed because of limitations of the TypeScript compiler)
   */
  getEntityById<T extends AbstractEntity>(
    uuid: string,
    entityType: { new (): T }
  ): ObservableClass<T>;

  /**
   * @returns the Root Entity
   */
  getRootEntity(): ObservableClass<RootEntity>;
}
