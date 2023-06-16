import AbstractSceneDefinition from "./AbstractSceneDefinition";
import {
  Vector3,
  HemisphericLight,
  Color4,
  HighlightLayer,
  TransformNode,
} from "@babylonjs/core";
import "@babylonjs/inspector";
import { inject, injectable } from "inversify";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import bind from "bind-decorator";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type ILoadLearningSpaceUseCase from "src/Components/Core/Application/UseCases/LoadLearningSpace/ILoadLearningSpaceUseCase";
import type ILoadAvatarUseCase from "src/Components/Core/Application/UseCases/LoadAvatar/ILoadAvatarUseCase";
import type IPresentationDirector from "../../../PresentationBuilder/IPresentationDirector";
import type IPresentationBuilder from "../../../PresentationBuilder/IPresentationBuilder";
import type INavigation from "../../Navigation/INavigation";
import ILearningSpacePresenter from "../../LearningSpaces/ILearningSpacePresenter";
import AvatarCameraViewModel from "../../AvatarCamera/AvatarCameraViewModel";
import type IGetUserLocationUseCase from "src/Components/Core/Application/UseCases/GetUserLocation/IGetUserLocationUseCase";
import type IAsyncPresentationBuilder from "../../../PresentationBuilder/IAsyncPresentationBuilder";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import type ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import type ILearningSpaceBuilder from "../../LearningSpaces/ILearningSpaceBuilder";

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
    private avatarBuilder: IPresentationBuilder,
    @inject(CORE_TYPES.INavigation)
    private navigation: INavigation,
    @inject(USECASE_TYPES.ILoadLearningSpaceUseCase)
    private loadSpaceUseCase: ILoadLearningSpaceUseCase,
    @inject(USECASE_TYPES.ILoadAvatarUseCase)
    private loadAvatarUseCase: ILoadAvatarUseCase,
    @inject(BUILDER_TYPES.IAvatarCameraBuilder)
    private avatarCameraBuilder: IPresentationBuilder,
    @inject(USECASE_TYPES.IGetUserLocationUseCase)
    private getUserLocationUseCase: IGetUserLocationUseCase,
    @inject(BUILDER_TYPES.IAmbienceBuilder)
    private ambienceBuilder: IAsyncPresentationBuilder,
    @inject(PORT_TYPES.ILearningWorldPort)
    private learningWorldPort: ILearningWorldPort
  ) {
    super();
    this.learningWorldPort.registerAdapter(this);
  }

  protected override preTasks = [this.loadAvatarPreTask, this.loadSpacePreTask];

  protected override async initializeScene(): Promise<void> {
    this.scene.clearColor = new Color4(0.66, 0.83, 0.98, 1);
    new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);

    // setup highlight layer
    this.highlightLayer = new HighlightLayer("highlightLayer", this.scene);
    this.highlightLayer.innerGlow = false;
    this.highlightLayer.blurHorizontalSize = 1;
    this.highlightLayer.blurVerticalSize = 1;

    // create space ambience
    const ambienceCompleted = this.ambienceBuilder.isCompleted;
    this.director.build(this.ambienceBuilder);

    // create space
    const spaceCompleted = this.spaceBuilder.isCompleted;
    this.spaceBuilder.spaceData = this.spaceData;
    this.director.build(this.spaceBuilder);

    // create avatar
    this.avatarParentNode = new TransformNode("AvatarParentNode", this.scene);
    this.director.build(this.avatarBuilder);
    this.director.build(this.avatarCameraBuilder);
    (
      this.avatarCameraBuilder.getViewModel() as AvatarCameraViewModel
    ).parentNode.Value = this.avatarParentNode;

    await Promise.all([ambienceCompleted, spaceCompleted]);

    // initialize navigation for the room
    this.navigation.setupNavigation();
  }

  // override disposeScene(): void {
  //   super.disposeScene();
  // }

  @bind
  private async loadAvatarPreTask(): Promise<void> {
    await this.loadAvatarUseCase.executeAsync();
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

  onLearningSpaceLoaded(learningSpaceTO: LearningSpaceTO): void {
    this.spaceData = learningSpaceTO;
  }
}
