import { fireEvent, render, waitFor, act } from "@testing-library/react";
import { mock } from "jest-mock-extended";
import React from "react";
import ILearningSpaceSelectionController from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceSelection/ILearningSpaceSelectionController";
import LearningSpaceSelectionGraph from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceSelection/Graph/LearningSpaceSelectionGraph";
import LearningSpaceSelectionViewModel from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningSpaceSelection/LearningSpaceSelectionViewModel";
import { ReactFlowProvider } from "reactflow";
import { ElkLayoutArguments, ElkNode } from "elkjs/lib/elk.bundled.js";
import {
  BooleanAndNode,
  BooleanIDNode,
  BooleanOrNode,
} from "../../../../../Core/Application/UseCases/CalculateLearningSpaceAvailability/Parser/BooleanSyntaxTree";

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

    expect(container).not.toBeEmptyDOMElement();
  });

  test("creates a node for each space with correct data_id's", () => {
    const vm = new LearningSpaceSelectionViewModel();
    vm.spaces.Value = [
      {
        id: 1,
        name: "test",
        isAvailable: true,
        isCompleted: true,
        requirementsSyntaxTree: null,
      },
      {
        id: 2,
        name: "test",
        isAvailable: true,
        isCompleted: false,
        requirementsSyntaxTree: null,
      },
      {
        id: 3,
        name: "test",
        isAvailable: false,
        isCompleted: false,
        requirementsSyntaxTree: null,
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

  test("creates a node for each boolean operator in the requirements", () => {
    const vm = new LearningSpaceSelectionViewModel();
    vm.spaces.Value = [
      {
        id: 1,
        name: "test",
        isAvailable: true,
        isCompleted: true,
        requirementsSyntaxTree: null,
      },
      {
        id: 2,
        name: "test",
        isAvailable: true,
        isCompleted: true,
        requirementsSyntaxTree: null,
      },
      {
        id: 3,
        name: "test",
        isAvailable: true,
        isCompleted: true,
        requirementsSyntaxTree: new BooleanAndNode([
          new BooleanIDNode(1),
          new BooleanIDNode(2),
        ]),
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
      expect(nodes.length).toBe(4);
    });
  });

  test("creates an edge for each node inside requirements", () => {
    const vm = new LearningSpaceSelectionViewModel();
    vm.spaces.Value = [
      {
        id: 1,
        name: "test",
        isAvailable: true,
        isCompleted: true,
        requirementsSyntaxTree: null,
      },
      {
        id: 2,
        name: "test",
        isAvailable: true,
        isCompleted: true,
        requirementsSyntaxTree: null,
      },
      {
        id: 3,
        name: "test",
        isAvailable: true,
        isCompleted: true,
        requirementsSyntaxTree: new BooleanOrNode([
          new BooleanIDNode(1),
          new BooleanIDNode(2),
        ]),
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
        requirementsSyntaxTree: null,
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
