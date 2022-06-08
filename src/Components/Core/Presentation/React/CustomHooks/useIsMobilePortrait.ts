import { useEffect, useState } from "react";

export default function useIsMobilePortrait(): boolean {
  const [mobilePortrait, setMobilePortrait] = useState(
    window.orientation === 0
  );

  const testMobileOrientation = () => {
    setMobilePortrait(window.orientation === 0);
  };

  useEffect(() => {
    window.addEventListener("orientationchange", testMobileOrientation);
  }, []);

  return mobilePortrait;
}
