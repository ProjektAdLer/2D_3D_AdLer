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
  const mobileColumns = props.mobileColumns ?? props.columns;

  const gridClasses = [
    "grid",
    `portrait:grid-cols-${mobileColumns}`,
    `grid-cols-${props.columns}`,
    "gap-5",
    "pt-4",
    "rounded-lg",
    "p-4",
  ].join(" ");

  return (
    <div className={gridClasses}>
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
