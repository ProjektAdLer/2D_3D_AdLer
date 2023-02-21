import { render } from "@testing-library/react";
import { Provider } from "inversify-react";
import { mock } from "jest-mock-extended";
import React from "react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import ISpaceSelectionGraphController from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelectionGraph/ISpaceSelectionGraphController";
import SpaceSelectionGraph from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelectionGraph/SpaceSelectionGraph";
import SpaceSelectionGraphViewModel from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelectionGraph/SpaceSelectionGraphViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";

describe("SpaceSelectionGraph", () => {
  test("shouldn't render when controller isn't available", () => {
    useBuilderMock([undefined, undefined]);

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <SpaceSelectionGraph />
      </Provider>
    );

    expect(container).toBeEmptyDOMElement();
  });

  test("should render", () => {
    const vm = new SpaceSelectionGraphViewModel();
    const controllerMock = mock<ISpaceSelectionGraphController>();
    useBuilderMock([vm, controllerMock]);

    const { container } = render(
      <Provider container={CoreDIContainer}>
        <SpaceSelectionGraph />
      </Provider>
    );
  });
});
