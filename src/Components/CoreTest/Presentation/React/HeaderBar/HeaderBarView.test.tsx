import { render } from "@testing-library/react";
import mock from "jest-mock-extended/lib/Mock";
import HeaderBar from "~ReactComponents/HeaderBar/HeaderBar";
import HeaderBarViewModel from "~ReactComponents/HeaderBar/HeaderBarViewModel";
import IHeaderBarController from "~ReactComponents/HeaderBar/IHeaderBarController";
import useBuilderMock from "../CustomHooks/useBuilder/useBuilderMock";

describe("HeaderBar", () => {
  test("should render", () => {
    useBuilderMock([new HeaderBarViewModel(), mock<IHeaderBarController>()]);
    render(<HeaderBar />);
  });

  test("doesn't render without controller", () => {
    useBuilderMock([new HeaderBarViewModel(), undefined]);
    const { container } = render(<HeaderBar />);
    expect(container.firstChild).toBeNull();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, mock<IHeaderBarController>()]);
    const { container } = render(<HeaderBar />);
    expect(container.firstChild).toBeNull();
  });
});
