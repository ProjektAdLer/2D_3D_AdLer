import spaceSolved from "../../../../../../../Assets/icons/17-1-solution-check/check-solution-icon-nobg.svg";
import spaceAvailable from "../../../../../../../Assets/icons/27-1-lock-open/lock-icon-open-nobg.svg";
import spaceLocked from "../../../../../../../Assets/icons/27-lock-closed/lock-icon-closed-nobg.svg";

import ILearningSpaceSelectionController from "../ILearningSpaceSelectionController";
import LearningSpaceSelectionViewModel, {
  LearningSpaceSelectionLearningSpaceData,
} from "../LearningSpaceSelectionViewModel";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  // MiniMap,
  Node,
  NodeMouseHandler,
  NodeTypes,
  useReactFlow,
  XYPosition,
} from "reactflow";
import "reactflow/dist/style.css";
import { CSSProperties, useCallback, useEffect } from "react";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import LearningSpaceSelectionSpaceNode, {
  LearningSpaceSelectionSpaceNodeType,
} from "./LearningSpaceSelectionSpaceNode";
import ELK, { ElkNode, LayoutOptions } from "elkjs/lib/elk.bundled.js";
import { ElkExtendedEdge } from "elkjs";
import {
  BooleanAndNode,
  BooleanIDNode,
  BooleanOrNode,
} from "src/Components/Core/Application/UseCases/CalculateLearningSpaceAvailability/Parser/BooleanSyntaxTree";
import LearningSpaceSelectionRequirementNode, {
  BooleanOperatorType,
} from "./LearningSpaceSelectionRequirementNode";
import { logger } from "src/Lib/Logger";

const elk = new ELK();

const NODE_WIDTH = 176;
const NODE_HEIGHT = 60;
// see more options for layered algorithm: https://www.eclipse.org/elk/reference/algorithms/org-eclipse-elk-layered.html
const ELK_LAYOUT_OPTIONS: LayoutOptions = {
  "elk.algorithm": "layered",
  "elk.direction": "DOWN",
  "elk.alignment": "V_CENTER",
  "elk.edgeRouting": "SPLINES",
};

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
  const [lastSelectedSpaceID] = useObservable(
    props.viewModel.lastSelectedSpaceID
  );

  useEffect(() => {
    if (spaces === undefined || spaces.length === 0) return;

    const setupGraph = async () => {
      logger.log("LearningSpaceSelectionGraph", "Graph Setup");

      const requirementsTrees = createRequirementTrees(spaces);
      const spaceNodes = createSpaceNodes(spaces, lastSelectedSpaceID);

      // extract node ids from spaces and requirements for layouting
      const spaceIDs = spaceNodes.map((node) => node.id);
      const requirementsNodeIDs = requirementsTrees.nodes.map(
        (node) => node.id
      );

      // graph layout with elk
      const elkGraph: ElkNode = createElkGraph(
        [...spaceIDs, ...requirementsNodeIDs],
        requirementsTrees.edges
      );
      await elk.layout(elkGraph);

      // apply node positions from elk graph to react flow nodes
      const nodes = applyNodePositions(
        [...spaceNodes, ...requirementsTrees.nodes],
        elkGraph
      );

      reactFlowInstance.setNodes(nodes);
      reactFlowInstance.setEdges(requirementsTrees.edges);
    };

    setupGraph();
  }, [reactFlowInstance, spaces, lastSelectedSpaceID]);

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
    [props.controller, reactFlowInstance]
  );

  return (
    <div className="w-full h-[95%] lg:w-full lg:h-full ">
      <ReactFlow
        defaultNodes={[]}
        nodeTypes={nodeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        onNodeClick={onNodeClickCallback}
        defaultEdges={[]}
        fitView={true}
        fitViewOptions={{ padding: 0.2 }}
      >
        <Background size={2} />
        {/* <MiniMap /> */}
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

function createRequirementTrees(
  spaces: LearningSpaceSelectionLearningSpaceData[]
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
            // strokeDasharray: requiredSpace.isCompleted ? "" : "6 5",
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
    { nodes: [], edges: [] } as { nodes: Node[]; edges: Edge[] }
  );
}

function createElkGraph(nodes: string[], edges: Edge[]): ElkNode {
  return {
    id: "root",
    layoutOptions: ELK_LAYOUT_OPTIONS,
    children: nodes.map((node) => {
      return {
        id: node,
        width: NODE_WIDTH,
        height: NODE_HEIGHT,
      } as ElkNode;
    }),
    edges: edges.map((edge) => {
      return {
        id: edge.id,
        sources: [edge.source],
        targets: [edge.target],
      } as ElkExtendedEdge;
    }),
  };
}

function createSpaceNodes(
  spaces: LearningSpaceSelectionLearningSpaceData[],
  lastSelectedSpaceID: number
): Node[] {
  const nodes = spaces.map((space) => {
    const hasInput = space.requirementsSyntaxTree !== null;

    const hasOutput = spaces.some((inputSpace) =>
      inputSpace.requirementsSyntaxTree?.containsID(space.id)
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
      height: NODE_HEIGHT,
      width: NODE_WIDTH,
    };
    return node;
  });

  return nodes;
}

function applyNodePositions(nodes: Node[], elkGraph: ElkNode): Node[] {
  const nodesWithPositions = nodes.map((node) => {
    const nodePosition: XYPosition = calculateNodePosition(node.id, elkGraph);
    return {
      ...node,
      position: nodePosition,
    };
  });
  return nodesWithPositions;
}

function calculateNodePosition(id: string, elkGraph: ElkNode): XYPosition {
  const elkNode = elkGraph.children!.find((child) => child.id === id);
  return {
    x: elkNode!.x! - NODE_WIDTH / 2,
    y: elkNode!.y! - NODE_HEIGHT / 2,
  };
}
