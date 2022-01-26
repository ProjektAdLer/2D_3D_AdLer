import { injectable } from "inversify";

@injectable()
export class DependencyA {
  private readonly name: string = "DependencyA";

  public getName(): string {
    return this.name;
  }
}

@injectable()
export class DependencyB {
  private readonly name: string = "DependencyB";

  public getName(): string {
    return this.name;
  }
}
