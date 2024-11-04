import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import { useTranslation } from "react-i18next";
import {
  AvatarEditorCategory,
  OAvatarEditorCategory,
} from "./AvatarEditorCategories/AvatarEditorCategories";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import tailwindMerge from "../../Utils/TailwindMerge";
import { className } from "@babylonjs/core";

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

  return (
    <StyledButton
      data-testid={`avatar-editor-category-tab-${props.category}`}
      onClick={props.onClick}
    >
      {translate(AvatarEditorCategoryTitles[props.category])}
    </StyledButton>
  );
}
