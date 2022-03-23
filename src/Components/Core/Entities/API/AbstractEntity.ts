import { v4 as uuidv5 } from "uuid";
export default abstract class AbstractEntity {
  constructor() {
    // To ensure, that the Entity has a unique ID, we generate a UUID right here in the constructor - PG
    this.id = uuidv5();
  }
  readonly id: string;
}
