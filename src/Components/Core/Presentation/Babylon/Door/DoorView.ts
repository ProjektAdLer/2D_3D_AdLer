import {
  ActionManager,
  Animation,
  Color3,
  ExecuteCodeAction,
  Mesh,
  Sound,
  Tools,
  Vector3,
} from "@babylonjs/core";
import bind from "bind-decorator";
import Readyable from "../../../../../Lib/Readyable";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import LearningSpaceSceneDefinition from "../SceneManagement/Scenes/LearningSpaceSceneDefinition";
import DoorViewModel from "./DoorViewModel";
import IDoorController from "./IDoorController";
import LearningSpaceThemeLookup from "src/Components/Core/Domain/LearningSpaceThemes/LearningSpaceThemeLookup";
import ILoggerPort from "src/Components/Core/Application/Ports/Interfaces/ILoggerPort";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";

const soundLink = require("../../../../../Assets/Sounds/door_opening.mp3");

export default class DoorView extends Readyable {
  private scenePresenter: IScenePresenter;

  private openTheDoorSound: Sound;
  private doorAnimation: Animation;
  private logger: ILoggerPort;

  constructor(
    private viewModel: DoorViewModel,
    private controller: IDoorController
  ) {
    super();

    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);
    this.logger = CoreDIContainer.get<ILoggerPort>(CORE_TYPES.ILogger);

    this.openTheDoorSound = new Sound(
      "openTheDoor",
      soundLink,
      this.scenePresenter.Scene
    );
    if (this.viewModel.isOpen.Value) {
      this.IsReady.then(() => {
        this.scenePresenter.Scene.beginAnimation(
          this.viewModel.meshes[0],
          0,
          45
        );
      });
    } else viewModel.isOpen.subscribe(this.onIsOpenChanged);

    viewModel.isInteractable.subscribe(this.updateHighlight);
  }

  public async asyncSetup(): Promise<void> {
    await this.loadMeshAsync();
    this.positionMesh();
    if (this.viewModel.isExit) this.setupAnimation();
    this.registerActions();
    this.addToHighlightLayer();

    this.resolveIsReady();
  }

  private async loadMeshAsync(): Promise<void> {
    const modelLink = this.getModelLinkByThemeAndType();
    const loadedMeshes = await this.scenePresenter.loadModel(modelLink);

    // reset quaternion rotation because it can prevent mesh.rotate to have any effect
    loadedMeshes.forEach((mesh) => (mesh.rotationQuaternion = null));

    this.viewModel.meshes = loadedMeshes as Mesh[];
  }

  private getModelLinkByThemeAndType(): string {
    const themeConfig = LearningSpaceThemeLookup.getLearningSpaceTheme(
      this.viewModel.theme
    );

    return this.viewModel.isExit
      ? themeConfig.exitDoorModel
      : themeConfig.entryDoorModel;
  }

  private setupAnimation(): void {
    const meshToRotate = this.viewModel.meshes.find(
      (mesh) => mesh.id === "Door"
    );

    if (meshToRotate === undefined) {
      this.logger.log(
        LogLevelTypes.WARN,
        "DoorView: No submesh with name Door found. Door animation will not work."
      );
      return;
    }

    this.doorAnimation = new Animation(
      "doorAnimation",
      "rotation.y",
      30,
      Animation.ANIMATIONTYPE_FLOAT
    );

    const initialRotation = Tools.ToRadians(meshToRotate.rotation.y);
    this.doorAnimation.setKeys([
      { frame: 0, value: initialRotation },
      {
        frame: 45,
        value: initialRotation + Tools.ToRadians(80),
      },
    ]);

    meshToRotate.animations.push(this.doorAnimation);
  }

  @bind
  private positionMesh(): void {
    if (this.viewModel.meshes && this.viewModel.meshes.length > 0) {
      this.viewModel.meshes[0].position = this.viewModel.position;
      this.viewModel.meshes[0].rotation = new Vector3(
        0.0,
        Tools.ToRadians(this.viewModel.rotation),
        0.0
      );
    }
  }

  @bind
  private onIsOpenChanged(newIsOpen: boolean): void {
    if (newIsOpen) {
      this.IsReady.then(() => {
        this.scenePresenter.Scene.beginAnimation(
          this.viewModel.meshes.find((mesh) => mesh.id === "Door"),
          0,
          45
        );
        this.openTheDoorSound.play();
      });
    }
  }

  private addToHighlightLayer(): void {
    this.viewModel.meshes.forEach((mesh) => {
      this.scenePresenter.HighlightLayer.addMesh(mesh, Color3.Blue());
    });
  }

  private registerActions(): void {
    this.viewModel.meshes.forEach((mesh) => {
      mesh.actionManager = new ActionManager(this.scenePresenter.Scene);
      mesh.actionManager.registerAction(
        new ExecuteCodeAction(
          ActionManager.OnPickTrigger,
          this.controller.picked
        )
      );
      mesh.actionManager.registerAction(
        new ExecuteCodeAction(
          ActionManager.OnPointerOverTrigger,
          this.controller.pointerOver
        )
      );
      mesh.actionManager.registerAction(
        new ExecuteCodeAction(
          ActionManager.OnPointerOutTrigger,
          this.controller.pointerOut
        )
      );
    });
  }

  @bind
  private updateHighlight(): void {
    if (this.viewModel.isInteractable.Value) {
      this.viewModel.meshes.forEach((mesh) => {
        this.scenePresenter.HighlightLayer.removeMesh(mesh);
      });
      this.viewModel.meshes.forEach((mesh) => {
        this.scenePresenter.HighlightLayer.addMesh(mesh, Color3.Yellow());
      });
    } else {
      this.viewModel.meshes.forEach((mesh) => {
        this.scenePresenter.HighlightLayer.removeMesh(mesh);
      });
      this.viewModel.meshes.forEach((mesh) => {
        this.scenePresenter.HighlightLayer.addMesh(mesh, Color3.Blue());
      });
    }
  }
}
