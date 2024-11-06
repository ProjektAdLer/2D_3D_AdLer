import BabylonCanvas from "../../../Babylon/SceneManagement/BabylonCanvas";
import AvatarEditorPreviewSceneDefinition from "./AvatarEditorPreviewSceneDefinition";
import tailwindMerge from "../../../Utils/TailwindMerge";

type AvatarEditorPreviewProps = {
  className?: string;
};

export default function AvatarEditorPreview(props: AvatarEditorPreviewProps) {
  return (
    <BabylonCanvas
      className={tailwindMerge("rounded-xl", props.className ?? "")}
      sceneDefinitionType={AvatarEditorPreviewSceneDefinition}
    />
  );
}
