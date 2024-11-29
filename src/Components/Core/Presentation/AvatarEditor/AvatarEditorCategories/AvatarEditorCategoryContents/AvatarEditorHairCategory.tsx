import TileGridLayout from "~ReactComponents/GeneralComponents/TileLayout/TileGridLayout";
import AvatarEditorCategoryContentProps from "./AvatarEditorCategoryContentProps";
import { useTranslation } from "react-i18next";
import ColorPicker from "~ReactComponents/GeneralComponents/ColorPicker/ColorPicker";
import { defaultColorPickerSchema } from "~ReactComponents/GeneralComponents/ColorPicker/ColorPickerColors";
import { AvatarHairModels } from "src/Components/Core/Domain/AvatarModels/AvatarModelTypes";
import AvatarColorPalette from "src/Components/Core/Domain/AvatarModels/AvatarColorPalette";

const hairThumbnails = Object.values(AvatarHairModels).map((type) => ({
  type: type,
  image: require(
    `../../../../../../Assets/avatarEditorThumbnails/hair/hairstyles/Hair_${type}.png`,
  ),
}));

const beardThumbnailImages = require.context(
  "../../../../../../Assets/avatarEditorThumbnails/hair/beards",
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
      <div className="pb-2 border-b border-gray-500">
        <h1 className="text-2xl font-bold">{translate("hairColorTitle")}</h1>
      </div>
      <div className="w-full p-2 m-2">
        <ColorPicker
          colors={AvatarColorPalette}
          onColorClick={(color) => {
            console.log(color);
          }}
        />
      </div>
      <div className="pb-2 border-b border-gray-500">
        <h1 className="text-2xl font-bold">{translate("hairstylesTitle")}</h1>
      </div>
      <TileGridLayout
        tileContents={hairThumbnails.map((thumbnail, index) => ({
          id: index,
          image: thumbnail.image,
        }))}
        columns={5}
        mobileColumns={3}
        onTileClick={(id) => {
          props.controller.onAvatarConfigChanged({
            hair: hairThumbnails[id].type,
          });
        }}
      />

      <div className="pb-2 border-b border-gray-500">
        <h1 className="text-2xl font-bold">{translate("beardsTitle")}</h1>
      </div>
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
