import { fireEvent, render } from "@testing-library/react";
import { Provider } from "inversify-react";
import { mock } from "jest-mock-extended";
import React from "react";
import ISpaceSelectionController from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/ISpaceSelectionController";
import SpaceSelectionGraph from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/Graph/SpaceSelectionGraph";
import SpaceSelectionViewModel from "../../../../../Core/Presentation/React/SpaceMenu/SpaceSelection/SpaceSelectionViewModel";
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
        isCompleted: false,
        requiredSpaces: [],
      },
      {
        id: 3,
        name: "test",
        isAvailable: false,
        isCompleted: false,
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
    expect(nodes.length).toBe(3);
    expect(nodes[0].getAttribute("data-id")).toBe("1");
    expect(nodes[1].getAttribute("data-id")).toBe("2");
    expect(nodes[2].getAttribute("data-id")).toBe("3");
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
      {
        id: 3,
        name: "test",
        isAvailable: true,
        isCompleted: true,
        requiredSpaces: [1, 2],
      },
    ];
    const controllerMock = mock<ISpaceSelectionController>();

    const { container } = render(
      <ReactFlowProvider>
        <SpaceSelectionGraph controller={controllerMock} viewModel={vm} />
      </ReactFlowProvider>
    );

    const edges = container.querySelectorAll(".react-flow__edge");
    expect(edges.length).toBe(3);
    expect(edges[0].getAttribute("data-testid")).toContain("edge-1-2");
    expect(edges[1].getAttribute("data-testid")).toContain("edge-1-3");
    expect(edges[2].getAttribute("data-testid")).toContain("edge-2-3");
  });

  test("calls controller with space id when a node is clicked", () => {
    const vm = new SpaceSelectionViewModel();
    const spaceID = 42;
    vm.spaces.Value = [
      {
        id: spaceID,
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
    const node = container.querySelector(".react-flow__node");
    expect(node).not.toBeNull();

    fireEvent.click(node!);
    expect(controllerMock.onSpaceClicked).toBeCalledWith(spaceID);
  });
});
