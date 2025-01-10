import AvatarEditorCategoryContentProps from "./AvatarEditorCategoryContentProps";
import TileGridLayout from "~ReactComponents/GeneralComponents/TileLayout/TileGridLayout";
import { useTranslation } from "react-i18next";
import AvatarColorPalette from "src/Components/Core/Domain/AvatarModels/AvatarColorPalette";
import ColorPickerButton from "~ReactComponents/GeneralComponents/ColorPicker/ColorPickerButton";
import ColorPickerModal from "~ReactComponents/GeneralComponents/ColorPicker/ColorPickerModal";
import { useState } from "react";
import AccordionElement from "~ReactComponents/GeneralComponents/Accordion/AccordionElement";

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

  const TileGridShirts = () => {
    return (
      <>
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
            currentColor={shirtColor}
            onClick={() => setShowShirtModal(true)}
          />
          <ColorPickerModal
            title={translate("shirtsColorTitle")}
            showModal={showShirtModal}
            onClose={() => setShowShirtModal(false)}
            onColorClickFunction={(color) => {
              setShirtColor(color);
              props.controller.onAvatarConfigChanged({
                shirtColor: color,
              });
            }}
          />
        </div>
      </>
    );
  };

  const TileGridPants = () => {
    return (
      <>
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
            currentColor={pantsColor}
            onClick={() => setShowPantsModal(true)}
          />
          <ColorPickerModal
            title={translate("pantsColorTitle")}
            showModal={showPantsModal}
            onClose={() => setShowPantsModal(false)}
            onColorClickFunction={(color) => {
              setPantsColor(color);
              props.controller.onAvatarConfigChanged({
                pantsColor: color,
              });
            }}
          />
        </div>
      </>
    );
  };

  const TileGridShoes = () => {
    return (
      <>
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
            currentColor={shoesColor}
            onClick={() => setShowShoesModal(true)}
          />
          <ColorPickerModal
            title={translate("shoesColorTitle")}
            showModal={showShoesModal}
            onClose={() => setShowShoesModal(false)}
            onColorClickFunction={(color) => {
              setShoesColor(color);
              props.controller.onAvatarConfigChanged({
                shoesColor: color,
              });
            }}
          />
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col">
      <AccordionElement
        header={translate("shirtsTitle").toString()}
        isOpen={props.viewModel.uiVisiblity.clothingMenu.shirts}
        content={TileGridShirts()}
      />
      <AccordionElement
        header={translate("pantsTitle").toString()}
        isOpen={props.viewModel.uiVisiblity.clothingMenu.pants}
        content={TileGridPants()}
      />
      <AccordionElement
        header={translate("shoesTitle").toString()}
        isOpen={props.viewModel.uiVisiblity.clothingMenu.shoes}
        content={TileGridShoes()}
      />
    </div>
  );
}
