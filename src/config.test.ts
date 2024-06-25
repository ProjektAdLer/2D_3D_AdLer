import { getServerURL } from "./config";

interface EnvironmentVariables {
  _env_: {
    API_URL: string;
  };
}

describe("config", () => {
  const oldProcessEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...oldProcessEnv };
  });

  afterAll(() => {
    process.env = oldProcessEnv;
  });

  test("getServerURL returns API_URL set in window when in production", () => {
    process.env.NODE_ENV = "production";

    const customWindow = window as Window &
      typeof globalThis &
      EnvironmentVariables;

    customWindow._env_ = {
      API_URL: "testURL",
    };

    expect(getServerURL()).toBe("testURL");
  });

  test("getServerURL throws if process.env.REACT_APP_API_SERVER_URL is not set", () => {
    process.env.NODE_ENV = "test";
    process.env.REACT_APP_API_SERVER_URL = undefined;

    expect(() => getServerURL()).toThrow();
  });
});
