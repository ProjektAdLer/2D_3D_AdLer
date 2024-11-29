import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

type TileProps = {
  title?: string;
  image: string;
  onClick: () => void;
};

export default function Tile(props: TileProps) {
  return (
    <StyledButton
      className="flex flex-col"
      containerClassName="w-full h-full"
      shape="freeFloatCenter"
      onClick={props.onClick}
    >
      <div className="flex flex-col">
        <img src={props.image} alt={props.title + "Thumbnail"} />
        {props.title && <p onClick={props.onClick}>{props.title}</p>}
      </div>
    </StyledButton>
  );
}
