import AbstractSceneDefinition from "./AbstractSceneDefinition";
import {
  Vector3,
  HemisphericLight,
  Color4,
  HighlightLayer,
  TransformNode,
  Color3,
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
  ) {
    super();
    this.learningWorldPort.registerAdapter(this, LocationScope._global);
  }

  protected override preTasks = [this.loadSpacePreTask];

  protected override async initializeScene(): Promise<void> {
    this.scene.clearColor = new Color4(0.66, 0.83, 0.98, 1);
    const light = new HemisphericLight(
      "light",
      new Vector3(0, 1, 0),
      this.scene,
    );
    light.intensity = 1;
    light.diffuse = new Color3(1, 1, 1);

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

    // create avatar
    this.avatarBuilder.learningSpaceTemplateType = this.spaceData?.template;
    this.avatarBuilder.learningSpacePresenter =
      this.spaceBuilder.getPresenter();
    await this.director.buildAsync(this.avatarBuilder);
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
