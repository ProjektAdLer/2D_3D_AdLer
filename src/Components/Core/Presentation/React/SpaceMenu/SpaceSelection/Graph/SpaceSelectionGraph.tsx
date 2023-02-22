import ISpaceSelectionController from "../ISpaceSelectionController";
import SpaceSelectionViewModel from "../SpaceSelectionViewModel";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  MiniMap,
  Node,
  NodeMouseHandler,
  NodeTypes,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { useCallback, useEffect } from "react";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import SpaceSelectionNode, {
  SpaceSelectionNodeType,
} from "./SpaceSelectionNode";

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
        const node: SpaceSelectionNodeType = {
          id: space.id.toString(),
          data: { label: space.name },
          type: "spaceNode",
          position: { x: x, y: y },
          connectable: false,
        };
        return node;
      })
    );

    // create edges for requirements
    reactFlowInstance.setEdges(
      props.viewModel.spaces.Value.reduce((accumulatedEdgeArray, space) => {
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
  }, [spaces]);

  const onNodeClickCallback = useCallback<NodeMouseHandler>(
    (event: React.MouseEvent, node: Node) => {
      props.controller.onSpaceClicked(parseInt(node.id));
    },
    [props.controller]
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
        defaultEdgeOptions={{ style: { stroke: "white" } }}
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
