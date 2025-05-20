import { injectable } from "inversify";
import { ConstructorReference } from "../../Types/EntityManagerTypes";
import IEntityContainer from "./IEntityContainer";

@injectable()
export default class EntityContainer implements IEntityContainer {
  private entityMap = new Map<ConstructorReference<object>, object[]>();

  getAllEntities(): Map<ConstructorReference<object>, object[]> {
    return this.entityMap;
  }

  useSingletonEntity<T extends object>(
    entityData: Partial<T>,
    entityType: ConstructorReference<T>,
  ): T {
    const entities = this.getEntitiesOfType(entityType);

    if (entities.length > 1) {
      throw new Error(
        "Multible Enitites of this type exist - Singleton expected",
      );
    }

    if (entities.length === 0) {
      return this.createEntity(entityData, entityType);
    }

    Object.assign(entities[0], entityData);
    return entities[0];
  }

  createEntity<T extends object>(
    entityData: Partial<T>,
    entityType: ConstructorReference<T>,
  ): T {
    const entity = new entityType();
    Object.assign(entity, entityData);
    if (!this.entityMap.has(entityType)) {
      this.entityMap.set(entityType, []);
    }
    this.entityMap.get(entityType)!.push(entity);
    return entity;
  }

  getEntitiesOfType<T extends object>(
    entityType: ConstructorReference<T>,
  ): T[] {
    const retVal = this.entityMap.get(entityType) as T[];
    return retVal || [];
  }

  filterEntitiesOfType<T extends object>(
    entityType: ConstructorReference<T>,
    filter: (entity: T) => boolean,
  ): T[] {
    const entities = this.getEntitiesOfType(entityType);
    return entities.filter(filter);
  }

  deleteEntity(entity: object): void {
    const entityType = entity.constructor as ConstructorReference<object>;

    const entityList = this.entityMap.get(entityType);

    // Lets hope for the Garbage Collector to do the rest. If not, blame me ;) - PG
    if (entityList) {
      const index = entityList.indexOf(entity);
      if (index > -1) {
        entityList.splice(index, 1);
      }
    }
  }

  deleteAll(): void {
    this.entityMap.clear();
  }
}
