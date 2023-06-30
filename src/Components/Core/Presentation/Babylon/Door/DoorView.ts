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

const modelLink = require("../../../../../Assets/3dModels/defaultTheme/3DModel_Door.glb");
const soundLink = require("../../../../../Assets/Sounds/fanfare_troll.mp3");

export default class DoorView extends Readyable {
  private scenePresenter: IScenePresenter;

  private openTheDoorSound: Sound;

  constructor(
    private viewModel: DoorViewModel,
    private controller: IDoorController
  ) {
    super();

    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);

    this.openTheDoorSound = new Sound(
      "openTheDoor",
      soundLink,
      this.scenePresenter.Scene
    );

    viewModel.isOpen.subscribe(this.onIsOpenChanged);
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
    const results = await this.scenePresenter.loadModel(modelLink);

    // reset quaternion rotation because it can prevent mesh.rotate to have any effect
    results.forEach((mesh) => (mesh.rotationQuaternion = null));

    this.viewModel.meshes = results as Mesh[];
  }

  private setupAnimation(): void {
    let animation = new Animation(
      "doorAnimation",
      "rotation.y",
      30,
      Animation.ANIMATIONTYPE_FLOAT
    );
    animation.setKeys([
      { frame: 0, value: Tools.ToRadians(this.viewModel.rotation) },
      {
        frame: 45,
        value: Tools.ToRadians(this.viewModel.rotation - 80),
      },
    ]);
    this.viewModel.meshes[0].animations.push(animation);
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
      this.isReady.then(() => {
        this.scenePresenter.Scene.beginAnimation(
          this.viewModel.meshes[0],
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
          this.controller.clicked
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
}
