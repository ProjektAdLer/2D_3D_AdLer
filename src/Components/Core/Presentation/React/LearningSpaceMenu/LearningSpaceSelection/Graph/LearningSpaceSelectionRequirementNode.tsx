import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Handle, Node, Position } from "reactflow";
import { REQ_NODE_WIDTH } from "./LearningSpaceSelectionGraph";

export type BooleanOperatorType = "and" | "or";

type LearningSpaceSelectionRequirementNodeData = {
  operatorType: BooleanOperatorType;
};
export type LearningSpaceSelectionRequirementNodeType =
  Node<LearningSpaceSelectionRequirementNodeData>;

function LearningSpaceSelectionRequirementNode(
  props: Partial<LearningSpaceSelectionRequirementNodeType>,
) {
  const { t: translate } = useTranslation("spaceMenu");

  return (
    <>
      <Handle type={"target"} position={Position.Top}></Handle>

      <div
        className="flex items-center justify-center h-10 text-lg font-bold border-b-2 border-r-2 rounded-md border-1 bg-nodehandlecolor border-adlerdarkblue"
        style={{ width: REQ_NODE_WIDTH }}
      >
        <p className="font-[roboto] uppercase text-adlerdarkblue">
          {props.data?.operatorType === "and" && translate("nodeAND")}
          {props.data?.operatorType === "or" && translate("nodeOR")}
        </p>
      </div>

      <Handle type={"source"} position={Position.Bottom}></Handle>
    </>
  );
}

export default memo(LearningSpaceSelectionRequirementNode);
