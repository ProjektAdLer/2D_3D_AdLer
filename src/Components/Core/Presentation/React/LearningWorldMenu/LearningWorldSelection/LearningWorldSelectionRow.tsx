import { useTranslation } from "react-i18next";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export default function LearningWorldSelectionRow({
  icon,
  selected,
  title,
  onClickCallback,
  onDoubleClickCallback,
}: {
  icon: string;
  selected: boolean;
  title: string;
  onClickCallback: () => void;
  onDoubleClickCallback?: () => void;
}) {
  const { t: translate } = useTranslation("worldMenu");

  return (
    <StyledButton
      icon={icon}
      containerClassName="w-full"
      className="w-full xl:pl-8"
      shape="freeFloatCenter"
      onClick={onClickCallback}
      onDoubleClick={onDoubleClickCallback}
      color={selected ? "pressed" : "default"}
      title={title + ": " + translate("worldButtonToolTip").toString()}
      data-testid={`learningworld-selection-${title}`}
    >
      {title}
    </StyledButton>
  );
}
