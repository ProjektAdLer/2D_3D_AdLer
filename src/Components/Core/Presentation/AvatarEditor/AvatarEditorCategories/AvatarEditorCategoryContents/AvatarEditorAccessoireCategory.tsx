import AvatarEditorCategoryContentProps from "./AvatarEditorCategoryContentProps";
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

export default function AvatarEditorAccessoireCategory(
  props: AvatarEditorCategoryContentProps,
) {
  const { t: translate } = useTranslation("avatarEditor");

  return (
    <div className="flex flex-col">
      <div className="pb-2 border-b border-gray-500">
        <h1 className="text-2xl font-bold">{translate("headgearTitle")}</h1>
      </div>
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

      <div className="pb-2 border-b border-gray-500">
        <h1 className="text-2xl font-bold">{translate("glassesTitle")}</h1>
      </div>
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
      <div className="pb-2 border-b border-gray-500">
        <h1 className="text-2xl font-bold">{translate("otherTitle")}</h1>
      </div>
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
    </div>
  );
}
