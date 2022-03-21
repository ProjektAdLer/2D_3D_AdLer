import ObservablePrimitive from "../src/Components/Core/BusinessLogic/EntityManager/ObservablePrimitive";

export default class TestEntity {
  public member1: ObservablePrimitive<boolean> =
    new ObservablePrimitive<boolean>(true);
  public member2: ObservablePrimitive<string> = new ObservablePrimitive<string>(
    "false"
  );
}
