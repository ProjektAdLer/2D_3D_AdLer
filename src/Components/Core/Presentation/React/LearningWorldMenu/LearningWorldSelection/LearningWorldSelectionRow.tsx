import { useTranslation } from "react-i18next";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export default function LearningWorldSelectionRow({
  icon,
  selected,
  title,
  onClickCallback,
}: {
  icon: string;
  selected: boolean;
  title: string;
  onClickCallback: () => void;
}) {
  const { t: translate } = useTranslation("worldMenu");

  return (
    <StyledButton
      icon={icon}
      containerClassName="w-full"
      className="w-full xl:pl-8 "
      shape="freeFloatCenter"
      onClick={onClickCallback}
      color={selected ? "pressed" : "default"}
      title={translate("worldButtonToolTip").toString()}
    >
      {title}
    </StyledButton>
  );
}
