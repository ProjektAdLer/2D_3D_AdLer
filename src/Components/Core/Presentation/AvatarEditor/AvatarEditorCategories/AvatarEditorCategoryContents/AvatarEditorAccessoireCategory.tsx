import AvatarEditorCategoryContentProps from "./AvatarEditorCategoryContentProps";
import TileGridLayout from "~ReactComponents/GeneralComponents/TileLayout/TileGridLayout";
import { useTranslation } from "react-i18next";

const headgearThumbnails = require.context(
  "../../../../../../Assets/3dModels/avatar/accessoires/headgear",
);
const headgearThumbnailsList = headgearThumbnails
  .keys()
  .map((key) => headgearThumbnails(key));

const glassesThumbnails = require.context(
  "../../../../../../Assets/3dModels/avatar/accessoires/glasses",
);
const glassesThumbnailsList = glassesThumbnails
  .keys()
  .map((key) => glassesThumbnails(key));

const backpackThumbnails = require.context(
  "../../../../../../Assets/3dModels/avatar/accessoires/backpack",
);
const backpackThumbnailsList = backpackThumbnails
  .keys()
  .map((key) => backpackThumbnails(key));

const otherThumbnails = require.context(
  "../../../../../../Assets/3dModels/avatar/accessoires/other",
);
const otherThumbnailsList = otherThumbnails
  .keys()
  .map((key) => otherThumbnails(key));

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
        tileContents={headgearThumbnailsList.map((image, index) => ({
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
        tileContents={glassesThumbnailsList.map((image, index) => ({
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
        <h1 className="text-2xl font-bold">{translate("backpackTitle")}</h1>
      </div>
      <TileGridLayout
        tileContents={backpackThumbnailsList.map((image, index) => ({
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
        tileContents={otherThumbnailsList.map((image, index) => ({
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
