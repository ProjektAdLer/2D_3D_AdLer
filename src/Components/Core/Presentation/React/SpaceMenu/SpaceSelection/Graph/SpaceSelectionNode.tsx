import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { Handle, Node, Position } from "reactflow";
import { memo } from "react";

type SpaceSelectionNodeData = {
  label: string;
};
export type SpaceSelectionNodeType = Node<SpaceSelectionNodeData>;

function SpaceSelectionNode(props: Partial<SpaceSelectionNodeType>) {
  return (
    <>
      <StyledButton shape="freefloatcenter">{props.data!.label}</StyledButton>
      <Handle type="target" position={Position.Top}>
        Und
      </Handle>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

export default memo(SpaceSelectionNode);
