import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { Handle, Node, Position } from "reactflow";
import { memo } from "react";

import swegedBackground from "../../../../../../../Assets/misc/MenuSelectionBackgrounds/Sweged_Beispielbild.png";
import Danger from "../../../../../../../Assets/misc/MenuSelectionBackgrounds/Danger1.png";
import Level from "../../../../../../../Assets/misc/MenuSelectionBackgrounds/Level1.png";
import Town from "../../../../../../../Assets/misc/MenuSelectionBackgrounds/Town1.png";

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
  return (
    <div>
      <img
        className="fixed block max-w-full m-auto -translate-y-1/4 min-h-20 aspect-auto -z-50"
        src={Danger}
        alt="Hintergrundbild"
      />
      <StyledButton
        className="justify-between w-44"
        shape="freeFloatLeft"
        color={props.data?.lastSelected ? "pressed" : "default"}
        icon={props.data?.icon}
      >
        <p className="truncate">{props.data!.label}</p>
      </StyledButton>

      {props.data?.input && <Handle type="target" position={Position.Top} />}

      {props.data?.output && (
        <Handle type="source" position={Position.Bottom} />
      )}
    </div>
  );
}

export default memo(LearningSpaceSelectionSpaceNode);
