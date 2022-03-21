import ObservableClass from "../BusinessLogic/EntityManager/ObservableClass";
import ObservablePrimitive from "../BusinessLogic/EntityManager/ObservablePrimitive";

export default class TestEntity {
  public value1: ObservablePrimitive<boolean> =
    new ObservablePrimitive<boolean>(true);
  public value2: ObservablePrimitive<string> = new ObservablePrimitive<string>(
    "false"
  );
}
