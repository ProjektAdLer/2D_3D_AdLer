import LocalStoragePort from "../../../Core/Adapters/LocalStoragePort/LocalStoragePort";

describe("LocalStoragePort", () => {
  let systemUnderTest: LocalStoragePort;
  let mockLocalStorage: Storage;

  beforeEach(() => {
    // Create a mock localStorage
    let store: { [key: string]: string } = {};
    mockLocalStorage = {
      getItem: jest.fn((key: string) => store[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: jest.fn((key: string) => {
        delete store[key];
      }),
      clear: jest.fn(() => {
        store = {};
      }),
      key: jest.fn(),
      length: 0,
    };

    // Replace global localStorage with mock
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
      writable: true,
    });

    systemUnderTest = new LocalStoragePort();
  });

  test("setItem stores value in localStorage", () => {
    systemUnderTest.setItem("testKey", "testValue");
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "testKey",
      "testValue",
    );
  });

  test("getItem retrieves value from localStorage", () => {
    mockLocalStorage.setItem("testKey", "testValue");
    const result = systemUnderTest.getItem("testKey");
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith("testKey");
    expect(result).toBe("testValue");
  });

  test("getItem returns null for non-existent key", () => {
    const result = systemUnderTest.getItem("nonExistentKey");
    expect(result).toBeNull();
  });

  test("removeItem deletes value from localStorage", () => {
    mockLocalStorage.setItem("testKey", "testValue");
    systemUnderTest.removeItem("testKey");
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("testKey");
  });

  test("setItem and getItem work together", () => {
    systemUnderTest.setItem("key1", "value1");
    systemUnderTest.setItem("key2", "value2");
    expect(systemUnderTest.getItem("key1")).toBe("value1");
    expect(systemUnderTest.getItem("key2")).toBe("value2");
  });

  test("removeItem makes key return null", () => {
    systemUnderTest.setItem("testKey", "testValue");
    systemUnderTest.removeItem("testKey");
    expect(systemUnderTest.getItem("testKey")).toBeNull();
  });
});
