import { memo } from "react";
import { Handle, Node, Position } from "reactflow";

export type BooleanOperatorType = "and" | "or";

type LearningSpaceSelectionRequirementNodeData = {
  type: BooleanOperatorType;
};
export type LearningSpaceSelectionRequirementNodeType =
  Node<LearningSpaceSelectionRequirementNodeData>;

function LearningSpaceSelectionRequirementNode(
  props: Partial<LearningSpaceSelectionRequirementNodeType>
) {
  return (
    <>
      <Handle type={"target"} position={Position.Top}></Handle>
      <div className="flex items-center justify-center w-12 h-6 border-b-2 border-r-2 rounded-md border-1 bg-nodehandlecolor -top-5 border-adlerdarkblue">
        <p className="font-[roboto] uppercase text-adlerdarkblue">
          {props.data?.type === "and" && "und"}
          {props.data?.type === "or" && "oder"}
        </p>
      </div>
      <Handle type={"source"} position={Position.Bottom}></Handle>
    </>
  );
}

export default memo(LearningSpaceSelectionRequirementNode);
