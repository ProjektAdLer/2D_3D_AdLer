import BabylonCanvas from "../../Babylon/SceneManagement/BabylonCanvas";
import AvatarEditorPreviewSceneDefinition from "./AvatarEditorPreviewSceneDefinition";
import tailwindMerge from "../../Utils/TailwindMerge";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import AvatarEditorPreviewViewModel from "./AvatarEditorPreviewViewModel";
import IAvatarEditorPreviewController from "./IAvatarEditorPreviewController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";

type AvatarEditorPreviewProps = {
  className?: string;
};

export default function AvatarEditorPreview(props: AvatarEditorPreviewProps) {
  const [, controller] = useBuilder<
    AvatarEditorPreviewViewModel,
    IAvatarEditorPreviewController
  >(BUILDER_TYPES.IAvatarEditorPreviewBuilder);

  return (
    <div className={tailwindMerge(props.className ?? " ")}>
      <BabylonCanvas
        className={"rounded-xl w-full h-full"}
        sceneDefinitionType={AvatarEditorPreviewSceneDefinition}
      />
      <div className="absolute bottom-4 portrait:bottom-2 flex justify-center w-full space-x-2 p-2">
        <StyledButton
          data-testid="left-turn-button"
          onMouseDown={controller.onTurnLeftDown}
          onMouseUp={controller.onTurnLeftUp}
        >
          {"<"}
        </StyledButton>
        <StyledButton
          data-testid="zoom-in-button"
          onMouseDown={controller.onZoomInDown}
          onMouseUp={controller.onZoomInUp}
        >
          {"+"}
        </StyledButton>
        <StyledButton
          data-testid="zoom-out-button"
          onMouseDown={controller.onZoomOutDown}
          onMouseUp={controller.onZoomOutUp}
        >
          {"-"}
        </StyledButton>
        <StyledButton
          data-testid="right-turn-button"
          onMouseDown={controller.onTurnRightDown}
          onMouseUp={controller.onTurnRightUp}
        >
          {">"}
        </StyledButton>
      </div>
    </div>
  );
}
