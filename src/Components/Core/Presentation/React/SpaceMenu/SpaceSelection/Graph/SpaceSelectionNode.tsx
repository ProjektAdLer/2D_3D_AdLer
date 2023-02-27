import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { Handle, Node, Position } from "reactflow";
import { memo } from "react";

export type SpaceSelectionNodeInputType = "none" | "single" | "and" | "or";
type SpaceSelectionNodeData = {
  label: string;
  input: SpaceSelectionNodeInputType;
  output: boolean;
};
export type SpaceSelectionNodeType = Node<SpaceSelectionNodeData>;

function SpaceSelectionNode(props: Partial<SpaceSelectionNodeType>) {
  return (
    <>
      <StyledButton
        shape="freefloatcenter"
        color={props.selected ? "pressed" : "default"}
      >
        {props.data!.label}
      </StyledButton>
      {props.data?.input !== "none" && (
        <Handle type="target" position={Position.Top}>
          {props.data?.input === "and" && "Und"}
        </Handle>
      )}
      {props.data?.output && (
        <Handle type="source" position={Position.Bottom} />
      )}
    </>
  );
}

export default memo(SpaceSelectionNode);
