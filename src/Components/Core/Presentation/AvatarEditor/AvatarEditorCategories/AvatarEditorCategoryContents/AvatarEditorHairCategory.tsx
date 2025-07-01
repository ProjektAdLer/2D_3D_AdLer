import TileGridLayout from "~ReactComponents/GeneralComponents/TileLayout/TileGridLayout";
import AvatarEditorCategoryContentProps from "./AvatarEditorCategoryContentProps";
import { useTranslation } from "react-i18next";
import {
  OAvatarBeardModels,
  AvatarHairModels,
  AvatarNoneModel,
  AvatarBeardModels,
  OAvatarHairModels,
} from "../../../../../Core/Domain/AvatarModels/AvatarModelTypes";
import { useState } from "react";
import ColorPickerButton from "~ReactComponents/GeneralComponents/ColorPicker/ColorPickerButton";
import ColorPickerModal from "~ReactComponents/GeneralComponents/ColorPicker/ColorPickerModal";

import noneIcon from "../../../../../../Assets/avatarEditorThumbnails/aa-none_Thumbnail.png";
import AccordionElement from "~ReactComponents/GeneralComponents/Accordion/AccordionElement";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";

const noneThumbnail = {
  type: AvatarNoneModel.None,
  image: noneIcon,
};

const hairThumbnails = Object.values(OAvatarHairModels).map<{
  type: AvatarHairModels; // use union type with AvatarNoneModel
  image: string;
}>((type) => ({
  type: type,
  image: require(
    `../../../../../../Assets/avatarEditorThumbnails/hair/hairstyles/aa-${type}.png`,
  ),
}));
hairThumbnails.unshift(noneThumbnail);

const beardThumbnails = Object.values(OAvatarBeardModels).map<{
  type: AvatarBeardModels; // use union type with AvatarNoneModel
  image: string;
}>((type) => ({
  type: type,
  image: require(
    `../../../../../../Assets/avatarEditorThumbnails/hair/beards/aa-${type}.png`,
  ),
}));
beardThumbnails.unshift(noneThumbnail);

export default function AvatarEditorHairCategory(
  props: AvatarEditorCategoryContentProps,
) {
  const { t: translate } = useTranslation("avatarEditor");
  const [showModal, setShowModal] = useState(false);
  const [hairColor] = useObservable(props.viewModel.hairColor);
  const [hairType] = useObservable(props.viewModel.hair);
  const [beardType] = useObservable(props.viewModel.beard);

  const TileGridHairStyles = () => {
    return (
      <TileGridLayout
        tileContents={hairThumbnails.map((thumbnail, index) => ({
          id: index,
          image: thumbnail.image,
          title: translate(thumbnail.type).toString() ?? "",
          active: hairType === thumbnail.type,
        }))}
        columns={5}
        mobileColumns={3}
        onTileClick={(id) => {
          props.controller.onAvatarConfigChanged({
            hair: hairThumbnails[id].type,
          });
        }}
      />
    );
  };

  const TileGridBeards = () => {
    return (
      <TileGridLayout
        tileContents={beardThumbnails.map((thumbnail, index) => ({
          id: index,
          image: thumbnail.image,
          title: translate(thumbnail.type).toString() ?? "",
          active: beardType === thumbnail.type,
        }))}
        columns={5}
        mobileColumns={3}
        onTileClick={(id) => {
          props.controller.onAvatarConfigChanged({
            beard: beardThumbnails[id].type,
          });
        }}
      />
    );
  };

  return (
    <div className="flex flex-col">
      <AccordionElement
        header={translate("hairstylesTitle").toString()}
        isOpen={props.viewModel.uiVisiblity.hairMenu.hairstyles}
        content={TileGridHairStyles()}
        toolTip={translate("accordionCategoryToolTip", {
          subCategory: translate("hairstylesTitle").toString(),
        }).toString()}
      />
      <AccordionElement
        header={translate("beardsTitle").toString()}
        isOpen={props.viewModel.uiVisiblity.hairMenu.beards}
        content={TileGridBeards()}
        toolTip={translate("accordionCategoryToolTip", {
          subCategory: translate("beardsTitle").toString(),
        }).toString()}
      />
      <div className="w-full p-2 m-2">
        <ColorPickerButton
          className=""
          currentColor={
            hairColor ?? { id: 0, nameKey: "Black 1", hexColor: "#000000" }
          }
          onClick={() => setShowModal(true)}
        />
        <ColorPickerModal
          title={translate("hairColorTitle")}
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onColorClickFunction={(color) => {
            props.controller.onAvatarConfigChanged({
              hairColor: color,
            });
          }}
        />
      </div>
    </div>
  );
}
