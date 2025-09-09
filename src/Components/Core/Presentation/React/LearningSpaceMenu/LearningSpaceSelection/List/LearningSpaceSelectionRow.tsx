import { useTranslation } from "react-i18next";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export default function LearningSpaceSelectionRow({
  spaceTitle,
  selected,
  icon,
  spaceId,
  locked,
  onClickCallback,
  onDoubleClickCallback,
}: {
  icon: string;
  spaceTitle: string;
  spaceId: number;
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
      className="w-[100%] xl:pl-8"
      shape="freeFloatCenter"
      onClick={onClickCallback}
      onDoubleClick={onDoubleClickCallback}
      color={selected ? "pressed" : "default"}
      title={spaceTitle + ": " + translate("spaceButtonToolTip").toString()}
      data-testid={`space-${spaceId}-${spaceTitle}`}
    >
      {spaceTitle}
    </StyledButton>
  );
}
