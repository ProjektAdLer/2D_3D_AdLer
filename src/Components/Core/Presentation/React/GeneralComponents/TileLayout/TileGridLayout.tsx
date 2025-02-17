import Tile from "./Tile";

export type TileLayoutProps = {
  tileContents: {
    id: number;
    title?: string;
    image: string;
    active?: boolean;
  }[];
  columns: number;
  mobileColumns?: number;
  onTileClick: (id: number) => void;
};

const validClasses = [
  "grid-cols-1",
  "grid-cols-2",
  "grid-cols-3",
  "grid-cols-4",
  "grid-cols-5",
  "grid-cols-6",
  "grid-cols-7",
  "grid-cols-8",
  "grid-cols-9",
  "grid-cols-10",
  "grid-cols-11",
  "grid-cols-12",
  "portrait:grid-cols-1",
  "portrait:grid-cols-2",
  "portrait:grid-cols-3",
  "portrait:grid-cols-4",
  "portrait:grid-cols-5",
  "portrait:grid-cols-6",
  "portrait:grid-cols-7",
  "portrait:grid-cols-8",
  "portrait:grid-cols-9",
  "portrait:grid-cols-10",
  "portrait:grid-cols-11",
  "portrait:grid-cols-12",
];

export default function TileGridLayout(props: TileLayoutProps) {
  const mobileColumns = `grid-cols-${props.mobileColumns ?? props.columns}`;
  const desktopColumns = `grid-cols-${props.columns}`;

  return (
    // weird class names are for ensuring that no classes are purged by tailwind
    <div
      className={
        `grid gap-5 pt-4 rounded-lg p-4 ` +
        `portrait:${validClasses.includes(mobileColumns) ? mobileColumns : "grid-cols-1"} ` +
        `${validClasses.includes(desktopColumns) ? desktopColumns : "grid-cols-1"}`
      }
    >
      {props.tileContents.map((tile) => (
        <Tile
          key={tile.id}
          title={tile.title}
          image={tile.image}
          active={tile.active}
          onClick={() => props.onTileClick(tile.id)}
        />
      ))}
    </div>
  );
}
