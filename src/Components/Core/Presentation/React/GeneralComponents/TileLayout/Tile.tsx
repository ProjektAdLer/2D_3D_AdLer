import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

type TileProps = {
  title?: string;
  image: string;
  onClick: () => void;
};

export default function Tile(props: TileProps) {
  return (
    <div className="flex flex-col">
      <StyledButton
        className="line-clamp-2 portrait:h-[15vh] h-[20vh] lg:w-[15vw]"
        shape="freeFloatCenter"
        onClick={props.onClick}
      >
        <div className="flex flex-col">
          <img src={props.image} alt={props.title + "Thumbnail"} />
          {props.title && <p onClick={props.onClick}>{props.title}</p>}
        </div>
      </StyledButton>
    </div>
  );
}