import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export default function WorldSelectionRow({
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
  return (
    <StyledButton
      icon={icon}
      className="xl:pl-8 w-[100%]"
      shape="freefloatcenter"
      onClick={onClickCallback}
      color={selected ? "pressed" : "default"}
    >
      {title}
    </StyledButton>
  );
}
