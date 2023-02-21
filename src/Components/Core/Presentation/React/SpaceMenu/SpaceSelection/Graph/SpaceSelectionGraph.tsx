import ISpaceSelectionController from "../ISpaceSelectionController";
import SpaceSelectionViewModel from "../SpaceSelectionViewModel";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { useEffect } from "react";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";

export default function SpaceSelectionGraph(props: {
  controller: ISpaceSelectionController;
  viewModel: SpaceSelectionViewModel;
}) {
  const reactFlowInstance = useReactFlow();
  const [spaces] = useObservable(props.viewModel.spaces);

  useEffect(() => {
    if (spaces === undefined) return;

    // create space nodes
    let y = 0;
    let x = 0;
    reactFlowInstance.setNodes(
      spaces.map((space) => {
        y += 100;
        x += 100;
        const node: Node = {
          id: space.id.toString(),
          data: { label: space.name },
          position: { x: x, y: y },
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

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ReactFlow
        defaultNodes={[]}
        defaultEdges={[]}
        defaultEdgeOptions={{ style: { stroke: "white" } }}
        nodesDraggable={true}
        fitView={true}
      >
        <Background size={2} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
