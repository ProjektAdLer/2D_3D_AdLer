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
    <div className={tailwindMerge(props.className ?? "flex")}>
      <BabylonCanvas
        className={"rounded-xl w-full"}
        sceneDefinitionType={AvatarEditorPreviewSceneDefinition}
      />
      <div className="absolute bottom-0 flex space-x-2 p-2">
        <StyledButton
          onMouseDown={controller.onTurnLeftDown}
          onMouseUp={controller.onTurnLeftUp}
        >
          {"<"}
        </StyledButton>
        <StyledButton
          onMouseDown={controller.onZoomInDown}
          onMouseUp={controller.onZoomInUp}
        >
          {"+"}
        </StyledButton>
        <StyledButton
          onMouseDown={controller.onZoomOutDown}
          onMouseUp={controller.onZoomOutUp}
        >
          {"-"}
        </StyledButton>
        <StyledButton
          onMouseDown={controller.onTurnRightDown}
          onMouseUp={controller.onTurnRightUp}
        >
          {">"}
        </StyledButton>
      </div>
    </div>
  );
}
