import { Mesh, Vector3 } from "@babylonjs/core";

const AvatarModelTransforms = {
  backpack: (mesh: Mesh) => {
    mesh.position = new Vector3(0, 0.36, 0);
  },
  sheriffStar: (mesh: Mesh) => {
    mesh.position = new Vector3(0, 0.28, 0.04);
  },
} as const;
export default AvatarModelTransforms;
