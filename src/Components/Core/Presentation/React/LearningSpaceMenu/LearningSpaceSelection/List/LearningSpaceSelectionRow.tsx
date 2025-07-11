import { useTranslation } from "react-i18next";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export default function LearningSpaceSelectionRow({
  spaceTitle,
  selected,
  icon,
  locked,
  onClickCallback,
  onDoubleClickCallback,
}: {
  icon: string;
  spaceTitle: string;
  selected: boolean;
  locked: boolean;
  onClickCallback: () => void;
  onDoubleClickCallback: () => void;
}) {
  const { t: translate } = useTranslation("spaceMenu");

  return (
    <StyledButton
      icon={icon}
      containerClassName="w-full"
      className="xl:pl-8 w-[100%]"
      shape="freeFloatCenter"
      onClick={onClickCallback}
      onDoubleClick={onDoubleClickCallback}
      color={selected ? "pressed" : "default"}
      title={spaceTitle + ": " + translate("spaceButtonToolTip").toString()}
    >
      {spaceTitle}
    </StyledButton>
  );
}
