import IEntityManager from "../../../../Core/BusinessLogic/EntityManager/IEntityManager";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";

import ObservablePrimitive from "../../../../Core/BusinessLogic/EntityManager/Observables/ObservablePrimitive";
import ObservableClass from "../../../../Core/BusinessLogic/EntityManager/Observables/ObservableClass";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
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
    CoreDIContainer.get<IEntityManager>(CORE_TYPES.IEntityManager);
  });

  afterEach(() => {
    CoreDIContainer.restore();
  });

  test("Callback gets Notified, when Primitive Value Changes", () => {
    const test = new ObservableClass<TestEntity>(TestEntity);
    const callback = jest.fn();

    test.Value.member2.subscribe(callback);
    test.Value.member2.setValue("CorrectValue");

    expect(callback).toHaveBeenCalledWith("CorrectValue");
  });

  test("Callback gets Notified, when Primitive Value in Class Changes", () => {
    const test = new ObservableClass<TestEntity>(TestEntity);

    test.subscribe((input: TestEntity) => {
      //@ts-ignore
      expect(input.member2.value).toBe("CorrectValue");
    });
    test.Value.member2.setValue("CorrectValue");
  });

  test("Callbacks can unsubscribe from the Observer", () => {
    const test = new ObservableClass<TestEntity>(TestEntity);
    const callback = jest.fn();

    test.Value.member2.subscribe(callback);
    test.Value.member2.setValue("SomeValue");
    test.Value.member2.unsubscribe(callback);
    test.Value.member2.setValue("SomeOtherValue");

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toBeCalledWith("SomeValue");
  });
});
