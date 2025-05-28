import { ConstructorReference } from "../../Types/EntityManagerTypes";

export default interface IEntityContainer {
  /**
   * Creates a new entity and stores it in the entity manager.
   * @template T The type of the entity
   * @returns the reference to the new entity
   * @param entityData The data of the new entity as object (type checked)
   * @param entityType The type of the new entity (This is needed because of limitations of the TypeScript compiler)
   */
  createEntity<T extends object>(
    entityData: Partial<T>,
    entityType: ConstructorReference<T>,
  ): T;

  useSingletonEntity<T extends object>(
    entityData: Partial<T>,
    entityType: ConstructorReference<T>,
  ): T;

  /**
   * Returns all entities of the given type.
   * In any case a array is returned.
   *     - empty array if no entities of the given type exist
   *     - array with one entry if only one Entity exists
   * @template T The type of the entities
   * @returns The entities of the given type
   */
  getEntitiesOfType<T extends object>(entityType: ConstructorReference<T>): T[];

  /**
   * @param entityType The type of the entities to filter
   * @param filter The filter function to apply to the entities
   */
  filterEntitiesOfType<T extends object>(
    entityType: ConstructorReference<T>,
    filter: (entity: T) => boolean,
  ): T[];

  /**
   * Deletes a given Entity from the EntityManager
   * Caution: This will (at least for now) delete the entity regardless of references in other entities.
   * @param entity The entity to delete
   */
  deleteEntity(entity: object): void;

  /**
   * Deletes all entities from the EntityManager
   * Caution: This will (at least for now) delete all entitites regardless of references in other entities.
   */
  deleteAll(): void;

  /**
   * Gets all Entites in a Map
   * This is used for Debugging
   */
  getAllEntities(): Map<ConstructorReference<object>, object[]>;
}
