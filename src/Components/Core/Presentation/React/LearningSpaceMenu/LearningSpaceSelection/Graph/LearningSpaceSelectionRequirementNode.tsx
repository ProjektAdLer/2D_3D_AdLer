import { memo } from "react";
import { Handle, Node, Position } from "reactflow";

export type BooleanOperatorType = "and" | "or";

type LearningSpaceSelectionRequirementNodeData = {
  operatorType: BooleanOperatorType;
};
export type LearningSpaceSelectionRequirementNodeType =
  Node<LearningSpaceSelectionRequirementNodeData>;

function LearningSpaceSelectionRequirementNode(
  props: Partial<LearningSpaceSelectionRequirementNodeType>
) {
  return (
    <>
      <Handle type={"target"} position={Position.Top}></Handle>
      <div className="flex items-center justify-center w-16 h-10 text-lg font-bold border-b-2 border-r-2 rounded-md border-1 bg-nodehandlecolor border-adlerdarkblue">
        <p className="font-[roboto] uppercase text-adlerdarkblue">
          {props.data?.operatorType === "and" && "und"}
          {props.data?.operatorType === "or" && "oder"}
        </p>
      </div>
      <Handle type={"source"} position={Position.Bottom}></Handle>
    </>
  );
}

export default memo(LearningSpaceSelectionRequirementNode);
