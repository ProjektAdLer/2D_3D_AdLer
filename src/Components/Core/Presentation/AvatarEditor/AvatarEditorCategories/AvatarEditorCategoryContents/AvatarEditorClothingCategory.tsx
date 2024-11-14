import AvatarEditorCategoryContentProps from "./AvatarEditorCategoryContentProps";
import TileGridLayout from "~ReactComponents/GeneralComponents/TileLayout/TileGridLayout";
import { useTranslation } from "react-i18next";
import ColorPicker from "~ReactComponents/GeneralComponents/ColorPicker/ColorPicker";
import { defaultColorPickerSchema } from "~ReactComponents/GeneralComponents/ColorPicker/ColorPickerColors";

const shirtsThumbnails = require.context(
  "../../../../../../Assets/3dModels/avatar/clothing/shirts",
);
const shirtThumbnailsList = shirtsThumbnails
  .keys()
  .map((key) => shirtsThumbnails(key));

const pantsThumbnails = require.context(
  "../../../../../../Assets/3dModels/avatar/clothing/pants",
);
const pantsThumbnailsList = pantsThumbnails
  .keys()
  .map((key) => pantsThumbnails(key));

const shoesThumbnails = require.context(
  "../../../../../../Assets/3dModels/avatar/clothing/shoes",
);
const shoesThumbnailsList = shoesThumbnails
  .keys()
  .map((key) => shoesThumbnails(key));

export default function AvatarEditorClothingCategory(
  props: AvatarEditorCategoryContentProps,
) {
  const { t: translate } = useTranslation("avatarEditor");

  return (
    <div className="flex flex-col">
      <div className="pb-2 border-b border-gray-500">
        <h1 className="text-2xl font-bold">{translate("shirtsColorTitle")}</h1>
      </div>
      <div className="flex flex-col w-full p-2 m-2 overflow-y-auto h-52">
        <ColorPicker
          colors={defaultColorPickerSchema}
          onColorClick={(color) => {
            console.log(color);
          }}
        />
      </div>
      <div className="pb-2 border-b border-gray-500">
        <h1 className="text-2xl font-bold">{translate("shirtsTitle")}</h1>
      </div>
      <TileGridLayout
        tileContents={shirtThumbnailsList.map((image, index) => ({
          id: index,
          image,
        }))}
        columns={5}
        mobileColumns={3}
        onTileClick={(id) => {
          console.log(id);
        }}
      />

      <div className="pb-2 border-b border-gray-500">
        <h1 className="text-2xl font-bold">{translate("pantsColorTitle")}</h1>
      </div>
      <div className="flex flex-col w-full p-2 m-2 overflow-y-auto h-52">
        <ColorPicker
          colors={defaultColorPickerSchema}
          onColorClick={(color) => {
            console.log(color);
          }}
        />
      </div>

      <div className="pb-2 border-b border-gray-500">
        <h1 className="text-2xl font-bold">{translate("pantsTitle")}</h1>
      </div>
      <TileGridLayout
        tileContents={pantsThumbnailsList.map((image, index) => ({
          id: index,
          image,
        }))}
        columns={5}
        mobileColumns={3}
        onTileClick={(id) => {
          console.log(id);
        }}
      />
      <div className="pb-2 border-b border-gray-500">
        <h1 className="text-2xl font-bold">{translate("shoesColorTitle")}</h1>
      </div>
      <div className="flex flex-col w-full p-2 m-2 overflow-y-auto h-52">
        <ColorPicker
          colors={defaultColorPickerSchema}
          onColorClick={(color) => {
            console.log(color);
          }}
        />
      </div>
      <div className="pb-2 border-b border-gray-500">
        <h1 className="text-2xl font-bold">{translate("shoesTitle")}</h1>
      </div>
      <TileGridLayout
        tileContents={shoesThumbnailsList.map((image, index) => ({
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
