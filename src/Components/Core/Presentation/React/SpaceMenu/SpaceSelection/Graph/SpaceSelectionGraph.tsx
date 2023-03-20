import spaceSolved from "../../../../../../../Assets/icons/17-1-solution-check/check-solution-icon-nobg.svg";
import spaceAvailable from "../../../../../../../Assets/icons/27-1-lock-open/lock-icon-open-nobg.svg";
import spaceLocked from "../../../../../../../Assets/icons/27-lock-closed/lock-icon-closed-nobg.svg";

import ISpaceSelectionController from "../ISpaceSelectionController";
import SpaceSelectionViewModel from "../SpaceSelectionViewModel";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  // MiniMap,
  Node,
  NodeMouseHandler,
  NodeTypes,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { CSSProperties, useCallback, useEffect } from "react";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import SpaceSelectionNode, {
  SpaceSelectionNodeInputType,
  SpaceSelectionNodeType,
} from "./SpaceSelectionNode";
import dagre from "dagre";
import ELK, { ElkNode } from "elkjs/lib/elk.bundled.js";
import { ElkExtendedEdge } from "elkjs";

const elk = new ELK();

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

    // create space nodes
    // TODO: add better node positioning here
    let y = 0;
    let x = 0;
    let nodes = spaces.map((space) => {
      y += 100;
      x += 100;

      let inputType: SpaceSelectionNodeInputType;
      if (space.requiredSpaces.length === 1) {
        inputType = "single";
      } else if (space.requiredSpaces.length > 1) {
        inputType = "and";
      } else {
        inputType = "none";
      }
      let hasOutput = spaces.some((inputSpace) =>
        inputSpace.requiredSpaces.some(
          (requiredSpace) => requiredSpace.id === space.id
        )
      );

      let spaceIcon: string;
      if (space.isCompleted) spaceIcon = spaceSolved;
      else if (space.isAvailable) spaceIcon = spaceAvailable;
      else spaceIcon = spaceLocked;

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
        position: { x: x, y: y },
        connectable: false,
        deletable: false,
      };
      return node;
    });

    // create edges for requirements
    let edges = spaces.reduce((accumulatedEdgeArray, space) => {
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

    const nodeWidth = 600;
    const nodeHeight = 90;

    // layout graph with dagre
    // const dagreGraph = new dagre.graphlib.Graph();
    // dagreGraph.setDefaultEdgeLabel(() => ({}));

    // dagreGraph.setGraph({ rankdir: "TB" });
    // nodes.forEach((node) => {
    //   dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    // });
    // edges.forEach((edge) => {
    //   dagreGraph.setEdge(edge.source, edge.target);
    // });
    // dagre.layout(dagreGraph);

    // nodes.forEach((node) => {
    //   const nodeWithPosition = dagreGraph.node(node.id);
    //   node.position = {
    //     x: nodeWithPosition.x - nodeWidth / 2,
    //     y: nodeWithPosition.y - nodeHeight / 2,
    //   };
    // });

    // layout graph with elk
    const elkGraph: ElkNode = {
      id: "root",
      layoutOptions: {
        "elk.algorithm": "layered",
        "elk.direction": "DOWN",
        "elk.alignment": "V_CENTER",
        "elk.edgeRouting": "SPLINES",
      },
      children: nodes.map((node) => {
        return {
          id: node.id,
          width: nodeWidth,
          height: nodeHeight,
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

    elk.layout(elkGraph).then((graph) => {
      console.log(graph);
      nodes.forEach((node) => {
        const nodeWithPosition = graph.children!.find(
          (child) => child.id === node.id
        );
        if (nodeWithPosition) {
          console.log("position set");
          node.position = {
            x: nodeWithPosition.x! - nodeWidth / 2,
            y: nodeWithPosition.y! - nodeHeight / 2,
          };
        }
      });

      console.log(nodes);

      reactFlowInstance.setNodes(nodes);
      reactFlowInstance.setEdges(edges);
    });
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
    <div style={{ height: "100%", width: "100%" }}>
      <ReactFlow
        defaultNodes={[]}
        nodeTypes={nodeTypes}
        nodesDraggable={false} // TODO: set to false when nodes are placed in the correct positions
        nodesConnectable={false}
        onNodeClick={onNodeClickCallback}
        defaultEdges={[]}
        fitView={true}
        fitViewOptions={{ padding: 0.1 }}
      >
        <Background size={2} />
        {/* <MiniMap /> */}
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
