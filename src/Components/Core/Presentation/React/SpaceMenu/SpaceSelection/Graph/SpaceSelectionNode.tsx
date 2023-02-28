import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { Handle, Node, Position } from "reactflow";
import { memo } from "react";

export type SpaceSelectionNodeInputType = "none" | "single" | "and" | "or";
type SpaceSelectionNodeData = {
  label: string;
  input: SpaceSelectionNodeInputType;
  output: boolean;
  icon: string;
};
export type SpaceSelectionNodeType = Node<SpaceSelectionNodeData>;

function SpaceSelectionNode(props: Partial<SpaceSelectionNodeType>) {
  return (
    <>
      <StyledButton
        shape="freefloatcenter"
        color={props.selected ? "pressed" : "default"}
        icon={props.data?.icon}
      >
        {props.data!.label}
      </StyledButton>

      {props.data?.input === "single" && (
        <Handle type="target" position={Position.Top} />
      )}
      {props.data?.input === "and" && (
        <Handle
          className="w-12 h-6 -top-5 rounded-md bg-white border-1 border-slate-500 bottom-4"
          type="target"
          position={Position.Top}
        >
          <p className="text-center align-middle">und</p>
        </Handle>
      )}

      {props.data?.output && (
        <Handle type="source" position={Position.Bottom} />
      )}
    </>
  );
}

export default memo(SpaceSelectionNode);
