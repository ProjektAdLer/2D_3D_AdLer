import SimpleEvent from "../SimpleEvent";

describe("Observable", () => {
  let event: SimpleEvent;

  beforeEach(() => {
    event = new SimpleEvent();
  });

  test("subscribe adds subscriber", () => {
    const subscriber = jest.fn();
    event.subscribe(subscriber);

    expect(event["subscribers"]).toContain(subscriber);
  });

  test("subscribe doesn't add the same subscriber twice", () => {
    const subscriber = jest.fn();
    event.subscribe(subscriber);
    event.subscribe(subscriber);

    expect(event["subscribers"].length).toBe(1);
    expect(event["subscribers"]).toContain(subscriber);
  });

  test("unsubscribe removes subscriber", () => {
    const subscriber = jest.fn();

    event.subscribe(subscriber);
    expect(event["subscribers"]).toContain(subscriber);

    event.unsubscribe(subscriber);
    expect(event["subscribers"]).not.toContain(subscriber);
  });

  test("notifySubscribers notifies all subscribers", () => {
    const subscriber = jest.fn();
    event.subscribe(subscriber);
    event.notifySubscribers();

    expect(subscriber).toHaveBeenCalledTimes(1);
  });
});
