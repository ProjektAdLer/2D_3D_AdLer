import { fireEvent, renderHook } from "@testing-library/react";
import useIsMobilePortrait from "../../../../../Core/Presentation/React/ReactRelated/CustomHooks/useIsMobilePortrait";

describe("IsMobileOrientationHook", () => {
  test("should detect the Orientation on Mobile", () => {
    const systemUnderTest = renderHook(() => useIsMobilePortrait());
    window.orientation = 0;
    fireEvent(window, new Event("orientationchange"));
    expect(systemUnderTest.result.current).toBe(true);
  });
});
