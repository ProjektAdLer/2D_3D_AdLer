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
import { useCallback, useEffect } from "react";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import SpaceSelectionNode, {
  SpaceSelectionNodeInputType,
  SpaceSelectionNodeType,
} from "./SpaceSelectionNode";

import spaceSolved from "../../../../../../../Assets/icons/17-1-solution-check/check-solution-icon-nobg.svg";
import spaceAvailable from "../../../../../../../Assets/icons/27-1-lock-open/lock-icon-open-nobg.svg";
import spaceLocked from "../../../../../../../Assets/icons/27-lock-closed/lock-icon-closed-nobg.svg";

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
    reactFlowInstance.setNodes(
      spaces.map((space) => {
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
          inputSpace.requiredSpaces.includes(space.id)
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
      })
    );

    // create edges for requirements
    reactFlowInstance.setEdges(
      spaces.reduce((accumulatedEdgeArray, space) => {
        // create an edge for each required space and add it to the array
        space.requiredSpaces.forEach((requiredSpace) => {
          accumulatedEdgeArray.push({
            id: requiredSpace.toString() + "-" + space.id.toString(),
            source: requiredSpace.toString(),
            target: space.id.toString(),
          } as Edge);
        });
        // return the array to be used in the next iteration
        return accumulatedEdgeArray;
      }, [] as Edge[])
    );
  }, [spaces, reactFlowInstance]);

  const onNodeClickCallback = useCallback<NodeMouseHandler>(
    (event: React.MouseEvent, clickedNode: Node) => {
      props.controller.onSpaceClicked(parseInt(clickedNode.id));

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
        nodesDraggable={true} // TODO: set to false when nodes are placed in the correct positions
        nodesConnectable={false}
        onNodeClick={onNodeClickCallback}
        defaultEdges={[]}
        defaultEdgeOptions={{ style: { stroke: "black" } }}
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
