import AbstractSceneDefinition from "./AbstractSceneDefinition";
import {
  Vector3,
  HemisphericLight,
  Color4,
  HighlightLayer,
  TransformNode,
  Color3,
  DirectionalLight,
  ShadowGenerator,
} from "@babylonjs/core";
import "@babylonjs/inspector";
import { inject, injectable } from "inversify";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import bind from "bind-decorator";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type ILoadLearningSpaceUseCase from "src/Components/Core/Application/UseCases/LoadLearningSpace/ILoadLearningSpaceUseCase";
import type IPresentationDirector from "../../../PresentationBuilder/IPresentationDirector";
import type IPresentationBuilder from "../../../PresentationBuilder/IPresentationBuilder";
import type INavigation from "../../Navigation/INavigation";
import AvatarCameraViewModel from "../../AvatarCamera/AvatarCameraViewModel";
import type IGetUserLocationUseCase from "src/Components/Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import type ILearningSpaceBuilder from "../../LearningSpaces/ILearningSpaceBuilder";
import type IAvatarBuilder from "../../Avatar/IAvatarBuilder";
import type { IAmbienceBuilder } from "../../Ambience/IAmbienceBuilder";
import { LocationScope } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";
import type IGetSettingsConfigUseCase from "src/Components/Core/Application/UseCases/GetSettingsConfig/IGetSettingsConfigUseCase";

@injectable()
export default class LearningSpaceSceneDefinition
  extends AbstractSceneDefinition
  implements ILearningWorldAdapter
{
  private avatarParentNode: TransformNode;
  private spaceData: LearningSpaceTO;

  constructor(
    @inject(BUILDER_TYPES.IPresentationDirector)
    private director: IPresentationDirector,
    @inject(BUILDER_TYPES.ILearningSpaceBuilder)
    private spaceBuilder: ILearningSpaceBuilder,
    @inject(BUILDER_TYPES.IAvatarBuilder)
    private avatarBuilder: IAvatarBuilder,
    @inject(CORE_TYPES.INavigation)
    private navigation: INavigation,
    @inject(USECASE_TYPES.ILoadLearningSpaceUseCase)
    private loadSpaceUseCase: ILoadLearningSpaceUseCase,
    @inject(BUILDER_TYPES.IAvatarCameraBuilder)
    private avatarCameraBuilder: IPresentationBuilder,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase,
    @inject(BUILDER_TYPES.IAmbienceBuilder)
    private ambienceBuilder: IAmbienceBuilder,
    @inject(PORT_TYPES.ILearningWorldPort)
    private learningWorldPort: ILearningWorldPort,
    @inject(USECASE_TYPES.IGetSettingsConfigUseCase)
    private getSettingsUseCase: IGetSettingsConfigUseCase,
  ) {
    super();
    this.learningWorldPort.registerAdapter(this, LocationScope._global);
  }

  protected override preTasks = [this.loadSpacePreTask];

  protected override async initializeScene(): Promise<void> {
    this.scene.clearColor = new Color4(0.66, 0.83, 0.98, 1);

    // setup lights
    const light = new HemisphericLight(
      "light",
      new Vector3(0, 1, 0),
      this.scene,
    );
    light.intensity = 0.1;
    light.diffuse = new Color3(1, 1, 1);

    const fillLight = new DirectionalLight(
      "fillLight",
      new Vector3(1, -1, 1),
      this.scene,
    );
    fillLight.intensity = 3;
    fillLight.specular = new Color3(0.66, 0.83, 0.98);
    fillLight.diffuse = new Color3(0.66, 0.83, 0.98);

    const contraLight = new DirectionalLight(
      "contraLight",
      new Vector3(-1, -0.5, -1),
      this.scene,
    );
    contraLight.intensity = 0.5;
    contraLight.specular = new Color3(0.66, 0.83, 0.98);
    contraLight.diffuse = new Color3(0.66, 0.83, 0.98);

    // setup highlight layer
    this.highlightLayer = new HighlightLayer("highlightLayer", this.scene);
    this.highlightLayer.innerGlow = false;
    this.highlightLayer.blurHorizontalSize = 2.2;
    this.highlightLayer.blurVerticalSize = 2.2;

    // create space ambience
    this.ambienceBuilder.theme = this.spaceData?.theme;
    const ambienceCompleted = this.director.buildAsync(this.ambienceBuilder);

    // create space
    this.spaceBuilder.spaceData = this.spaceData;
    const spaceCompleted = this.director.buildAsync(this.spaceBuilder);

    // create avatar camera
    this.avatarParentNode = new TransformNode("AvatarParentNode", this.scene);
    this.director.build(this.avatarCameraBuilder);
    (
      this.avatarCameraBuilder.getViewModel() as AvatarCameraViewModel
    ).parentNode.Value = this.avatarParentNode;

    await Promise.all([ambienceCompleted, spaceCompleted]);

    // initialize navigation for the room
    this.navigation.setupNavigation();

    // set hardware scaling from user settings
    this.scene
      .getEngine()
      .setHardwareScalingLevel(
        this.getSettingsUseCase.execute().graphicsQuality!,
      );

    // create avatar
    this.avatarBuilder.learningSpaceTemplateType = this.spaceData?.template;
    this.avatarBuilder.learningSpacePresenter =
      this.spaceBuilder.getPresenter();
    await this.director.buildAsync(this.avatarBuilder);

    // create shadows

    // const shadow = new ShadowGenerator(8192, fillLight);
    // this.scene.meshes.forEach((mesh) => {
    //   mesh.receiveShadows = true;
    //   shadow.addShadowCaster(mesh);
    // });
    // shadow.usePoissonSampling = true;

    const shadow = new ShadowGenerator(8192, fillLight);
    fillLight.shadowMinZ = 0;
    fillLight.shadowMaxZ = 10;
    this.scene.meshes.forEach((mesh) => {
      shadow.getShadowMap()?.renderList?.push(mesh);
      shadow.useCloseExponentialShadowMap = true;
      mesh.receiveShadows = true;
    });

    // this.scene.meshes.forEach((mesh) => {
    //   let shadow = new ShadowGenerator(8192, fillLight);
    //   mesh.receiveShadows = true;
    //   shadow.addShadowCaster(mesh);
    // });
  }

  override disposeScene(): void {
    super.disposeScene();
    this.navigation.reset();
  }

  @bind
  private async loadSpacePreTask(): Promise<void> {
    const userLocation = this.getUserLocationUseCase.execute();
    if (userLocation.spaceID && userLocation.worldID)
      await this.loadSpaceUseCase.executeAsync({
        worldID: userLocation.worldID,
        spaceID: userLocation.spaceID,
      });
  }

  @bind
  onLearningSpaceLoaded(learningSpaceTO: LearningSpaceTO): void {
    this.spaceData = learningSpaceTO;
  }
}
