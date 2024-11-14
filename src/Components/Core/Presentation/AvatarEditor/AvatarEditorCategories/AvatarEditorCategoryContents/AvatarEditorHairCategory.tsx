import TileGridLayout from "~ReactComponents/GeneralComponents/TileLayout/TileGridLayout";
import AvatarEditorCategoryContentProps from "./AvatarEditorCategoryContentProps";
import { useTranslation } from "react-i18next";
import ColorPicker from "~ReactComponents/GeneralComponents/ColorPicker/ColorPicker";
import { defaultColorPickerSchema } from "~ReactComponents/GeneralComponents/ColorPicker/ColorPickerColors";

const hairThumbnailImages = require.context(
  "../../../../../../Assets/3dModels/avatar/hair/hairstyles",
);
const hairThumbnailImageList = hairThumbnailImages
  .keys()
  .map((key) => hairThumbnailImages(key));

const beardThumbnailImages = require.context(
  "../../../../../../Assets/3dModels/avatar/hair/beards",
);
const beardThumbnailImageList = beardThumbnailImages
  .keys()
  .map((key) => beardThumbnailImages(key));

export default function AvatarEditorHairCategory(
  props: AvatarEditorCategoryContentProps,
) {
  const { t: translate } = useTranslation("avatarEditor");

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">{translate("hairColorTitle")}</h1>
      <ColorPicker
        colors={defaultColorPickerSchema}
        onColorClick={(color) => {
          console.log(color);
        }}
      />
      <h1 className="text-2xl font-bold">{translate("hairstylesTitle")}</h1>
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
      <h1 className="text-2xl font-bold">{translate("beardsTitle")}</h1>
      <TileGridLayout
        tileContents={beardThumbnailImageList.map((image, index) => ({
          id: index,
          image,
        }))}
        columns={5}
        mobileColumns={3}
        onTileClick={(id) => {
          console.log(id);
        }}
      />
    </div>
  );
}
