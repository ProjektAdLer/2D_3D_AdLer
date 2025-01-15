import AvatarEditorCategoryContentProps from "./AvatarEditorCategoryContentProps";
import TileGridLayout from "~ReactComponents/GeneralComponents/TileLayout/TileGridLayout";
import { useTranslation } from "react-i18next";
import AccordionElement from "~ReactComponents/GeneralComponents/Accordion/AccordionElement";
import {
  AvatarNoneModel,
  OAvatarHeadGearModels,
  AvatarHeadgearModels,
  OAvatarGlassesModels,
  AvatarGlassesModels,
  OAvatarBackpackModels,
  AvatarBackpackModels,
} from "src/Components/Core/Domain/AvatarModels/AvatarModelTypes";
import noneIcon from "../../../../../../Assets/avatarEditorThumbnails/aa-none_Thumbnail.png";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";

const noneThumbnail = {
  type: AvatarNoneModel.None,
  image: noneIcon,
};

const headgearThumbnails = Object.values(OAvatarHeadGearModels).map<{
  type: AvatarHeadgearModels;
  image: string;
}>((type) => ({
  type: type,
  image: require(
    `../../../../../../Assets/avatarEditorThumbnails/accessoires/headgear/aa-${type}.png`,
  ),
}));
headgearThumbnails.unshift(noneThumbnail);

const glassesThumbnails = Object.values(OAvatarGlassesModels).map<{
  type: AvatarGlassesModels;
  image: string;
}>((type) => ({
  type: type,
  image: require(
    `../../../../../../Assets/avatarEditorThumbnails/accessoires/glasses/aa-${type}.png`,
  ),
}));
glassesThumbnails.unshift(noneThumbnail);

const backpackThumbnails = Object.values(OAvatarBackpackModels).map<{
  type: AvatarBackpackModels;
  image: string;
}>((type) => ({
  type: type,
  image: require(
    `../../../../../../Assets/avatarEditorThumbnails/accessoires/backpack/aa-${type}.png`,
  ),
}));
backpackThumbnails.unshift(noneThumbnail);

// const backpackThumbnails = require.context(
//   "../../../../../../Assets/avatarEditorThumbnails/accessoires/backpack",
// );
// const backpackThumbnailsList = backpackThumbnails
//   .keys()
//   .map((key) => backpackThumbnails(key));

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
  const [headgearType] = useObservable(props.viewModel.headgear);
  const [glassesType] = useObservable(props.viewModel.glasses);
  const [backpackType] = useObservable(props.viewModel.backpack);

  const TileGridHeadGear = () => {
    return (
      <TileGridLayout
        tileContents={headgearThumbnails.map((thumbnail, index) => ({
          id: index,
          image: thumbnail.image,
          title: translate(thumbnail.type).toString() ?? "",
          active: headgearType === thumbnail.type,
        }))}
        columns={5}
        mobileColumns={3}
        onTileClick={(id) => {
          props.controller.onAvatarConfigChanged({
            headgear: headgearThumbnails[id].type,
          });
        }}
      />
    );
  };

  const TileGridGlasses = () => {
    return (
      <TileGridLayout
        tileContents={glassesThumbnails.map((thumbnail, index) => ({
          id: index,
          image: thumbnail.image,
          title: translate(thumbnail.type).toString() ?? "",
          active: glassesType === thumbnail.type,
        }))}
        columns={5}
        mobileColumns={3}
        onTileClick={(id) => {
          props.controller.onAvatarConfigChanged({
            glasses: glassesThumbnails[id].type,
          });
        }}
      />
    );
  };

  const TileGridBackpacks = () => {
    return (
      <TileGridLayout
        tileContents={backpackThumbnails.map((thumbnail, index) => ({
          id: index,
          image: thumbnail.image,
          title: translate(thumbnail.type).toString() ?? "",
          active: backpackType === thumbnail.type,
        }))}
        columns={5}
        mobileColumns={3}
        onTileClick={(id) => {
          props.controller.onAvatarConfigChanged({
            backpack: backpackThumbnails[id].type,
          });
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
  if (!props.controller || !props.viewModel) return null;
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
