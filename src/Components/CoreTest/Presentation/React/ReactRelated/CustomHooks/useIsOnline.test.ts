import { renderHook } from "@testing-library/react";
import useIsOnline from "../../../../../Core/Presentation/React/ReactRelated/CustomHooks/useIsOnline";

describe("useIsOnline", () => {
  let windowSpy;

  beforeEach(() => {
    windowSpy = jest.spyOn(window, "window", "get");
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  test.skip("should return initially true if window.navigator.onLine is true", () => {
    windowSpy.mockImplementation(() => ({
      navigator: {
        onLine: true,
      },
    }));

    const { result } = renderHook(() => useIsOnline());

    expect(result.current).toBe(true);
  });
});
