import { injectable } from "inversify";
import IEntityManager from "./IEntityManager";

@injectable()
export default class EntityManager implements IEntityManager {
  private data: string = "test";
  getData(): string {
    return this.data;
  }
}
