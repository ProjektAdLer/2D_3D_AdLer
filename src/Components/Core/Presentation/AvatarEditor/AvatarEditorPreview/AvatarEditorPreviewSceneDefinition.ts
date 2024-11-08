import { inject, injectable } from "inversify";
import AbstractSceneDefinition from "../../Babylon/SceneManagement/Scenes/AbstractSceneDefinition";
import type IPresentationDirector from "../../PresentationBuilder/IPresentationDirector";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import {
  Color3,
  Color4,
  DirectionalLight,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  SceneLoader,
  ShadowGenerator,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import { ShadowOnlyMaterial } from "@babylonjs/materials/shadowOnly/shadowOnlyMaterial";
import AvatarEditorPreviewCameraBuilder from "./AvatarEditorPreviewCamera/AvatarEditorPreviewCameraBuilder";

const modelLink = require("../../../../../Assets/3dModels/sharedModels/3DModel_Avatar_male.glb");

@injectable()
export default class AvatarEditorPreviewSceneDefinition extends AbstractSceneDefinition {
  constructor(
    @inject(BUILDER_TYPES.IPresentationDirector)
    private director: IPresentationDirector,
    @inject(BUILDER_TYPES.IAvatarEditorPreviewCameraBuilder)
    private cameraBuilder: AvatarEditorPreviewCameraBuilder,
  ) {
    super();
  }

  protected async initializeScene(): Promise<void> {
    this.scene.clearColor = new Color4(0.91, 0.945, 0.977);

    // Create Preview Camera
    this.director.build(this.cameraBuilder);

    // Lights
    const hemiLight = new HemisphericLight(
      "ambientLight",
      new Vector3(0, 1, 0),
      this.scene,
    );
    hemiLight.intensity = 0.5;

    const keyLight = new DirectionalLight(
      "keyLight",
      new Vector3(1, -1, 1),
      this.scene,
    );
    keyLight.intensity = 1.8;

    const fillLight = new DirectionalLight(
      "fillLight",
      new Vector3(-1, 0, -1),
      this.scene,
    );
    fillLight.intensity = 0.7;

    keyLight.parent = this.scene.activeCamera;
    fillLight.parent = this.scene.activeCamera;

    // Avatar Placeholder
    let avatar: Mesh[];
    await SceneLoader.ImportMeshAsync("", modelLink, "", this.scene).then(
      (result) => {
        avatar = result.meshes as Mesh[];
        avatar[0].position.y = -1;
      },
    );

    // Ground Plane
    const groundPlane = MeshBuilder.CreatePlane(
      "plane",
      { size: 20 },
      this.scene,
    );
    groundPlane.position.y = -1;
    groundPlane.rotation.x = Math.PI / 2;
    const shadowMat = new ShadowOnlyMaterial("shadowOnly", this.scene);
    shadowMat.activeLight = keyLight;
    groundPlane.material = shadowMat;
    groundPlane.receiveShadows = true;

    const podium = MeshBuilder.CreateCylinder(
      "podium",
      { diameterTop: 1, diameterBottom: 1, height: 0.05, tessellation: 64 },
      this.scene,
    );
    podium.position.y = -1;
    podium.material = new StandardMaterial("podiumMat", this.scene);
    (podium.material as StandardMaterial).diffuseColor = new Color3(
      0.5,
      0.5,
      0.5,
    );
    podium.receiveShadows = true;

    // Shadow Generator
    const shadowGenerator = new ShadowGenerator(1024, keyLight);
    avatar!.forEach((mesh) => {
      shadowGenerator.addShadowCaster(mesh);
    });
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurScale = 10;
    shadowGenerator.darkness = 0.6;
  }
}
