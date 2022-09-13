import { renderHook } from "@testing-library/react";
import Observable from "../../../../../../Lib/Observable";
import useObservable from "../../../../../Core/Presentation/React/ReactRelated/CustomHooks/useObservable";

describe("UseObservalbeHook", () => {
  test("should set the Observable value", () => {
    const consoleMock = jest
      .spyOn(console, "warn")
      .mockImplementation(() => {});
    const observable = new Observable<number>();
    const systemUnderTest = renderHook(() => useObservable(observable));
    systemUnderTest.result.current[1](1337);

    expect(observable.Value).toBe(1337);

    consoleMock.mockReset();
  });

  test("should warn, if observable is undefined", () => {
    console.warn = jest.fn();
    const systemUnderTest = renderHook(() => useObservable());
    systemUnderTest.result.current[1](1337);

    expect(console.warn).toHaveBeenCalled();
  });
});
