import TileGridLayout from "~ReactComponents/GeneralComponents/TileLayout/TileGridLayout";
import AvatarEditorCategoryContentProps from "./AvatarEditorCategoryContentProps";

const hairThumbnailImages = require.context(
  "../../../../../../Assets/3dModels/avatar/hair/hairstyles",
);
const hairThumbnailImageList = hairThumbnailImages
  .keys()
  .map((key) => hairThumbnailImages(key));

export default function AvatarEditorHairCategory(
  props: AvatarEditorCategoryContentProps,
) {
  return (
    <TileGridLayout
      tileContents={hairThumbnailImageList.map((image, index) => ({
        id: index,
        image,
      }))}
      columns={5}
      mobileColumns={3}
      onTileClick={(id) => {
        console.log(id);
      }}
    />
  );
}
