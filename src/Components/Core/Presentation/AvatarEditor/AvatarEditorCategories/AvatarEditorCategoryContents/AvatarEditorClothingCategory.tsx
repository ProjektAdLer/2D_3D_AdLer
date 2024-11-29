import AvatarEditorCategoryContentProps from "./AvatarEditorCategoryContentProps";
import TileGridLayout from "~ReactComponents/GeneralComponents/TileLayout/TileGridLayout";
import { useTranslation } from "react-i18next";
import AvatarColorPalette from "src/Components/Core/Domain/AvatarModels/AvatarColorPalette";
import ColorPickerButton from "~ReactComponents/GeneralComponents/ColorPicker/ColorPickerButton";
import ColorPickerModal from "~ReactComponents/GeneralComponents/ColorPicker/ColorPickerModal";
import { useState } from "react";

const shirtsThumbnails = require.context(
  "../../../../../../Assets/avatarEditorThumbnails/clothing/shirts",
);
const shirtThumbnailsList = shirtsThumbnails
  .keys()
  .map((key) => shirtsThumbnails(key));

const pantsThumbnails = require.context(
  "../../../../../../Assets/avatarEditorThumbnails/clothing/pants",
);
const pantsThumbnailsList = pantsThumbnails
  .keys()
  .map((key) => pantsThumbnails(key));

const shoesThumbnails = require.context(
  "../../../../../../Assets/avatarEditorThumbnails/clothing/shoes",
);
const shoesThumbnailsList = shoesThumbnails
  .keys()
  .map((key) => shoesThumbnails(key));

export default function AvatarEditorClothingCategory(
  props: AvatarEditorCategoryContentProps,
) {
  const { t: translate } = useTranslation("avatarEditor");
  const [showShirtModal, setShowShirtModal] = useState(false);
  const [showPantsModal, setShowPantsModal] = useState(false);
  const [showShoesModal, setShowShoesModal] = useState(false);
  const [shirtColor, setShirtColor] = useState(AvatarColorPalette[0]);
  const [pantsColor, setPantsColor] = useState(AvatarColorPalette[0]);
  const [shoesColor, setShoesColor] = useState(AvatarColorPalette[0]);

  return (
    <div className="flex flex-col">
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
      <div className="w-full p-2 m-2">
        <ColorPickerButton
          className=""
          currentColor={shirtColor}
          onClick={() => setShowShirtModal(true)}
        />
        <ColorPickerModal
          showModal={showShirtModal}
          onClose={() => setShowShirtModal(false)}
          onColorClickFunction={(color) => {
            setShirtColor(color);
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
      <div className="w-full p-2 m-2">
        <ColorPickerButton
          className=""
          currentColor={pantsColor}
          onClick={() => setShowPantsModal(true)}
        />
        <ColorPickerModal
          showModal={showPantsModal}
          onClose={() => setShowPantsModal(false)}
          onColorClickFunction={(color) => {
            setPantsColor(color);
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
      <div className="w-full p-2 m-2">
        <ColorPickerButton
          className=""
          currentColor={shoesColor}
          onClick={() => setShowShoesModal(true)}
        />
        <ColorPickerModal
          showModal={showShoesModal}
          onClose={() => setShowShoesModal(false)}
          onColorClickFunction={(color) => {
            setShoesColor(color);
          }}
        />
      </div>
    </div>
  );
}
