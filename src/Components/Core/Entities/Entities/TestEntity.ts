import ObservablePrimitive from "../../BusinessLogic/EntityManager/Observables/ObservablePrimitive";
import AbstractEntity from "../API/AbstractEntity";

export default class TestEntity extends AbstractEntity {
  public member1: ObservablePrimitive<boolean> =
    new ObservablePrimitive<boolean>();
  public member2: ObservablePrimitive<string> = new ObservablePrimitive<string>(
    "initial"
  );
}
