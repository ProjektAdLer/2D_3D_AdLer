import IEntityManager from "../../../../Core/BusinessLogic/EntityManager/IEntityManager";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import REACT_TYPES from "../../../../React/DependencyInjection/ReactTypes";

import ObservablePrimitive from "../../../../Core/BusinessLogic/EntityManager/Observables/ObservablePrimitive";
import ObservableClass from "../../../../Core/BusinessLogic/EntityManager/Observables/ObservableClass";
class TestEntity {
  public id = "id";
  public member1: ObservablePrimitive<boolean> =
    new ObservablePrimitive<boolean>(true);
  public member2: ObservablePrimitive<string> = new ObservablePrimitive<string>(
    "false"
  );
}

describe("Observables", () => {
  beforeEach(() => {
    CoreDIContainer.snapshot();
    CoreDIContainer.get<IEntityManager>(REACT_TYPES.IEntityManager);
  });

  afterEach(() => {
    CoreDIContainer.restore();
  });

  test("Callback gets Notified, when Primitive Value Changes", () => {
    const test = new ObservableClass<TestEntity>(TestEntity);
    const callback = jest.fn();

    test.Value.member2.subscribe(callback);
    test.Value.member2.Value = "CorrectValue";

    expect(callback).toHaveBeenCalledWith("CorrectValue");
  });

  test("Callback gets Notified, when Primitive Value in Class Changes", () => {
    const test = new ObservableClass<TestEntity>(TestEntity);

    test.subscribe((input: TestEntity) => {
      //@ts-ignore
      expect(input.member2.value).toBe("CorrectValue");
    });
    test.Value.member2.Value = "CorrectValue";
  });

  test("Callbacks can unsubscribe from the Observer", () => {
    const test = new ObservableClass<TestEntity>(TestEntity);
    const callback = jest.fn();

    test.Value.member2.subscribe(callback);
    test.Value.member2.Value = "SomeValue";
    test.Value.member2.unsubscribe(callback);
    test.Value.member2.Value = "SomeOtherValue";

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toBeCalledWith("SomeValue");
  });
});
