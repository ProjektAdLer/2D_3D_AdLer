import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import { useTranslation } from "react-i18next";
import {
  AvatarEditorCategory,
  OAvatarEditorCategory,
} from "./AvatarEditorCategories";

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
    <button
      data-testid={`avatar-editor-category-tab-${props.category}`}
      className={`grow ${props.active ? "bg-adlerbggradientfrom" : "bg-adlerbggradientto"}`}
      onClick={props.onClick}
    >
      {translate(AvatarEditorCategoryTitles[props.category])}
    </button>
  );
}
