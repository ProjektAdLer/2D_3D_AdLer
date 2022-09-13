import { render } from "@testing-library/react";
import WelcomePage from "~ReactComponents/ReactRelated/ReactEntryPoint/WelcomePage";

describe("Welcome Page", () => {
  test("should render", () => {
    const componentUnderTest = render(<WelcomePage />);
  });
});
