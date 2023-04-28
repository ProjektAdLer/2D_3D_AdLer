import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { Handle, Node, Position } from "reactflow";
import { memo } from "react";

export type LearningSpaceSelectionSpaceNodeInputType =
  | "none"
  | "single"
  | "and"
  | "or";
type LearningSpaceSelectionSpaceNodeData = {
  label: string;
  input: LearningSpaceSelectionSpaceNodeInputType;
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

      {props.data?.input === "single" && (
        <Handle type="target" position={Position.Top} />
      )}
      {props.data?.input === "and" && (
        <Handle
          className="flex items-center justify-center w-12 h-6 border-b-2 border-r-2 rounded-md border-1 bg-nodehandlecolor -top-5 border-adlerdarkblue"
          type="target"
          position={Position.Top}
        >
          <p className="font-[roboto] uppercase text-adlerdarkblue">und</p>
        </Handle>
      )}

      {props.data?.output && (
        <Handle type="source" position={Position.Bottom} />
      )}
    </>
  );
}

export default memo(LearningSpaceSelectionSpaceNode);
