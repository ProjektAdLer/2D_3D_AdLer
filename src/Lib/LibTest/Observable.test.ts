import Observable from "../Observable";

describe("Observable", () => {
  let systemUnderTest: Observable<number>;

  beforeEach(() => {
    systemUnderTest = new Observable<number>();
  });

  test("constructor sets given default value, Value getter returns internal value", () => {
    systemUnderTest = new Observable<number>(1);

    expect(systemUnderTest.Value).toBe(1);
  });

  test("subscribe adds subscriber", () => {
    const subscriber = jest.fn();
    systemUnderTest.subscribe(subscriber);

    expect(systemUnderTest["subscribers"]).toContain(subscriber);
  });

  test("subscribe doesn't add the same subscriber twice", () => {
    const subscriber = jest.fn();
    systemUnderTest.subscribe(subscriber);
    systemUnderTest.subscribe(subscriber);

    expect(systemUnderTest["subscribers"].length).toBe(1);
    expect(systemUnderTest["subscribers"]).toContain(subscriber);
  });

  test("unsubscribe removes subscriber", () => {
    const subscriber = jest.fn();

    systemUnderTest.subscribe(subscriber);
    expect(systemUnderTest["subscribers"]).toContain(subscriber);

    systemUnderTest.unsubscribe(subscriber);
    expect(systemUnderTest["subscribers"]).not.toContain(subscriber);
  });

  test("Value setter sets the internal value", () => {
    const newNumber = 2;
    systemUnderTest.Value = newNumber;

    expect(systemUnderTest.Value).toBe(newNumber);
  });

  test("setting a new value nofities all subscribers", () => {
    const subscriber = jest.fn();
    const newNumber = 2;

    systemUnderTest.subscribe(subscriber);
    systemUnderTest.Value = newNumber;

    expect(subscriber).toHaveBeenCalledTimes(1);
    expect(subscriber).toHaveBeenCalledWith(newNumber);
  });

  test("setting the same value notifies all subscribers if notifyOnSameValue is set to true in the constructor", () => {
    const subscriber = jest.fn();
    const newNumber = 2;

    systemUnderTest = new Observable<number>(newNumber, true);

    systemUnderTest.subscribe(subscriber);
    systemUnderTest.Value = newNumber;

    expect(subscriber).toHaveBeenCalledTimes(1);
    expect(subscriber).toHaveBeenCalledWith(newNumber);
  });

  test("setting the same value doesn't notify any subscribers if notifyOnSameValue is set to false in the constructor", () => {
    const subscriber = jest.fn();
    const newNumber = 2;

    systemUnderTest = new Observable<number>(newNumber);

    systemUnderTest.subscribe(subscriber);
    systemUnderTest.Value = newNumber;

    expect(subscriber).toHaveBeenCalledTimes(0);
  });
});
