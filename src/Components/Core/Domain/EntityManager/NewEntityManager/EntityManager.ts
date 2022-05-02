import { injectable } from "inversify";
import {
  ConstructorReference,
  Entity,
} from "../../../Types/EntityManagerTypes";
import AbstractEntity from "../../Entities/AbstractEntity";
import IEntityManager from "./IEntityManager";

@injectable()
export default class EntityManager implements IEntityManager {
  entityMap = new Map<ConstructorReference<AbstractEntity>, AbstractEntity[]>();
  createEntity<T extends AbstractEntity>(
    entityData: Partial<T>,
    entityType: ConstructorReference<T>
  ): T {
    const entity = new entityType();
    Object.assign(entity, entityData);
    if (!this.entityMap.has(entityType)) {
      this.entityMap.set(entityType, []);
    }
    //@ts-ignore  TS doesn't know, that the array has been set - PG
    this.entityMap.get(entityType).push(entity);
    return entity;
  }
}
