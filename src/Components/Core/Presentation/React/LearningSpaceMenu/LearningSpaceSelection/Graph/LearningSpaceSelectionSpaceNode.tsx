import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { Handle, Node, Position } from "reactflow";
import { memo } from "react";
import { SPACE_NODE_WIDTH } from "./LearningSpaceSelectionGraph";
import { useTranslation } from "react-i18next";

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
  props: Partial<LearningSpaceSelectionSpaceNodeType>,
) {
  const { t: translate } = useTranslation("spaceMenu");

  return (
    <>
      {props.data?.input && <Handle type="target" position={Position.Top} />}

      <StyledButton
        shape="freeFloatLeft"
        color={props.data?.lastSelected ? "pressed" : "default"}
        icon={props.data?.icon}
        style={{ width: SPACE_NODE_WIDTH }}
        title={
          props.data!.label + ": " + translate("spaceButtonToolTip").toString()
        }
      >
        <p className="truncate">{props.data!.label}</p>
      </StyledButton>

      {props.data?.output && (
        <Handle type="source" position={Position.Bottom} />
      )}
    </>
  );
}

export default memo(LearningSpaceSelectionSpaceNode);
