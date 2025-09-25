import { inject, injectable } from "inversify";
import AbstractSceneDefinition from "../../Babylon/SceneManagement/Scenes/AbstractSceneDefinition";
import type IPresentationDirector from "../../PresentationBuilder/IPresentationDirector";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import {
  BackgroundMaterial,
  Color3,
  Color4,
  DirectionalLight,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  ShadowGenerator,
  StandardMaterial,
  Texture,
  Vector3,
} from "@babylonjs/core";
import AvatarEditorPreviewCameraBuilder from "./AvatarEditorPreviewCamera/AvatarEditorPreviewCameraBuilder";
import AvatarEditorPreviewModelBuilder from "./AvatarEditorPreviewModel/AvatarEditorPreviewModelBuilder";

import backGroundMatTexture from "../../../../../Assets/textures/avatarEditor/AvatarEditorBackground.png";

@injectable()
export default class AvatarEditorPreviewSceneDefinition extends AbstractSceneDefinition {
  constructor(
    @inject(BUILDER_TYPES.IPresentationDirector)
    private director: IPresentationDirector,
    @inject(BUILDER_TYPES.IAvatarEditorPreviewCameraBuilder)
    private cameraBuilder: AvatarEditorPreviewCameraBuilder,
    @inject(BUILDER_TYPES.IAvatarEditorPreviewModelBuilder)
    private previewModelBuilder: AvatarEditorPreviewModelBuilder,
  ) {
    super();
  }

  protected async initializeScene(): Promise<void> {
    this.scene.clearColor = new Color4(
      0.9137254901960784,
      0.8392156862745098,
      0.7019607843137254,
    );

    // Preview Camera
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
    keyLight.intensity = 2.5;

    const fillLight = new DirectionalLight(
      "fillLight",
      new Vector3(-1, 0, -1),
      this.scene,
    );
    fillLight.intensity = 0.7;

    keyLight.parent = this.scene.activeCamera;
    fillLight.parent = this.scene.activeCamera;

    // Shadow Generator needs to be defined before it is used in previewmodelBuilder
    this.shadowGenerator = new ShadowGenerator(1024, keyLight);
    this.shadowGenerator.useBlurExponentialShadowMap = true;
    this.shadowGenerator.blurScale = 10;
    this.shadowGenerator.darkness = 0.6;

    // Avatar Placeholder
    let avatarMeshes: Mesh[];
    await this.director.buildAsync(this.previewModelBuilder);
    avatarMeshes = this.previewModelBuilder.getViewModel()!.baseModelMeshes;

    avatarMeshes!.forEach((mesh) => {
      this.shadowGenerator.addShadowCaster(mesh);
    });

    // Ground Plane
    const groundPlane = MeshBuilder.CreatePlane(
      "plane",
      { size: 20 },
      this.scene,
    );
    groundPlane.position.y = -1;
    groundPlane.rotation.x = Math.PI / 2;
    const groundMat = new BackgroundMaterial("groundMat", this.scene);
    groundMat.shadowOnly = true;
    groundMat.primaryColor = new Color3(0, 0, 0);
    groundPlane.material = groundMat;
    groundPlane.receiveShadows = true;

    // Podium
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

    // Camera Background
    const background = MeshBuilder.CreatePlane(
      "background",
      { size: 20 },
      this.scene,
    );
    background.position = new Vector3(0, 0, 10);
    background.rotation = new Vector3(0, 0, 0);
    background.parent = this.scene.activeCamera;
    const backgroundMat = new BackgroundMaterial("backgroundMat", this.scene);
    backgroundMat.diffuseTexture = new Texture(
      backGroundMatTexture,
      this.scene,
    );
    background.material = backgroundMat;

    // this.scene.debugLayer.show();
  }
}
