import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import ISpaceSelectionGraphController from "./ISpaceSelectionGraphController";
import SpaceSelectionGraphViewModel from "./SpaceSelectionGraphViewModel";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

export default function SpaceSelectionGraph() {
  const [viewModel, controller] = useBuilder<
    SpaceSelectionGraphViewModel,
    ISpaceSelectionGraphController
  >(BUILDER_TYPES.ISpaceSelectionGraphBuilder);

  if (!viewModel || !controller) return null;

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {/* <ReactFlow nodes={nodes} draggable={false}>
        <Background />
        <Controls showInteractive={false} />
      </ReactFlow> */}
    </div>
  );
}
