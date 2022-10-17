import AbstractSceneDefinition from "./AbstractSceneDefinition";
import {
  Vector3,
  HemisphericLight,
  Color4,
  HighlightLayer,
} from "@babylonjs/core";
import "@babylonjs/inspector";
import { inject, injectable } from "inversify";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import ISpaceAdapter from "src/Components/Core/Ports/SpacePort/ISpaceAdapter";
import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import AbstractPort from "src/Components/Core/Ports/AbstractPort/AbstractPort";
import bind from "bind-decorator";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type ILoadSpaceUseCase from "src/Components/Core/Application/UseCases/LoadSpace/ILoadSpaceUseCase";
import type ILoadAvatarUseCase from "src/Components/Core/Application/UseCases/LoadAvatar/ILoadAvatarUseCase";
import type IPresentationDirector from "../../../PresentationBuilder/IPresentationDirector";
import type IPresentationBuilder from "../../../PresentationBuilder/IPresentationBuilder";
import type INavigation from "../../Navigation/INavigation";
import ISpacePresenter from "../../Spaces/ISpacePresenter";
import history from "history/browser";

@injectable()
export default class SpaceSceneDefinition extends AbstractSceneDefinition {
  private spaceTO: SpaceTO;

  constructor(
    @inject(BUILDER_TYPES.IPresentationDirector)
    private director: IPresentationDirector,
    @inject(BUILDER_TYPES.ISpaceBuilder)
    private spaceBuilder: IPresentationBuilder,
    @inject(BUILDER_TYPES.IAvatarBuilder)
    private avatarBuilder: IPresentationBuilder,
    @inject(CORE_TYPES.INavigation)
    private navigation: INavigation,
    @inject(PORT_TYPES.ISpacePort)
    private spacePort: AbstractPort<ISpaceAdapter>,
    @inject(USECASE_TYPES.ILoadSpaceUseCase)
    private loadSpaceUseCase: ILoadSpaceUseCase,
    @inject(USECASE_TYPES.ILoadAvatarUseCase)
    private loadAvatarUseCase: ILoadAvatarUseCase
  ) {
    super();
  }

  protected override preTasks = [this.loadSpacePreTask, this.loadAvatarPreTask];

  protected override async initializeScene(): Promise<void> {
    this.scene.clearColor = new Color4(0.66, 0.83, 0.98, 1);
    new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);

    this.highlighLayer = new HighlightLayer("highlightLayer", this.scene);
    this.highlighLayer.innerGlow = false;
    this.highlighLayer.blurHorizontalSize = 1;
    this.highlighLayer.blurVerticalSize = 1;

    // create space
    this.director.build(this.spaceBuilder);
    const spacePresenter = this.spaceBuilder.getPresenter() as ISpacePresenter;
    spacePresenter.onSpaceDataLoaded(this.spaceTO);

    // create avatar
    this.director.build(this.avatarBuilder);

    // initialize navigation for the room
    this.navigation.setupNavigation();
  }

  @bind
  private async loadSpacePreTask(): Promise<void> {
    this.spaceTO = await this.loadSpaceUseCase.executeAsync(
      this.parseSpaceIdFromLocation()
    );
  }

  @bind
  private async loadAvatarPreTask(): Promise<void> {
    await this.loadAvatarUseCase.executeAsync();
  }

  private parseSpaceIdFromLocation(): number {
    // TODO: make extraction of the space ID more reliable
    return Number.parseInt(history.location.pathname.split("/")[2]);
  }
}
