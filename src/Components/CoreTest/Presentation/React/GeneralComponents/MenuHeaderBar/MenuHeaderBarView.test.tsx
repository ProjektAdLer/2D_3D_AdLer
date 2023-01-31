import { render } from "@testing-library/react";
import mock from "jest-mock-extended/lib/Mock";
import MenuHeaderBar from "../../../../../Core/Presentation/React/GeneralComponents/MenuHeaderBar/MenuHeaderBar";
import MenuHeaderBarViewModel from "../../../../../Core/Presentation/React/GeneralComponents/MenuHeaderBar/MenuHeaderBarViewModel";
import IMenuHeaderBarController from "../../../../../Core/Presentation/React/GeneralComponents/MenuHeaderBar/IMenuHeaderBarController";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import React from "react";

describe("MenuHeaderBar", () => {
  test("should render", () => {
    useBuilderMock([
      new MenuHeaderBarViewModel(),
      mock<IMenuHeaderBarController>(),
    ]);
    render(<MenuHeaderBar />);
  });

  test("doesn't render without controller", () => {
    useBuilderMock([new MenuHeaderBarViewModel(), undefined]);
    const { container } = render(<MenuHeaderBar />);
    expect(container.firstChild).toBeNull();
  });

  test("doesn't render without view model", () => {
    useBuilderMock([undefined, mock<IMenuHeaderBarController>()]);
    const { container } = render(<MenuHeaderBar />);
    expect(container.firstChild).toBeNull();
  });
});
