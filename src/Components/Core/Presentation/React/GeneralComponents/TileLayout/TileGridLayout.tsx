import Tile from "./Tile";

type TileLayoutProps = {
  tileContents: {
    id: number;
    title?: string;
    image: string;
  }[];
  columns: number;
  mobileColumns?: number;
  onTileClick: (id: number) => void;
};

export default function TileGridLayout(props: TileLayoutProps) {
  return (
    <div
      className={`max-h-[77vh] portrait:max-h-[30vh] overflow-auto grid portrait:grid-cols-${props.mobileColumns ?? props.columns} grid-cols-${props.columns} gap-5 pt-4 rounded-lg p-4 overflow-y-auto`}
    >
      {props.tileContents.map((tile) => (
        <Tile
          key={tile.id}
          title={tile.title}
          image={tile.image}
          onClick={() => props.onTileClick(tile.id)}
        />
      ))}
    </div>
  );
}
