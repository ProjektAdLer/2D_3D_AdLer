import { ConstructorReference } from "./../../../Types/EntityManagerTypes";
import { Entity } from "../../../Types/EntityManagerTypes";
import AbstractEntity from "../../Entities/AbstractEntity";

export default interface IEntityManager {
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
}
