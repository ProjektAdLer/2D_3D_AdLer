import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import { useTranslation } from "react-i18next";
import {
  AvatarEditorCategory,
  OAvatarEditorCategory,
} from "./AvatarEditorCategories";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

import hairCategoryIcon from "../../../../../Assets/icons/hair.svg";
import faceCategoryIcon from "../../../../../Assets/icons/face.svg";
import bodyCategoryIcon from "../../../../../Assets/icons/body.svg";
import clothingCategoryIcon from "../../../../../Assets/icons/clothing.svg";
import accessoiresCategoryIcon from "../../../../../Assets/icons/accessoires.svg";

type AvatarEditorCategoryTabButtonProps = {
  category: AvatarEditorCategory;
  active: boolean;
  onClick: () => void;
} & AdLerUIComponent;

const AvatarEditorCategoryTitles = {
  [OAvatarEditorCategory.HAIR]: "hair",
  [OAvatarEditorCategory.FACE]: "face",
};

export default function AvatarEditorCategoryTabButton(
  props: AvatarEditorCategoryTabButtonProps,
) {
  const { t: translate } = useTranslation("avatarEditor");

  function getIconsForCategory(category: AvatarEditorCategory) {
    switch (category) {
      case OAvatarEditorCategory.HAIR:
        return hairCategoryIcon;
      case OAvatarEditorCategory.FACE:
        return faceCategoryIcon;
      default:
        return "";
    }
  }

  return (
    <StyledButton
      data-testid={`avatar-editor-category-tab-${props.category}`}
      className={`${props.active ? "!bg-adleryellow translate-x-[1px] translate-y-[1px] !border-b-2 !border-r-2 !border-transparent " : ""}`}
      onClick={props.onClick}
      icon={getIconsForCategory(props.category)}
    ></StyledButton>
  );
}