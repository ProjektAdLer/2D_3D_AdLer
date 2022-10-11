import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SpaceNamePanelViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceNamePanel/SpaceNamePanelViewModel";
import SpaceNamePanel from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceNamePanel/SpaceNamePanel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import React from "react";

const fakeModel = new SpaceNamePanelViewModel();

describe("WorldNamePanel", () => {
  test("should render", () => {
    fakeModel.name.Value = "Test World";
    useBuilderMock([fakeModel, undefined]);

    const componentUnderTest = render(<SpaceNamePanel />);

    expect(componentUnderTest.getByText("Test World")).toBeInTheDocument();
  });

  test("should nor render, if no World name is provided", () => {
    useBuilderMock([new SpaceNamePanelViewModel(), undefined]);

    const componentUnderTest = render(<SpaceNamePanel />);

    expect(componentUnderTest.queryByText("Test World")).toBeNull();
  });
});
