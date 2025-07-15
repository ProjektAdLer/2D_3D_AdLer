import spaceSolved from "../../../../../../../Assets/icons/check-solution.svg";
import spaceAvailable from "../../../../../../../Assets/icons/unlocked.svg";
import spaceLocked from "../../../../../../../Assets/icons/locked.svg";

import ILearningSpaceSelectionController from "../ILearningSpaceSelectionController";
import LearningSpaceSelectionViewModel, {
  LearningSpaceSelectionLearningSpaceData,
} from "../LearningSpaceSelectionViewModel";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  NodeMouseHandler,
  NodeTypes,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { CSSProperties, useCallback, useEffect } from "react";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import LearningSpaceSelectionSpaceNode, {
  LearningSpaceSelectionSpaceNodeType,
} from "./LearningSpaceSelectionSpaceNode";
import {
  BooleanAndNode,
  BooleanIDNode,
  BooleanOrNode,
} from "src/Components/Core/Application/UseCases/CalculateLearningSpaceAvailability/Parser/BooleanSyntaxTree";
import LearningSpaceSelectionRequirementNode, {
  BooleanOperatorType,
} from "./LearningSpaceSelectionRequirementNode";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ILoggerPort from "src/Components/Core/Application/Ports/Interfaces/ILoggerPort";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import * as dagre from "@dagrejs/dagre";

export const SPACE_NODE_WIDTH = 200; // to be used in LearningSpaceSelectionSpaceNode.tsx
export const REQ_NODE_WIDTH = 64; // to be used in LearningSpaceSelectionRequirementNode.tsx
const NODE_HEIGHT = 60;
// see https://github.com/dagrejs/dagre/wiki#configuring-the-layout for more options
const dagreLayoutConfig: dagre.GraphLabel = {
  ranksep: 25,
  nodesep: 25,
};

// node types for react flow with reference to the components
const nodeTypes: NodeTypes = {
  spaceNode: LearningSpaceSelectionSpaceNode,
  requirementNode: LearningSpaceSelectionRequirementNode,
};

