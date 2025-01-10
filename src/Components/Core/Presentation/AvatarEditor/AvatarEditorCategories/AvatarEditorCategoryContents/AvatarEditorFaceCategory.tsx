import AvatarEditorCategoryContentProps from "./AvatarEditorCategoryContentProps";
import TileGridLayout from "~ReactComponents/GeneralComponents/TileLayout/TileGridLayout";
import { useTranslation } from "react-i18next";
import AccordionElement from "~ReactComponents/GeneralComponents/Accordion/AccordionElement";

const eyebrowsThumbnails = require.context(
  "../../../../../../Assets/avatarEditorThumbnails/face/eyebrows",
);
const eyebrowsThumbnailsList = eyebrowsThumbnails
  .keys()
  .map((key) => eyebrowsThumbnails(key));

const eyesThumbnails = require.context(
  "../../../../../../Assets/avatarEditorThumbnails/face/eyes",
);
const eyesThumbnailsList = eyesThumbnails
  .keys()
  .map((key) => eyesThumbnails(key));

const mouthThumbnails = require.context(
  "../../../../../../Assets/avatarEditorThumbnails/face/mouths",
);
const mouthThumbnailsList = mouthThumbnails
  .keys()
  .map((key) => mouthThumbnails(key));

const noseThumbnails = require.context(
  "../../../../../../Assets/avatarEditorThumbnails/face/noses",
);
const noseThumbnailsList = noseThumbnails
  .keys()
  .map((key) => noseThumbnails(key));

export default function AvatarEditorFaceCategory(
  props: AvatarEditorCategoryContentProps,
) {
  const { t: translate } = useTranslation("avatarEditor");

  const TileGridEyebrows = () => {
    return (
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
    );
  };

  const TileGridEyes = () => {
    return (
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
    );
  };

  const TileGridNoses = () => {
    return (
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
    );
  };

  const TielGridMouths = () => {
    return (
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
    );
  };

  return (
    <div className="flex flex-col overflow-y-hidden">
      <AccordionElement
        header={translate("eyebrowsTitle").toString()}
        isOpen={props.viewModel.uiVisiblity.faceMenu.eyebrows}
        content={TileGridEyebrows()}
      />
      <AccordionElement
        header={translate("eyesTitle").toString()}
        isOpen={props.viewModel.uiVisiblity.faceMenu.eyes}
        content={TileGridEyes()}
      />
      <AccordionElement
        header={translate("noseTitle").toString()}
        isOpen={props.viewModel.uiVisiblity.faceMenu.noses}
        content={TileGridNoses()}
      />
      <AccordionElement
        header={translate("mouthTitle").toString()}
        isOpen={props.viewModel.uiVisiblity.faceMenu.mouths}
        content={TielGridMouths()}
      />
    </div>
  );
}
