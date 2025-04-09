import { Mesh, NullEngine, Scene, Vector3 } from "@babylonjs/core";
import AvatarModelTransforms from "../../../Core/Domain/AvatarModels/AvatarModelTransforms";

describe("AvatarModelTransforms", () => {
  test("sets backpack position to defined value", () => {
    const mesh = new Mesh("", new Scene(new NullEngine()));
    AvatarModelTransforms.backpack(mesh);

    expect(mesh.position).toEqual(new Vector3(0, 0.36, 0));
  });

  test("sets other model position to defined value", () => {
    const mesh = new Mesh("", new Scene(new NullEngine()));
    AvatarModelTransforms.sheriffStar(mesh);

    expect(mesh.position).toEqual(new Vector3(0, 0.28, 0.04));
  });
});
