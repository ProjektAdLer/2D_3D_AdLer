import { render } from "@testing-library/react";
import { Provider } from "inversify-react";
import { mock } from "jest-mock-extended";
import React from "react";
import CoreDIContainer from "../../../../../Core/DependencyInjection/CoreDIContainer";
import ISpaceSelectionController from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/ISpaceSelectionController";
import SpaceSelectionGraph from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/Graph/SpaceSelectionGraph";
import SpaceSelectionViewModel from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/SpaceSelectionViewModel";
import useBuilderMock from "../../ReactRelated/CustomHooks/useBuilder/useBuilderMock";
import { ReactFlowProvider } from "reactflow";

describe("SpaceSelectionGraph", () => {
  test("should render", () => {
    const vm = new SpaceSelectionViewModel();
    const controllerMock = mock<ISpaceSelectionController>();

    const { container } = render(
      <ReactFlowProvider>
        <SpaceSelectionGraph controller={controllerMock} viewModel={vm} />
      </ReactFlowProvider>
    );
  });

  test("creates a node for each space with correct data_id's", () => {
    const vm = new SpaceSelectionViewModel();
    vm.spaces.Value = [
      {
        id: 1,
        name: "test",
        isAvailable: true,
        isCompleted: true,
        requiredSpaces: [],
      },
      {
        id: 2,
        name: "test",
        isAvailable: true,
        isCompleted: true,
        requiredSpaces: [],
      },
    ];
    const controllerMock = mock<ISpaceSelectionController>();

    const { container } = render(
      <ReactFlowProvider>
        <SpaceSelectionGraph controller={controllerMock} viewModel={vm} />
      </ReactFlowProvider>
    );

    const nodes = container.querySelectorAll(".react-flow__node");
    expect(nodes.length).toBe(2);
    expect(nodes[0].getAttribute("data-id")).toBe("1");
    expect(nodes[1].getAttribute("data-id")).toBe("2");
  });

  test("creates an edge for each required space", () => {
    const vm = new SpaceSelectionViewModel();
    vm.spaces.Value = [
      {
        id: 1,
        name: "test",
        isAvailable: true,
        isCompleted: true,
        requiredSpaces: [],
      },
      {
        id: 2,
        name: "test",
        isAvailable: true,
        isCompleted: true,
        requiredSpaces: [1],
      },
    ];
    const controllerMock = mock<ISpaceSelectionController>();

    const { container } = render(
      <ReactFlowProvider>
        <SpaceSelectionGraph controller={controllerMock} viewModel={vm} />
      </ReactFlowProvider>
    );

    const edges = container.querySelectorAll(".react-flow__edge");
    expect(edges.length).toBe(1);
    expect(edges[0].getAttribute("data-testid")).toContain("edge-1-2");
  });
});
