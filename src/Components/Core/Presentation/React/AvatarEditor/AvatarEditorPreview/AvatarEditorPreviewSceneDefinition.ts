import { inject, injectable } from "inversify";
import AbstractSceneDefinition from "../../../Babylon/SceneManagement/Scenes/AbstractSceneDefinition";
import type IPresentationDirector from "../../../PresentationBuilder/IPresentationDirector";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import type IAvatarBuilder from "../../../Babylon/Avatar/IAvatarBuilder";
import {
  ArcRotateCamera,
  Color4,
  DirectionalLight,
  HemisphericLight,
  MeshBuilder,
  ShadowGenerator,
  Vector3,
} from "@babylonjs/core";
import { ShadowOnlyMaterial } from "@babylonjs/materials/shadowOnly/shadowOnlyMaterial";

@injectable()
export default class AvatarEditorPreviewSceneDefinition extends AbstractSceneDefinition {
  constructor(
    @inject(BUILDER_TYPES.IPresentationDirector)
    private director: IPresentationDirector,
    @inject(BUILDER_TYPES.IAvatarBuilder)
    private avatarBuilder: IAvatarBuilder,
  ) {
    super();
  }

  protected async initializeScene(): Promise<void> {
    this.scene.clearColor = new Color4(0.91, 0.945, 0.977);

    const hemiLight = new HemisphericLight(
      "light",
      new Vector3(0, 1, 0),
      this.scene,
    );
    hemiLight.intensity = 0.7;

    const dirLight = new DirectionalLight(
      "dirLight",
      new Vector3(-2, -1, -1),
      this.scene,
    );
    dirLight.position = new Vector3(20, 40, 20);
    dirLight.intensity = 0.5;

    const box = MeshBuilder.CreateBox(
      "box",
      {
        height: 2,
      },
      this.scene,
    );

    const groundPlane = MeshBuilder.CreatePlane(
      "plane",
      { size: 5 },
      this.scene,
    );
    groundPlane.position.y = -1;
    groundPlane.rotation.x = Math.PI / 2;
    const shadowMat = new ShadowOnlyMaterial("shadowOnly", this.scene);
    shadowMat.activeLight = dirLight;
    groundPlane.material = shadowMat;
    groundPlane.receiveShadows = true;

    const shadowGenerator = new ShadowGenerator(1024, dirLight);
    shadowGenerator.addShadowCaster(box);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurScale = 10;
    shadowGenerator.darkness = 0.7;

    const defaultBetaRotation = Math.PI / 2;
    const camera = new ArcRotateCamera(
      "camera",
      -(Math.PI / 4),
      defaultBetaRotation,
      5,
      new Vector3(0, 0, 0),
      this.scene,
    );
    camera.upperBetaLimit = defaultBetaRotation;
    camera.lowerBetaLimit = defaultBetaRotation;
    camera.attachControl();

    dirLight.parent = camera;
  }
}
