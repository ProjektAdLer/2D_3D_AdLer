import AvatarEditorCategoryContentProps from "./AvatarEditorCategoryContentProps";
import TileGridLayout from "~ReactComponents/GeneralComponents/TileLayout/TileGridLayout";
import { useTranslation } from "react-i18next";
import AccordionElement from "~ReactComponents/GeneralComponents/Accordion/AccordionElement";

const headgearThumbnails = require.context(
  "../../../../../../Assets/avatarEditorThumbnails/accessoires/headgear",
);
const headgearThumbnailsList = headgearThumbnails
  .keys()
  .map((key) => headgearThumbnails(key));

const glassesThumbnails = require.context(
  "../../../../../../Assets/avatarEditorThumbnails/accessoires/glasses",
);
const glassesThumbnailsList = glassesThumbnails
  .keys()
  .map((key) => glassesThumbnails(key));

const backpackThumbnails = require.context(
  "../../../../../../Assets/avatarEditorThumbnails/accessoires/backpack",
);
const backpackThumbnailsList = backpackThumbnails
  .keys()
  .map((key) => backpackThumbnails(key));

const otherThumbnails = require.context(
  "../../../../../../Assets/avatarEditorThumbnails/accessoires/other",
);
const otherThumbnailsList = otherThumbnails
  .keys()
  .map((key) => otherThumbnails(key));

export default function AvatarEditorAccessoireCategory(
  props: AvatarEditorCategoryContentProps,
) {
  const { t: translate } = useTranslation("avatarEditor");

  const TileGridHeadGear = () => {
    return (
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
    );
  };

  const TileGridGlasses = () => {
    return (
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
    );
  };

  const TileGridBackpacks = () => {
    return (
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
    );
  };

  const TileGridOthers = () => {
    return (
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
    );
  };

  return (
    <div className="flex flex-col">
      <AccordionElement
        header={translate("headgearTitle").toString()}
        isOpen={props.viewModel.uiVisiblity.accessoireMenu.headGear}
        content={TileGridHeadGear()}
      />
      <AccordionElement
        header={translate("glassesTitle").toString()}
        isOpen={props.viewModel.uiVisiblity.accessoireMenu.glasses}
        content={TileGridGlasses()}
      />
      <AccordionElement
        header={translate("backpackTitle").toString()}
        isOpen={props.viewModel.uiVisiblity.accessoireMenu.backpack}
        content={TileGridBackpacks()}
      />
      <AccordionElement
        header={translate("otherTitle").toString()}
        isOpen={props.viewModel.uiVisiblity.accessoireMenu.other}
        content={TileGridOthers()}
      />
    </div>
  );
}
