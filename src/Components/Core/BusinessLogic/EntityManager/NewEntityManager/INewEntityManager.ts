import { Entity } from "./EntityManagerTypes";

export default interface INewEntityManager {
  createEntity<T>(
    entityData: Partial<Entity<T>>,
    classRef: { new (): T }
  ): void;
}
