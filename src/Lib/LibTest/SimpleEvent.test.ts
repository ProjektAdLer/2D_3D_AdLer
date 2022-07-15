import SimpleEvent from "../SimpleEvent";

describe("Observable", () => {
  let systemUnderTest: SimpleEvent;

  beforeEach(() => {
    systemUnderTest = new SimpleEvent();
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

  test("notifySubscribers notifies all subscribers", () => {
    const subscriber = jest.fn();
    systemUnderTest.subscribe(subscriber);
    systemUnderTest.notifySubscribers();

    expect(subscriber).toHaveBeenCalledTimes(1);
  });
});
