import spaceSolved from "../../../../../../../Assets/icons/17-1-solution-check/check-solution-icon-nobg.svg";
import spaceAvailable from "../../../../../../../Assets/icons/27-1-lock-open/lock-icon-open-nobg.svg";
import spaceLocked from "../../../../../../../Assets/icons/27-lock-closed/lock-icon-closed-nobg.svg";

import ISpaceSelectionController from "../ISpaceSelectionController";
import SpaceSelectionViewModel, {
  SpaceSelectionSpaceData,
} from "../SpaceSelectionViewModel";
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
import SpaceSelectionNode, {
  SpaceSelectionNodeInputType,
  SpaceSelectionNodeType,
} from "./SpaceSelectionNode";
import ELK, { ElkNode } from "elkjs/lib/elk.bundled.js";
import { ElkExtendedEdge } from "elkjs";

const elk = new ELK();

const NODE_WIDTH = 600;
const NODE_HEIGHT = 100;

const nodeTypes: NodeTypes = {
  spaceNode: SpaceSelectionNode,
};

export default function SpaceSelectionGraph(props: {
  controller: ISpaceSelectionController;
  viewModel: SpaceSelectionViewModel;
}) {
  const reactFlowInstance = useReactFlow();
  const [spaces] = useObservable(props.viewModel.spaces);

  useEffect(() => {
    if (spaces === undefined) return;

    const setupGraph = async () => {
      const edges = createReactFlowEdges(spaces);

      const elkGraph: ElkNode = createElkGraph(spaces, edges);
      await elk.layout(elkGraph);

      const nodes = createReactFlowNodes(spaces, elkGraph);

      reactFlowInstance.setNodes(nodes);
      reactFlowInstance.setEdges(edges);
    };
    setupGraph();
  }, [spaces, reactFlowInstance]);

  const onNodeClickCallback = useCallback<NodeMouseHandler>(
    (event: React.MouseEvent, clickedNode: Node) => {
      props.controller.onSpaceClicked(parseInt(clickedNode.id));

      // update node data to reflect the last selected node
      const nodes = reactFlowInstance.getNodes();
      nodes.forEach((node) => {
        (node as SpaceSelectionNodeType).data = {
          ...node.data,
          lastSelected: node.id === clickedNode.id,
        };
      });
      reactFlowInstance.setNodes(nodes);
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

function createReactFlowEdges(spaces: SpaceSelectionSpaceData[]): Edge[] {
  const edges = spaces.reduce((accumulatedEdgeArray, space) => {
    // create an edge for each required space and add it to the array
    space.requiredSpaces.forEach((requiredSpace) => {
      accumulatedEdgeArray.push({
        id: requiredSpace.id.toString() + "-" + space.id.toString(),
        source: requiredSpace.id.toString(),
        target: space.id.toString(),
        style: {
          stroke: "black",
          strokeDasharray: requiredSpace.isCompleted ? "" : "6 5",
        } as CSSProperties,
      } as Edge);
    });

    // return the array to be used in the next iteration
    return accumulatedEdgeArray;
  }, [] as Edge[]);

  return edges;
}

function createElkGraph(
  spaces: SpaceSelectionSpaceData[],
  edges: Edge[]
): ElkNode {
  return {
    id: "root",
    // see more options for layered algorithm: https://www.eclipse.org/elk/reference/algorithms/org-eclipse-elk-layered.html
    layoutOptions: {
      "elk.algorithm": "layered",
      "elk.direction": "DOWN",
      "elk.alignment": "V_CENTER",
      "elk.edgeRouting": "SPLINES",
    },
    children: spaces.map((space) => {
      return {
        id: space.id.toString(),
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

function createReactFlowNodes(
  spaces: SpaceSelectionSpaceData[],
  elkGraph: ElkNode
): Node[] {
  const nodes = spaces.map((space) => {
    let inputType: SpaceSelectionNodeInputType;
    if (space.requiredSpaces.length === 1) {
      inputType = "single";
    } else if (space.requiredSpaces.length > 1) {
      inputType = "and";
    } else {
      inputType = "none";
    }

    const hasOutput = spaces.some((inputSpace) =>
      inputSpace.requiredSpaces.some(
        (requiredSpace) => requiredSpace.id === space.id
      )
    );

    let spaceIcon: string;
    if (space.isCompleted) spaceIcon = spaceSolved;
    else if (space.isAvailable) spaceIcon = spaceAvailable;
    else spaceIcon = spaceLocked;

    const nodePosition: XYPosition = calculateNodePosition(space, elkGraph);

    const node: SpaceSelectionNodeType = {
      id: space.id.toString(),
      data: {
        icon: spaceIcon,
        label: space.name,
        input: inputType,
        output: hasOutput,
        lastSelected: false,
      },
      type: "spaceNode",
      position: nodePosition,
      connectable: false,
      deletable: false,
      height: NODE_HEIGHT,
      width: NODE_WIDTH,
    };
    return node;
  });

  return nodes;
}

function calculateNodePosition(
  space: SpaceSelectionSpaceData,
  elkGraph: ElkNode
): XYPosition {
  const elkNode = elkGraph.children!.find(
    (child) => child.id === space.id.toString()
  );
  return {
    x: elkNode!.x! - NODE_WIDTH / 2,
    y: elkNode!.y! - NODE_HEIGHT / 2,
  };
}
