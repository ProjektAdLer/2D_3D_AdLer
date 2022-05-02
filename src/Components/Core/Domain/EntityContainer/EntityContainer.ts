import { injectable } from "inversify";
import { ConstructorReference } from "../../Types/EntityManagerTypes";
import AbstractEntity from "../Entities/AbstractEntity";
import RootEntity from "../Entities/RootEntity";
import IEntityContainer from "./IEntityContainer";

@injectable()
export default class EntityContainer implements IEntityContainer {
  private entityMap = new Map<
    ConstructorReference<AbstractEntity>,
    AbstractEntity[]
  >();

  private rootEntity: RootEntity;

  constructor() {
    this.rootEntity = new RootEntity();
    this.entityMap.set(RootEntity, [this.rootEntity]);
  }
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

  getEntitiesOfType<T extends AbstractEntity>(
    entityType: ConstructorReference<T>
  ): T[] {
    const retVal = this.entityMap.get(entityType) as T[];
    return retVal || [];
  }
  deleteEntity(entity: AbstractEntity): void {
    const entityType =
      entity.constructor as ConstructorReference<AbstractEntity>;

    const entityList = this.entityMap.get(entityType);

    // Lets hope for the Garbage Collector to do the rest. If not, blame me ;) - PG
    if (entityList) {
      const index = entityList.indexOf(entity);
      if (index > -1) {
        entityList.splice(index, 1);
      }
    }
  }

  getRootEntity(): RootEntity {
    if (!this.rootEntity) throw new Error("Root Entity not set");
    return this.rootEntity;
  }
}
