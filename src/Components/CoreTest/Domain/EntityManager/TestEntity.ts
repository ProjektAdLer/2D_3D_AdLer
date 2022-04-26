import AbstractEntity from "../../../Core/Domain/Entities/AbstractEntity";
import ObservablePrimitive from "../../../Core/Domain/EntityManager/Observables/ObservablePrimitive";

export default class TestEntity extends AbstractEntity {
  public member1: ObservablePrimitive<boolean> =
    new ObservablePrimitive<boolean>();
  public member2: ObservablePrimitive<string> = new ObservablePrimitive<string>(
    "initial"
  );
}
