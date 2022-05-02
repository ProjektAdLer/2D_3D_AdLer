import { ConstructorReference } from "../../Types/EntityManagerTypes";
import AbstractEntity from "../Entities/AbstractEntity";
import RootEntity from "../Entities/RootEntity";

export default interface IEntityContainer {
  /**
   * Creates a new entity and stores it in the entity manager.
   * @template T The type of the entity
   * @returns the reference to the new entity
   * @param entityData The data of the new entity as object (type checked)
   * @param entityType The type of the new entity (This is needed because of limitations of the TypeScript compiler)
   */
  createEntity<T extends AbstractEntity>(
    entityData: Partial<T>,
    entityType: ConstructorReference<T>
  ): T;

  /**
   * Returns all entities of the given type.
   * In any case a array is returned.
   *     - empty array if no entities of the given type exist
   *     - array with one entry if only one Entity exists
   * @template T The type of the entities
   * @returns The entities of the given type
   */
  getEntitiesOfType<T extends AbstractEntity>(
    entityType: ConstructorReference<T>
  ): T[];

  filterEntitiesOfTye<T extends AbstractEntity>(
    entityType: ConstructorReference<T>,
    filter: (entity: T) => boolean
  ): T[];

  /**
   * Deletes a given Entity from the EntityManager
   * Caution: This will (at least for now) delete the entity regardless of references in other entities.
   * @param entity The entity to delete
   */
  deleteEntity(entity: AbstractEntity): void;

  /**
   *
   * gets the Root Entity
   * @deprecated This will likely be removed in the future
   */
  getRootEntity(): RootEntity;
}
