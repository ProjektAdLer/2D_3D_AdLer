import React from "react";
import { render } from "@testing-library/react";
import InternetLossModal from "../../../../../Core/Presentation/React/GeneralComponents/InternetLossModal/InternetLossModal";

describe("InternetLossModal", () => {
  test("doesn't render initially", () => {
    const { container } = render(<InternetLossModal />);
    expect(container.firstChild).toBeNull();
  });
});
