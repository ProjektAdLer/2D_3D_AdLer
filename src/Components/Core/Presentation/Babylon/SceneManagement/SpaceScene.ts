import ICreateSceneClass from "./ICreateSceneClass";
import {
  Engine,
  Scene,
  Vector3,
  HemisphericLight,
  Color4,
  SceneOptions,
} from "@babylonjs/core";
import "@babylonjs/inspector";
import { inject, injectable } from "inversify";
import { config } from "../../../../../config";
import type IPresentationBuilder from "../../PresentationBuilder/IPresentationBuilder";
import type IPresentationDirector from "../../PresentationBuilder/IPresentationDirector";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import type INavigation from "../Navigation/INavigation";
import ISpaceAdapter from "src/Components/Core/Ports/SpacePort/ISpaceAdapter";
import SpaceTO from "src/Components/Core/Application/DataTransferObjects/SpaceTO";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import AbstractPort from "src/Components/Core/Ports/AbstractPort/AbstractPort";
import bind from "bind-decorator";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import type ILoadSpaceUseCase from "src/Components/Core/Application/UseCases/LoadSpace/ILoadSpaceUseCase";
import ISpacePresenter from "../Spaces/ISpacePresenter";
import type ILoadAvatarUseCase from "src/Components/Core/Application/UseCases/LoadAvatar/ILoadAvatarUseCase";
import { ElementID } from "src/Components/Core/Domain/Types/EntityTypes";

@injectable()
export default class SpaceScene implements ICreateSceneClass, ISpaceAdapter {
  spaceID: ElementID;
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
  ) {}

  preTasks = [this.loadSpace, this.loadAvatar];

  async createScene(
    engine: Engine,
    sceneOptions?: SceneOptions
  ): Promise<Scene> {
    const scene = new Scene(engine, sceneOptions);

    scene.clearColor = new Color4(0.66, 0.83, 0.98, 1);
    new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    // create space
    this.director.build(this.spaceBuilder);
    const spacePresenter = this.spaceBuilder.getPresenter() as ISpacePresenter;
    spacePresenter.presentSpace(this.spaceTO);

    // create avatar
    this.director.build(this.avatarBuilder);

    // initialize navigation for the room
    this.navigation.setupNavigation();

    if (config.isDebug) scene.debugLayer.show();

    return scene;
  }

  onSpaceDataLoaded(spaceTO: SpaceTO): void {
    this.spaceTO = spaceTO;
  }

  @bind
  private async loadSpace(): Promise<void> {
    this.spacePort.registerAdapter(this);
    await this.loadSpaceUseCase.executeAsync(this.spaceID);
    this.spacePort.unregisterAdapter(this);
  }

  @bind
  private async loadAvatar(): Promise<void> {
    await this.loadAvatarUseCase.executeAsync();
  }
}
