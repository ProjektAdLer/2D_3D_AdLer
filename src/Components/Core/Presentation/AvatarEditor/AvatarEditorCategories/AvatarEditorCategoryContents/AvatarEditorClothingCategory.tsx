import AvatarEditorCategoryContentProps from "./AvatarEditorCategoryContentProps";
import TileGridLayout from "~ReactComponents/GeneralComponents/TileLayout/TileGridLayout";
import { useTranslation } from "react-i18next";
import AvatarColorPalette from "src/Components/Core/Domain/AvatarModels/AvatarColorPalette";
import ColorPickerButton from "~ReactComponents/GeneralComponents/ColorPicker/ColorPickerButton";
import ColorPickerModal from "~ReactComponents/GeneralComponents/ColorPicker/ColorPickerModal";
import { useState } from "react";
import AccordionElement from "~ReactComponents/GeneralComponents/Accordion/AccordionElement";
import {
  AvatarNoneModel,
  OAvatarPantsModels,
  AvatarPantsModels,
  OAvatarShirtModels,
  AvatarShirtModels,
} from "src/Components/Core/Domain/AvatarModels/AvatarModelTypes";
import noneIcon from "../../../../../../Assets/avatarEditorThumbnails/aa-none_Thumbnail.png";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";

const noneThumbnail = {
  type: AvatarNoneModel.None,
  image: noneIcon,
};

const shirtThumbnails = Object.values(OAvatarShirtModels).map<{
  type: AvatarShirtModels;
  image: string;
}>((type) => ({
  type: type,
  image: require(
    `../../../../../../Assets/avatarEditorThumbnails/clothing/shirts/aa-${type}.png`,
  ),
}));
shirtThumbnails.unshift(noneThumbnail);

const pantsThumbnails = Object.values(OAvatarPantsModels).map<{
  type: AvatarPantsModels;
  image: string;
}>((type) => ({
  type: type,
  image: require(
    `../../../../../../Assets/avatarEditorThumbnails/clothing/pants/aa-${type}.png`,
  ),
}));
pantsThumbnails.unshift(noneThumbnail);

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
  const [shirtType] = useObservable(props.viewModel.shirt);
  const [shirtColor] = useObservable(props.viewModel.shirtColor);
  const [pantsType] = useObservable(props.viewModel.pants);
  const [pantsColor] = useObservable(props.viewModel.pantsColor);
  const [shoesColor, setShoesColor] = useState(AvatarColorPalette[0]);

  const TileGridShirts = () => {
    return (
      <>
        <TileGridLayout
          tileContents={shirtThumbnails.map((thumbnails, index) => ({
            id: index,
            image: thumbnails.image,
            title: translate(thumbnails.type).toString() ?? "",
            active: shirtType === thumbnails.type,
          }))}
          columns={5}
          mobileColumns={3}
          onTileClick={(id) => {
            props.controller.onAvatarConfigChanged({
              shirt: shirtThumbnails[id].type,
            });
          }}
        />
        <div className="w-full p-2 m-2">
          <ColorPickerButton
            currentColor={
              shirtColor ?? { id: 0, nameKey: "Black 1", hexColor: "#000000" }
            }
            onClick={() => setShowShirtModal(true)}
          />
          <ColorPickerModal
            title={translate("shirtsColorTitle")}
            showModal={showShirtModal}
            onClose={() => setShowShirtModal(false)}
            onColorClickFunction={(color) => {
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
          tileContents={pantsThumbnails.map((thumbnail, index) => ({
            id: index,
            image: thumbnail.image,
            title: translate(thumbnail.type).toString() ?? "",
            active: pantsType === thumbnail.type,
          }))}
          columns={5}
          mobileColumns={3}
          onTileClick={(id) => {
            props.controller.onAvatarConfigChanged({
              pants: pantsThumbnails[id].type,
            });
          }}
        />
        <div className="w-full p-2 m-2">
          <ColorPickerButton
            currentColor={
              pantsColor ?? { id: 0, nameKey: "Black 1", hexColor: "#000000" }
            }
            onClick={() => setShowPantsModal(true)}
          />
          <ColorPickerModal
            title={translate("pantsColorTitle")}
            showModal={showPantsModal}
            onClose={() => setShowPantsModal(false)}
            onColorClickFunction={(color) => {
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
            currentColor={
              shoesColor ?? { id: 0, nameKey: "Black 1", hexColor: "#000000" }
            }
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
  if (!props.controller || !props.viewModel) return null;
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
