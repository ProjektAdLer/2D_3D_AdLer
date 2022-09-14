import { render } from "@testing-library/react";
import mock from "jest-mock-extended/lib/Mock";
import HeaderBar from "~ReactComponents/RoomMenu/HeaderBar/HeaderBar";
import HeaderBarViewModel from "~ReactComponents/RoomMenu/HeaderBar/HeaderBarViewModel";
import IHeaderBarController from "~ReactComponents/RoomMenu/HeaderBar/IHeaderBarController";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

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
