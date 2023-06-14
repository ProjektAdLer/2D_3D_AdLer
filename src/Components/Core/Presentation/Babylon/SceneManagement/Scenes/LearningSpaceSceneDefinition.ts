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
import type { IAmbienceBuilder } from "../../Ambience/AmbienceBuilder";

@injectable()
export default class LearningSpaceSceneDefinition extends AbstractSceneDefinition {
  private avatarParentNode: TransformNode;
  private spacePresenter: ILearningSpacePresenter;

  constructor(
    @inject(BUILDER_TYPES.IPresentationDirector)
    private director: IPresentationDirector,
    @inject(BUILDER_TYPES.ILearningSpaceBuilder)
    private spaceBuilder: IPresentationBuilder,
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
    private ambienceBuilder: IAmbienceBuilder
  ) {
    super();
  }

  protected override preTasks = [this.loadAvatarPreTask];

  protected override async initializeScene(): Promise<void> {
    this.scene.clearColor = new Color4(0.66, 0.83, 0.98, 1);
    new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);

    this.highlightLayer = new HighlightLayer("highlightLayer", this.scene);
    this.highlightLayer.innerGlow = false;
    this.highlightLayer.blurHorizontalSize = 1;
    this.highlightLayer.blurVerticalSize = 1;

    // create space ambience
    this.director.build(this.ambienceBuilder);
    const ambienceCompleted = this.ambienceBuilder.isCompleted;

    // create space
    this.director.build(this.spaceBuilder);
    this.spacePresenter =
      this.spaceBuilder.getPresenter() as ILearningSpacePresenter;

    // execute loadSpace use case to fill space with data
    const userLocation = this.getUserLocationUseCase.execute();
    if (userLocation.spaceID && userLocation.worldID)
      await this.loadSpaceUseCase.executeAsync({
        worldID: userLocation.worldID,
        spaceID: userLocation.spaceID,
      });

    // create avatar
    this.avatarParentNode = new TransformNode("AvatarParentNode", this.scene);
    this.director.build(this.avatarBuilder);
    this.director.build(this.avatarCameraBuilder);
    (
      this.avatarCameraBuilder.getViewModel() as AvatarCameraViewModel
    ).parentNode.Value = this.avatarParentNode;

    await Promise.all([ambienceCompleted]);

    // initialize navigation for the room
    this.navigation.setupNavigation();
  }

  override disposeScene(): void {
    this.spacePresenter.dispose();
    super.disposeScene();
  }

  @bind
  private async loadAvatarPreTask(): Promise<void> {
    await this.loadAvatarUseCase.executeAsync();
  }
}
