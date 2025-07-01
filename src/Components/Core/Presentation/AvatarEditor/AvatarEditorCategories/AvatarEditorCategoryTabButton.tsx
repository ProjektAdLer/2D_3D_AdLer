import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import {
  AvatarEditorCategory,
  OAvatarEditorCategory,
} from "./AvatarEditorCategories";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

import hairCategoryIcon from "../../../../../Assets/icons/hair.svg";
import faceCategoryIcon from "../../../../../Assets/icons/face.svg";
import accessoiresCategoryIcon from "../../../../../Assets/icons/accessoires.svg";
import clothingCategoryIcon from "../../../../../Assets/icons/clothing.svg";
import bodyCategoryIcon from "../../../../../Assets/icons/body.svg";

type AvatarEditorCategoryTabButtonProps = {
  category: AvatarEditorCategory;
  active: boolean;
  toolTip?: string;
  onClick: () => void;
} & AdLerUIComponent;

const AvatarEditorCategoryIcons = {
  [OAvatarEditorCategory.HAIR]: hairCategoryIcon,
  [OAvatarEditorCategory.FACE]: faceCategoryIcon,
  [OAvatarEditorCategory.ACCESSOIRE]: accessoiresCategoryIcon,
  [OAvatarEditorCategory.CLOTHING]: clothingCategoryIcon,
  [OAvatarEditorCategory.BODY]: bodyCategoryIcon,
};

export default function AvatarEditorCategoryTabButton(
  props: AvatarEditorCategoryTabButtonProps,
) {
  return (
    <StyledButton
      data-testid={`avatar-editor-category-tab-${props.category}`}
      className={`${props.active ? "!bg-adleryellow translate-x-[1px] translate-y-[1px] !border-b-2 !border-r-2 !border-transparent " : ""}`}
      color={props.active ? "active" : "default"}
      onClick={props.onClick}
      icon={AvatarEditorCategoryIcons[props.category]}
      title={props.toolTip}
    ></StyledButton>
  );
}
