import { v4 as uuidv4 } from "uuid";
export default abstract class AbstractEntity {
  constructor() {
    // To ensure, that the Entity has a unique ID, we generate a UUID right here in the constructor - PG
    this.id = uuidv4();
  }
  readonly id: string;
}
