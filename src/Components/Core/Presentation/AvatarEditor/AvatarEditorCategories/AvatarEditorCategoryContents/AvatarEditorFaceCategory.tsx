import AvatarEditorCategoryContentProps from "./AvatarEditorCategoryContentProps";
import TileGridLayout from "~ReactComponents/GeneralComponents/TileLayout/TileGridLayout";
import { useTranslation } from "react-i18next";
import AccordionElement from "~ReactComponents/GeneralComponents/Accordion/AccordionElement";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import {
  AvatarEyeBrowTexture,
  AvatarEyeTexture,
  AvatarMouthTexture,
  AvatarNoseTexture,
} from "src/Components/Core/Domain/AvatarModels/AvatarFaceUVTexture";

const eyebrowsThumbnails = Object.values(AvatarEyeBrowTexture).map<{
  id: number;
  image: string;
  title: string;
}>((entry) => ({
  id: entry.id,
  image: require(
    `../../../../../../Assets/avatarEditorThumbnails/face/eyebrows/${entry.name}.png`,
  ),
  title: entry.name,
}));

const eyesThumbnails = Object.values(AvatarEyeTexture).map<{
  id: number;
  image: string;
  title: string;
}>((entry) => ({
  id: entry.id,
  image: require(
    `../../../../../../Assets/avatarEditorThumbnails/face/eyes/${entry.name}.png`,
  ),
  title: entry.name,
}));

const nosesThumbnails = Object.values(AvatarNoseTexture).map<{
  id: number;
  image: string;
  title: string;
}>((entry) => ({
  id: entry.id,
  image: require(
    `../../../../../../Assets/avatarEditorThumbnails/face/noses/${entry.name}.png`,
  ),
  title: entry.name,
}));

const mouthThumbnails = Object.values(AvatarMouthTexture).map<{
  id: number;
  image: string;
  title: string;
}>((entry) => ({
  id: entry.id,
  image: require(
    `../../../../../../Assets/avatarEditorThumbnails/face/mouths/${entry.name}.png`,
  ),
  title: entry.name,
}));

export default function AvatarEditorFaceCategory(
  props: AvatarEditorCategoryContentProps,
) {
  const { t: translate } = useTranslation("avatarEditor");
  const [eyebrowType] = useObservable(props.viewModel.eyebrows);
  const [eyeType] = useObservable(props.viewModel.eyes);
  const [noseType] = useObservable(props.viewModel.nose);
  const [mouthType] = useObservable(props.viewModel.mouth);

  const TileGridEyebrows = () => {
    return (
      <TileGridLayout
        tileContents={eyebrowsThumbnails.map((entry, index) => ({
          id: index,
          image: entry.image,
          active:
            index !== undefined
              ? eyebrowType === AvatarEyeBrowTexture[index].id
              : false,
          title: translate(AvatarEyeBrowTexture[index].name).toString(),
        }))}
        columns={5}
        mobileColumns={3}
        onTileClick={(id) => {
          props.controller.onAvatarConfigChanged({
            eyebrows: id,
          });
        }}
      />
    );
  };

  const TileGridEyes = () => {
    return (
      <TileGridLayout
        tileContents={eyesThumbnails.map((entry, index) => ({
          id: index,
          image: entry.image,
          active:
            index !== undefined
              ? eyeType === AvatarEyeTexture[index].id
              : false,
          title: translate(AvatarEyeTexture[index].name).toString(),
        }))}
        columns={4}
        mobileColumns={3}
        onTileClick={(id) => {
          props.controller.onAvatarConfigChanged({
            eyes: id,
          });
        }}
      />
    );
  };

  const TileGridNoses = () => {
    return (
      <TileGridLayout
        tileContents={nosesThumbnails.map((entry, index) => ({
          id: index,
          image: entry.image,
          active:
            index !== undefined
              ? noseType === AvatarNoseTexture[index].id
              : false,
          title: translate(AvatarNoseTexture[index].name).toString(),
        }))}
        columns={5}
        mobileColumns={3}
        onTileClick={(id) => {
          props.controller.onAvatarConfigChanged({
            nose: id,
          });
        }}
      />
    );
  };

  const TielGridMouths = () => {
    return (
      <TileGridLayout
        tileContents={mouthThumbnails.map((entry, index) => ({
          id: index,
          image: entry.image,
          active:
            index !== undefined
              ? mouthType === AvatarMouthTexture[index].id
              : false,
          title: translate(AvatarMouthTexture[index].name).toString(),
        }))}
        columns={5}
        mobileColumns={3}
        onTileClick={(id) => {
          props.controller.onAvatarConfigChanged({ mouth: id });
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
        toolTip={translate("accordionCategoryToolTip", {
          subCategory: translate("eyebrowsTitle").toString(),
        }).toString()}
        testid="eyebrows_accordion"
      />
      <AccordionElement
        header={translate("eyesTitle").toString()}
        isOpen={props.viewModel.uiVisiblity.faceMenu.eyes}
        content={TileGridEyes()}
        toolTip={translate("accordionCategoryToolTip", {
          subCategory: translate("eyesTitle").toString(),
        }).toString()}
        testid="eye_accordion"
      />
      <AccordionElement
        header={translate("noseTitle").toString()}
        isOpen={props.viewModel.uiVisiblity.faceMenu.noses}
        content={TileGridNoses()}
        toolTip={translate("accordionCategoryToolTip", {
          subCategory: translate("noseTitle").toString(),
        }).toString()}
        testid="nose_accordion"
      />
      <AccordionElement
        header={translate("mouthTitle").toString()}
        isOpen={props.viewModel.uiVisiblity.faceMenu.mouths}
        content={TielGridMouths()}
        toolTip={translate("accordionCategoryToolTip", {
          subCategory: translate("mouthTitle").toString(),
        }).toString()}
        testid="mouth_accordion"
      />
    </div>
  );
}
