import { DependencyA, DependencyB } from './dependencies';
import { injectable, inject } from 'inversify';

@injectable()
export class Service {
  protected depA: DependencyA;
  protected depB: DependencyB;

  constructor(@inject(DependencyA) depA: DependencyA, @inject(DependencyB) depB: DependencyB) {
    this.depA = depA;
    this.depB = depB;
  }

  public getAllNames(): string[] {
    return [this.depA.getName(), this.depB.getName()];
  }
}
