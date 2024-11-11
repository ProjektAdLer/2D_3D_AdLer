import RangeSlider from "~ReactComponents/ReactRelated/ReactBaseComponents/RangeSlider";
import AvatarEditorCategoryContentProps from "./AvatarEditorCategoryContentProps";
import faceCategoryIcon from "../../../../../../Assets/icons/face.svg";

export default function AvatarEditorFaceCategory(
  props: AvatarEditorCategoryContentProps,
) {
  return (
    <div className="flex flex-col justify-center items-center">
      <RangeSlider
        min={1}
        max={10}
        step={1}
        callback={() => {}}
        buttons={{ imageLeft: faceCategoryIcon, imageRight: faceCategoryIcon }}
      ></RangeSlider>
    </div>
  );
}
