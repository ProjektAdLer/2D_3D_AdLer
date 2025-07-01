import BabylonCanvas from "../../Babylon/SceneManagement/BabylonCanvas";
import AvatarEditorPreviewSceneDefinition from "./AvatarEditorPreviewSceneDefinition";
import tailwindMerge from "../../Utils/TailwindMerge";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import AvatarEditorPreviewViewModel from "./AvatarEditorPreviewViewModel";
import IAvatarEditorPreviewController from "./IAvatarEditorPreviewController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import plusIcon from "../../../../../Assets/icons/plus.svg";
import minusIcon from "../../../../../Assets/icons/minus.svg";
import leftIcon from "../../../../../Assets/icons/left.svg";
import rightIcon from "../../../../../Assets/icons/right.svg";
import { useTranslation } from "react-i18next";
type AvatarEditorPreviewProps = {
  className?: string;
};

export default function AvatarEditorPreview(props: AvatarEditorPreviewProps) {
  const [, controller] = useBuilder<
    AvatarEditorPreviewViewModel,
    IAvatarEditorPreviewController
  >(BUILDER_TYPES.IAvatarEditorPreviewBuilder);

  const { t: translate } = useTranslation("avatarEditor");

  return (
    <div className={tailwindMerge(props.className ?? " ")}>
      <BabylonCanvas
        className={"rounded-xl w-full h-full"}
        sceneDefinitionType={AvatarEditorPreviewSceneDefinition}
      />
      <div className="absolute flex justify-center w-full p-2 space-x-2 bottom-4 portrait:bottom-2">
        <StyledButton
          data-testid="left-turn-button"
          onPointerDown={controller.onTurnLeftDown}
          onPointerOut={controller.onTurnLeftUp}
          onPointerUp={controller.onTurnLeftUp}
          title={translate("leftToolTip").toString()}
        >
          <img className="w-10 xl:w-12 " src={leftIcon} alt="Left Icon" />
        </StyledButton>
        <StyledButton
          data-testid="zoom-in-button"
          onPointerDown={controller.onZoomInDown}
          onPointerOut={controller.onZoomInUp}
          onPointerUp={controller.onZoomInUp}
          title={translate("plusToolTip").toString()}
        >
          <img className="w-10 xl:w-12 " src={plusIcon} alt="Plus Icon" />
        </StyledButton>
        <StyledButton
          data-testid="zoom-out-button"
          onPointerDown={controller.onZoomOutDown}
          onPointerOut={controller.onZoomOutUp}
          onPointerUp={controller.onZoomOutUp}
          title={translate("minusToolTip").toString()}
        >
          <img className="w-10 xl:w-12 " src={minusIcon} alt="Minus Icon" />
        </StyledButton>
        <StyledButton
          data-testid="right-turn-button"
          onPointerDown={controller.onTurnRightDown}
          onPointerOut={controller.onTurnRightUp}
          onPointerUp={controller.onTurnRightUp}
          title={translate("rightToolTip").toString()}
        >
          <img className="w-10 xl:w-12 " src={rightIcon} alt="Right Icon" />
        </StyledButton>
      </div>
    </div>
  );
}
