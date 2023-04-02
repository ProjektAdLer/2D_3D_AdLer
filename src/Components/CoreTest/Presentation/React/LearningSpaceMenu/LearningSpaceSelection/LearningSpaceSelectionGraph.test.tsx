import { fireEvent, render, waitFor, act } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import React from "react";
import ILearningSpaceSelectionController from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceSelection/ILearningSpaceSelectionController";
import LearningSpaceSelectionGraph from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceSelection/Graph/LearningSpaceSelectionGraph";
import LearningSpaceSelectionViewModel from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceSelection/LearningSpaceSelectionViewModel";
import { ReactFlowProvider } from "reactflow";
import { ElkLayoutArguments, ElkNode } from "elkjs/lib/elk.bundled.js";

// mock elk to prevent async layouting
jest.mock("elkjs/lib/elk.bundled.js", () => {
  return function () {
    return {
      layout: (graph: ElkNode, args?: ElkLayoutArguments) => {
        graph.children!.forEach((child) => {
          child.x = 42;
          child.y = 42;
        });
        return Promise.resolve(graph);
      },
    };
  };
});

describe("LearningSpaceSelectionGraph", () => {
  test("should render", () => {
    const vm = new LearningSpaceSelectionViewModel();
    const controllerMock = mock<ILearningSpaceSelectionController>();

    const { container } = render(
      <ReactFlowProvider>
        <LearningSpaceSelectionGraph
          controller={controllerMock}
          viewModel={vm}
        />
      </ReactFlowProvider>
    );
  });

  test("creates a node for each space with correct data_id's", () => {
    const vm = new LearningSpaceSelectionViewModel();
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
    const controllerMock = mock<ILearningSpaceSelectionController>();

    const { container } = render(
      <ReactFlowProvider>
        <LearningSpaceSelectionGraph
          controller={controllerMock}
          viewModel={vm}
        />
      </ReactFlowProvider>
    );

    const nodes = container.querySelectorAll(".react-flow__node");
    waitFor(() => {
      expect(nodes.length).toBe(3);
      expect(nodes[0].getAttribute("data-id")).toBe("1");
      expect(nodes[1].getAttribute("data-id")).toBe("2");
      expect(nodes[2].getAttribute("data-id")).toBe("3");
    });
  });

  test("creates an edge for each required space", () => {
    const vm = new LearningSpaceSelectionViewModel();
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
        requiredSpaces: [{ id: 1, isCompleted: true }],
      },
      {
        id: 3,
        name: "test",
        isAvailable: true,
        isCompleted: true,
        requiredSpaces: [
          { id: 1, isCompleted: true },
          { id: 2, isCompleted: true },
        ],
      },
    ];
    const controllerMock = mock<ILearningSpaceSelectionController>();

    const { container } = render(
      <ReactFlowProvider>
        <LearningSpaceSelectionGraph
          controller={controllerMock}
          viewModel={vm}
        />
      </ReactFlowProvider>
    );

    const edges = container.querySelectorAll(".react-flow__edge");

    waitFor(() => {
      expect(edges.length).toBe(3);
      expect(edges[0].getAttribute("data-testid")).toContain("edge-1-2");
      expect(edges[1].getAttribute("data-testid")).toContain("edge-1-3");
      expect(edges[2].getAttribute("data-testid")).toContain("edge-2-3");
    });
  });

  test.todo("sets node position calculated by elk");

  test("calls controller with space id when a node is clicked", async () => {
    const vm = new LearningSpaceSelectionViewModel();
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
    const controllerMock = mock<ILearningSpaceSelectionController>();

    const container = render(
      <ReactFlowProvider>
        <LearningSpaceSelectionGraph
          controller={controllerMock}
          viewModel={vm}
        />
      </ReactFlowProvider>
    );
    const node = await container.findByTestId("rf__node-42");

    act(() => {
      fireEvent.click(node);
    });
    expect(controllerMock.onLearningSpaceClicked).toBeCalledWith(spaceID);
  });
});
