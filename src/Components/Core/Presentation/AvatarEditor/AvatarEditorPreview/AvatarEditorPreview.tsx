import BabylonCanvas from "../../Babylon/SceneManagement/BabylonCanvas";
import AvatarEditorPreviewSceneDefinition from "./AvatarEditorPreviewSceneDefinition";
import tailwindMerge from "../../Utils/TailwindMerge";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

type AvatarEditorPreviewProps = {
  className?: string;
};

export default function AvatarEditorPreview(props: AvatarEditorPreviewProps) {
  return (
    <div className={tailwindMerge(props.className ?? "flex")}>
      <BabylonCanvas
        className={"rounded-xl w-full"}
        sceneDefinitionType={AvatarEditorPreviewSceneDefinition}
      />
      <div className="absolute bottom-0 flex space-x-2 p-2">
        <StyledButton>{"<"}</StyledButton>
        <StyledButton>{"+"}</StyledButton>
        <StyledButton>{"-"}</StyledButton>
        <StyledButton>{">"}</StyledButton>
      </div>
    </div>
  );
}
