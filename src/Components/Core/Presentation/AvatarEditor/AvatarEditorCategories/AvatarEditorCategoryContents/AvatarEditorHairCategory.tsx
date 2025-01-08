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
import AvatarColorPalette from "../../../../../Core/Domain/AvatarModels/AvatarColorPalette";
import { useState } from "react";
import ColorPickerButton from "~ReactComponents/GeneralComponents/ColorPicker/ColorPickerButton";
import ColorPickerModal from "~ReactComponents/GeneralComponents/ColorPicker/ColorPickerModal";

import noneIcon from "../../../../../../Assets/avatarEditorThumbnails/none_Thumbnail.svg";

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
    `../../../../../../Assets/avatarEditorThumbnails/hair/hairstyles/${type}.png`,
  ),
}));
hairThumbnails.unshift(noneThumbnail);

const beardThumbnails = Object.values(OAvatarBeardModels).map<{
  type: AvatarBeardModels; // use union type with AvatarNoneModel
  image: string;
}>((type) => ({
  type: type,
  image: require(
    `../../../../../../Assets/avatarEditorThumbnails/hair/beards/${type}.png`,
  ),
}));
beardThumbnails.unshift(noneThumbnail);

export default function AvatarEditorHairCategory(
  props: AvatarEditorCategoryContentProps,
) {
  const { t: translate } = useTranslation("avatarEditor");
  const [showModal, setShowModal] = useState(false);
  const [hairColor, setHairColor] = useState(AvatarColorPalette[0]);

  return (
    <div className="flex flex-col">
      <div className="pb-2 border-b border-gray-500">
        <h1 className="text-2xl font-bold">{translate("hairstylesTitle")}</h1>
      </div>
      <TileGridLayout
        tileContents={hairThumbnails.map((thumbnail, index) => ({
          id: index,
          image: thumbnail.image,
          title: translate(thumbnail.type).toString() ?? "",
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
        tileContents={beardThumbnails.map((thumbnail, index) => ({
          id: index,
          image: thumbnail.image,
          title: translate(thumbnail.type).toString() ?? "",
        }))}
        columns={5}
        mobileColumns={3}
        onTileClick={(id) => {
          props.controller.onAvatarConfigChanged({
            beard: beardThumbnails[id].type,
          });
        }}
      />
      <div className="w-full p-2 m-2">
        <ColorPickerButton
          className=""
          currentColor={hairColor}
          onClick={() => setShowModal(true)}
        />
        <ColorPickerModal
          title={translate("hairColorTitle")}
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onColorClickFunction={(color) => {
            setHairColor(color);
            props.controller.onAvatarConfigChanged({
              hairColor: color,
            });
          }}
        />
      </div>
    </div>
  );
}
