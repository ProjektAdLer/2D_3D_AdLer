import RangeSlider from "~ReactComponents/ReactRelated/ReactBaseComponents/RangeSlider";
import AvatarEditorCategoryContentProps from "./AvatarEditorCategoryContentProps";
import faceCategoryIcon from "../../../../../../Assets/icons/face.svg";
import TileGridLayout from "~ReactComponents/GeneralComponents/TileLayout/TileGridLayout";
import { useTranslation } from "react-i18next";

const eyebrowsThumbnails = require.context(
  "../../../../../../Assets/textures/avatar/face/eyebrows",
);
const eyebrowsThumbnailsList = eyebrowsThumbnails
  .keys()
  .map((key) => eyebrowsThumbnails(key));

const eyesThumbnails = require.context(
  "../../../../../../Assets/textures/avatar/face/eyes",
);
const eyesThumbnailsList = eyesThumbnails
  .keys()
  .map((key) => eyesThumbnails(key));

const mouthThumbnails = require.context(
  "../../../../../../Assets/textures/avatar/face/mouths",
);
const mouthThumbnailsList = mouthThumbnails
  .keys()
  .map((key) => mouthThumbnails(key));

const noseThumbnails = require.context(
  "../../../../../../Assets/textures/avatar/face/noses",
);
const noseThumbnailsList = noseThumbnails
  .keys()
  .map((key) => noseThumbnails(key));

export default function AvatarEditorFaceCategory(
  props: AvatarEditorCategoryContentProps,
) {
  const { t: translate } = useTranslation("avatarEditor");

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">{translate("eyebrowsTitle")}</h1>
      <TileGridLayout
        tileContents={eyebrowsThumbnailsList.map((image, index) => ({
          id: index,
          image,
        }))}
        columns={5}
        mobileColumns={3}
        onTileClick={(id) => {
          console.log(id);
        }}
      />

      <h1 className="text-2xl font-bold">{translate("eyesTitle")}</h1>
      <TileGridLayout
        tileContents={eyesThumbnailsList.map((image, index) => ({
          id: index,
          image,
        }))}
        columns={5}
        mobileColumns={3}
        onTileClick={(id) => {
          console.log(id);
        }}
      />

      <h1 className="text-2xl font-bold">{translate("noseTitle")}</h1>
      <TileGridLayout
        tileContents={noseThumbnailsList.map((image, index) => ({
          id: index,
          image,
        }))}
        columns={5}
        mobileColumns={3}
        onTileClick={(id) => {
          console.log(id);
        }}
      />

      <h1 className="text-2xl font-bold">{translate("mouthTitle")}</h1>
      <TileGridLayout
        tileContents={mouthThumbnailsList.map((image, index) => ({
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
