import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { Handle, Node, Position } from "reactflow";
import { memo } from "react";

type LearningSpaceSelectionSpaceNodeData = {
  label: string;
  input: boolean;
  output: boolean;
  icon: string;
  lastSelected: boolean;
};
export type LearningSpaceSelectionSpaceNodeType =
  Node<LearningSpaceSelectionSpaceNodeData>;

function LearningSpaceSelectionSpaceNode(
  props: Partial<LearningSpaceSelectionSpaceNodeType>
) {
  return (
    <>
      <StyledButton
        shape="freefloatcenter"
        color={props.data?.lastSelected ? "pressed" : "default"}
        icon={props.data?.icon}
      >
        {props.data!.label}
      </StyledButton>

      {props.data?.input && <Handle type="target" position={Position.Top} />}

      {props.data?.output && (
        <Handle type="source" position={Position.Bottom} />
      )}
    </>
  );
}

export default memo(LearningSpaceSelectionSpaceNode);
