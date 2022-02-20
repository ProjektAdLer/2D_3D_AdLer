import { injectable } from "inversify";

@injectable()
export default class DataTransferObject {
  constructor() {
    this.dataTransferObjectValues = {
      elementCount: 5,
    };
  }
  private dataTransferObjectValues: { elementCount?: number };

  get DataTransferObjectValues(): object {
    if (!this.dataTransferObjectValues)
      throw new Error("DataTransferObjectValues not found!");
    return this.dataTransferObjectValues;
  }

  set DataTransferObjectValues(newDataTransferObjectValues: object) {
    this.dataTransferObjectValues = newDataTransferObjectValues;
  }

  extractElementCount(): number {
    if (!this.dataTransferObjectValues)
      throw new Error("dataTransferObjectValues not found!");
    if (!this.dataTransferObjectValues.elementCount)
      throw new Error("dataTransferObjectValues has no elementCount!");
    return this.dataTransferObjectValues.elementCount;
  }
}
