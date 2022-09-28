import { render } from "@testing-library/react";
import WelcomePage from "~ReactComponents/ReactRelated/ReactEntryPoint/WelcomePage";
import useBuilderMock from "../CustomHooks/useBuilder/useBuilderMock";

describe("Welcome Page", () => {
  test("should render", () => {
    useBuilderMock([undefined, undefined]);
    render(<WelcomePage />);
  });
});
