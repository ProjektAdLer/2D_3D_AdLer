import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import WorldNamePanel from "../../../../../Core/Presentation/React/SpaceDisplay/WorldNamePanel/WorldNamePanel";
import WorldNamePanelViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/WorldNamePanel/WorldNamePanelViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

const fakeModel = new WorldNamePanelViewModel();

describe("WorldNamePanel", () => {
  test("should render", () => {
    fakeModel.worldName.Value = "Test World";
    useBuilderMock([fakeModel, undefined]);

    const componentUnderTest = render(<WorldNamePanel />);

    expect(componentUnderTest.getByText("Test World")).toBeInTheDocument();
  });

  test("should nor render, if no World name is provided", () => {
    useBuilderMock([new WorldNamePanelViewModel(), undefined]);

    const componentUnderTest = render(<WorldNamePanel />);

    expect(componentUnderTest.queryByText("Test World")).toBeNull();
  });
});
