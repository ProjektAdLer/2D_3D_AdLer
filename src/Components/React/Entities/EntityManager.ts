import IEntityManager from "./IEntityManager";

export default class EntityManager implements IEntityManager {
  private data: string = "test";
  getData(): string {
    return this.data;
  }
}