export default function LearningSpaceSelectionGraph(props: {
  controller: ILearningSpaceSelectionController;
  viewModel: LearningSpaceSelectionViewModel;
}) {
  const reactFlowInstance = useReactFlow();
  const [spaces] = useObservable(props.viewModel.spaces);
  const [lastSelectedSpaceID] = useObservable(props.viewModel.selectedSpaceID);
  const logger = CoreDIContainer.get<ILoggerPort>(CORE_TYPES.ILogger);

  useEffect(() => {
    if (spaces === undefined || spaces.length === 0) return;

    const setupGraph = async () => {
      logger.log(
        LogLevelTypes.INFO,
        "LearningSpaceSelectionGraph, Graph Setup",
      );

      const requirementsTrees = createRequirementTrees(spaces);
      const spaceNodes = createSpaceNodes(spaces, lastSelectedSpaceID);

      // extract node ids from spaces and requirements for layouting
      const spaceIDs = spaceNodes.map((node) => node.id);
      const requirementsNodeIDs = requirementsTrees.nodes.map(
        (node) => node.id,
      );

      // graph layout with dagre
      const layoutedNodes = layoutNodesWithDagre(
        spaceIDs,
        requirementsNodeIDs,
        requirementsTrees.edges,
      );

      // apply node positions to react flow nodes
      const nodes = applyDagreNodePositions(
        spaceNodes,
        requirementsTrees.nodes,
        layoutedNodes,
      );

      reactFlowInstance.setNodes(nodes);
      reactFlowInstance.setEdges(requirementsTrees.edges);
    };

    setupGraph();
  }, [reactFlowInstance, spaces, lastSelectedSpaceID, logger]);

  const onNodeClickCallback = useCallback<NodeMouseHandler>(
    (event: React.MouseEvent, clickedNode: Node) => {
      // only register clicks on space nodes
      if (clickedNode.type === "spaceNode") {
        props.controller.onLearningSpaceClicked(parseInt(clickedNode.id));

        // update node data to reflect the last selected node
        const nodes = reactFlowInstance.getNodes();
        nodes.forEach((node) => {
          if (node.type === "spaceNode") {
            (node as LearningSpaceSelectionSpaceNodeType).data = {
              ...(node as LearningSpaceSelectionSpaceNodeType).data,
              lastSelected: node.id === clickedNode.id,
            };
          }
        });
        reactFlowInstance.setNodes(nodes);
      }
    },
    [props.controller, reactFlowInstance],
  );

  const onNodeDoubleClickCallback = useCallback<NodeMouseHandler>(
    (event: React.MouseEvent, clickedNode: Node) => {
      console.log("onNodeDoubleClickCallback called", clickedNode);
      // only register double clicks on space nodes
      if (clickedNode.type === "spaceNode") {
        props.controller.onLearningSpaceDoubleClicked(parseInt(clickedNode.id));
      }
    },
    [props.controller],
  );

  return (
    <div className="h-[95%] w-full lg:h-full lg:w-full">
      <ReactFlow
        defaultNodes={[]}
        nodeTypes={nodeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        onNodeClick={onNodeClickCallback}
        onNodeDoubleClick={onNodeDoubleClickCallback}
        defaultEdges={[]}
        fitView={true}
        fitViewOptions={{ padding: 0.2 }}
      >
        <Background size={2} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

function createSpaceNodes(
  spaces: LearningSpaceSelectionLearningSpaceData[],
  lastSelectedSpaceID: number,
): Node[] {
  const nodes = spaces.map((space) => {
    const hasInput = space.requirementsSyntaxTree !== null;

    const hasOutput = spaces.some((inputSpace) =>
      inputSpace.requirementsSyntaxTree?.containsID(space.id),
    );

    let spaceIcon: string;
    if (space.isCompleted) spaceIcon = spaceSolved;
    else if (space.isAvailable) spaceIcon = spaceAvailable;
    else spaceIcon = spaceLocked;

    const lastSelected = space.id === lastSelectedSpaceID;

    const node: LearningSpaceSelectionSpaceNodeType = {
      id: space.id.toString(),
      data: {
        icon: spaceIcon,
        label: space.name,
        input: hasInput,
        output: hasOutput,
        lastSelected: lastSelected,
      },
      type: "spaceNode",
      position: { x: 0, y: 0 },
      connectable: false,
      deletable: false,
      className: "nopan",
    };
    return node;
  });

  return nodes;
}

function createRequirementTrees(
  spaces: LearningSpaceSelectionLearningSpaceData[],
): { nodes: Node[]; edges: Edge[] } {
  return spaces.reduce(
    (accumulatedArrays, space) => {
      // skip spaces that have no requirements
      if (space.requirementsSyntaxTree === null) return accumulatedArrays;

      for (let requirementsTreeNode of space.requirementsSyntaxTree) {
        // create a new graph edge for each node in the syntax tree
        const targetString =
          requirementsTreeNode.parentNodeID === "root"
            ? space.id.toString()
            : requirementsTreeNode.parentNodeID;

        accumulatedArrays.edges.push({
          id: requirementsTreeNode.node.ID + "-" + targetString,
          source: requirementsTreeNode.node.ID,
          target: targetString,
          style: {
            stroke: "black",
          } as CSSProperties,
        } as Edge);

        // create a new graph node if the node is a boolean operator
        if (!(requirementsTreeNode.node instanceof BooleanIDNode)) {
          let operatorTypeString: BooleanOperatorType;
          if (requirementsTreeNode.node instanceof BooleanAndNode)
            operatorTypeString = "and";
          else if (requirementsTreeNode.node instanceof BooleanOrNode)
            operatorTypeString = "or";

          accumulatedArrays.nodes.push({
            id: requirementsTreeNode.node.ID,
            data: {
              operatorType: operatorTypeString!,
            },
            position: { x: 0, y: 0 },
            type: "requirementNode",
          } as Node);
        }
      }

      // return the arrays to be used in the next iteration
      return accumulatedArrays;
    },
    // empty starting arrays
    { nodes: [], edges: [] } as { nodes: Node[]; edges: Edge[] },
  );
}

// layouts the nodes with dagre and returns a list of nodes with their positions and the ids in the label field
function layoutNodesWithDagre(
  spaceNodes: string[],
  requirementsNodes: string[],
  edges: Edge[],
): dagre.Node[] {
  const graph = new dagre.graphlib.Graph();

  // set graph configuration (needs to be an emtpy object at the least for some reason)
  graph.setGraph(dagreLayoutConfig);

  // default to assigning a new object as a label for each new edge (needs to be done for some reason)
  graph.setDefaultEdgeLabel(function () {
    return {};
  });

  spaceNodes.forEach((node) => {
    graph.setNode(node, { width: SPACE_NODE_WIDTH, height: NODE_HEIGHT });
  });
  requirementsNodes.forEach((node) => {
    graph.setNode(node, { width: SPACE_NODE_WIDTH, height: NODE_HEIGHT });
  });

  edges.forEach((edge) => {
    graph.setEdge(edge.source, edge.target);
  });

  dagre.layout(graph);

  const nodes = graph.nodes().map((node) => {
    const nodeData = graph.node(node);
    return {
      label: node, // use label field to safe node id for later use
      x: nodeData.x,
      y: nodeData.y,
      width: nodeData.width,
      height: nodeData.height,
    };
  });

  return nodes;
}

function applyDagreNodePositions(
  spaceNodes: Node[],
  requirementNodes: Node[],
  dagreNodes: dagre.Node[],
): Node[] {
  const nodesWithPositions = spaceNodes.map((node) => {
    const dagreNode = dagreNodes.find((n) => n.label === node.id);
    return {
      ...node,
      position: {
        x: dagreNode!.x - SPACE_NODE_WIDTH / 2,
        y: dagreNode!.y - NODE_HEIGHT / 2,
      },
    };
  });

  nodesWithPositions.push(
    ...requirementNodes.map((node, index) => {
      const dagreNode = dagreNodes.find((n) => n.label === node.id);
      return {
        ...node,
        position: {
          x: dagreNode!.x - REQ_NODE_WIDTH / 2,
          y: dagreNode!.y - NODE_HEIGHT / 2,
        },
      };
    }),
  );

  return nodesWithPositions;
}
