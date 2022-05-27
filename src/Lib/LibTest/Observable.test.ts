import Observable from "../Observable";

describe("Observable", () => {
  let observable: Observable<number>;

  beforeEach(() => {
    observable = new Observable<number>();
  });

  test("constructor sets given default value, Value getter returns internal value", () => {
    observable = new Observable<number>(1);

    expect(observable.Value).toBe(1);
  });

  test("subscribe adds subscriber", () => {
    const subscriber = jest.fn();
    observable.subscribe(subscriber);

    expect(observable["subscribers"]).toContain(subscriber);
  });

  test("subscribe doesn't add the same subscriber twice", () => {
    const subscriber = jest.fn();
    observable.subscribe(subscriber);
    observable.subscribe(subscriber);

    expect(observable["subscribers"].length).toBe(1);
    expect(observable["subscribers"]).toContain(subscriber);
  });

  test("unsubscribe removes subscriber", () => {
    const subscriber = jest.fn();

    observable.subscribe(subscriber);
    expect(observable["subscribers"]).toContain(subscriber);

    observable.unsubscribe(subscriber);
    expect(observable["subscribers"]).not.toContain(subscriber);
  });

  test("Value setter sets the internal value", () => {
    const newNumber = 2;
    observable.Value = newNumber;

    expect(observable.Value).toBe(newNumber);
  });

  test("setting a new value nofities all subscribers", () => {
    const subscriber = jest.fn();
    const newNumber = 2;

    observable.subscribe(subscriber);
    observable.Value = newNumber;

    expect(subscriber).toHaveBeenCalledTimes(1);
    expect(subscriber).toHaveBeenCalledWith(newNumber);
  });

  test("setting the same value notifies all subscribers if notifyOnSameValue is set to true in the constructor", () => {
    const subscriber = jest.fn();
    const newNumber = 2;

    observable = new Observable<number>(newNumber, true);

    observable.subscribe(subscriber);
    observable.Value = newNumber;

    expect(subscriber).toHaveBeenCalledTimes(1);
    expect(subscriber).toHaveBeenCalledWith(newNumber);
  });

  test("setting the same value doesn't notify any subscribers if notifyOnSameValue is set to false in the constructor", () => {
    const subscriber = jest.fn();
    const newNumber = 2;

    observable = new Observable<number>(newNumber);

    observable.subscribe(subscriber);
    observable.Value = newNumber;

    expect(subscriber).toHaveBeenCalledTimes(0);
  });
});
