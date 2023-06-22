import { Semaphore } from "../Semaphore";

describe("Semaphore", () => {
  it("should be able to acquire a lock", async () => {
    const systemUnterTest = new Semaphore("label", 2);
    const lock = await systemUnterTest.acquire();
    expect(lock).toBeDefined();
  });

  it("should be able to release a lock", async () => {
    const systemUnterTest = new Semaphore("label", 2);
    const lock = await systemUnterTest.acquire();
    lock.release();
  });

  it("should be able to acquire a lock twice", async () => {
    const systemUnterTest = new Semaphore("label", 2);
    const lock = await systemUnterTest.acquire();
    const lock2 = await systemUnterTest.acquire();
    expect(lock).toBeDefined();
    expect(lock2).toBeDefined();
  });

  it("should throw, if the max value is invalid", async () => {
    expect(() => new Semaphore("label", 0)).toThrow();
  });

  test("should lock a task until it can be completed", async () => {
    const systemUnterTest = new Semaphore("label", 1);
    const func1 = async () => {
      const lock = await systemUnterTest.acquire();
      const randomTime = Math.floor(Math.random() * 100);
      await new Promise((resolve) => setTimeout(resolve, randomTime));
      lock.release();
    };

    await Promise.all([func1(), func1(), func1(), func1(), func1(), func1()]);
  });
});
