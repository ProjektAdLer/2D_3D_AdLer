import { inject, injectable } from "inversify";
import AbstractSceneDefinition from "../../../Babylon/SceneManagement/Scenes/AbstractSceneDefinition";
import type IPresentationDirector from "../../../PresentationBuilder/IPresentationDirector";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import type IAvatarBuilder from "../../../Babylon/Avatar/IAvatarBuilder";
import {
  ArcRotateCamera,
  ArcRotateCameraPointersInput,
  Color3,
  Color4,
  DirectionalLight,
  FreeCamera,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  SceneLoader,
  ShadowGenerator,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";
import { ShadowOnlyMaterial } from "@babylonjs/materials/shadowOnly/shadowOnlyMaterial";

const modelLink = require("../../../../../../Assets/3dModels/sharedModels/3DModel_Avatar_male.glb");

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
    // this.scene.clearColor = new Color4(1, 0, 1, 1); // pink for debugging
    this.scene.clearColor = new Color4(0.66, 0.83, 0.98, 1);

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

    // Camera
    const defaultBetaRotation = Math.PI / 2;
    const zoomedOutTarget = new Vector3(0, -0.2, 0);
    const zoomedInTarget = new Vector3(0, 0.5, 0);
    const camera = new ArcRotateCamera(
      "camera",
      Math.PI / 2,
      defaultBetaRotation,
      3,
      zoomedOutTarget,
      this.scene,
    );
    camera.upperBetaLimit = defaultBetaRotation;
    camera.lowerBetaLimit = defaultBetaRotation;
    camera.lowerRadiusLimit = 1;
    camera.upperRadiusLimit = 3;
    camera.minZ = 0; // basically remove near clipping plane

    // Camera Inputs
    camera.inputs.attached.mousewheel.attachControl();
    camera.inputs.attached.pointers.attachControl();
    const pointersInput = camera.inputs.attached
      .pointers as ArcRotateCameraPointersInput;
    pointersInput.multiTouchPanAndZoom = true;
    pointersInput.pinchZoom = true;
    camera.wheelDeltaPercentage = 0.01;

    // Camera Zoom Target Shift
    this.scene.onBeforeRenderObservable.add(() => {
      const amount =
        (camera.radius - camera.lowerRadiusLimit!) /
        (camera.upperRadiusLimit! - camera.lowerRadiusLimit!);
      camera.target = Vector3.Lerp(zoomedInTarget, zoomedOutTarget, amount);
    });

    keyLight.parent = camera;
    fillLight.parent = camera;

    new FreeCamera("debugCamera", new Vector3(0, 1, -5), this.scene); // TODO: remove debug camera
  }
}
