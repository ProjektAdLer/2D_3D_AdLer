import {
  ActionManager,
  AnimationGroup,
  Color3,
  ExecuteCodeAction,
  Mesh,
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
import HighlightColors from "../HighlightColors";
import ElevatorLogic from "./DoorLogic/ElevatorLogic";
import DoorLogic from "./DoorLogic/DoorLogic";

const iconLinkEntryDoor = require("../../../../../Assets/3dModels/sharedModels/3dIcons/d-3dicons-door-in.glb");
const iconLinkExitDoor = require("../../../../../Assets/3dModels/sharedModels/3dIcons/d-3dicons-door-out.glb");

export default class DoorView extends Readyable {
  private scenePresenter: IScenePresenter;
  private logger: ILoggerPort;

  constructor(
    private viewModel: DoorViewModel,
    private controller: IDoorController,
  ) {
    super();

    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory,
    );
    this.scenePresenter = scenePresenterFactory(LearningSpaceSceneDefinition);
    this.logger = CoreDIContainer.get<ILoggerPort>(CORE_TYPES.ILogger);

    if (!this.viewModel.isOpen.Value) {
      viewModel.isOpen.subscribe(this.onIsOpenChanged);
    }

    viewModel.isInteractable.subscribe((newValue) => {
      this.updateHighlight();
      this.toggleIconFloatAnimation(newValue);
      this.isInteractableAnimation(newValue);
    });
  }

  public async asyncSetup(): Promise<void> {
    await this.loadMeshAsync();
    this.positionMesh();
    await this.loadIconModel();
    this.registerActions();
    this.updateHighlight();
    this.resolveIsReady();
  }

  private async loadMeshAsync(): Promise<void> {
    const modelLink = this.getModelLinkByThemeAndType();
    const loadingResults = await this.scenePresenter.loadGLTFModel(modelLink);

    // dispose old icon meshes on score change
    if (this.viewModel.iconMeshes && this.viewModel.iconMeshes.length > 0) {
      this.viewModel.iconMeshes.forEach((mesh) => mesh.dispose());
      this.viewModel.iconFloatingAnimation?.dispose();
    }

    // reset quaternion rotation because it can prevent mesh.rotate to have any effect
    const loadedMeshes = loadingResults.meshes as Mesh[];
    loadedMeshes.forEach((mesh) => (mesh.rotationQuaternion = null));

    // Store meshes and animations in viewModel
    this.viewModel.meshes = loadedMeshes as Mesh[];
    this.viewModel.doorAnimations =
      loadingResults.animationGroups as AnimationGroup[];

    // Check if this is an elevator or door
    const elevatorMesh = this.viewModel.meshes.find((mesh) =>
      mesh.id.toLowerCase().includes("elevator"),
    );
    const doorMesh = this.viewModel.meshes.find((mesh) =>
      mesh.id.toLowerCase().includes("door"),
    );
    if (elevatorMesh) {
      this.viewModel.doorLogic = new ElevatorLogic(this.viewModel);
    } else if (doorMesh) {
      this.viewModel.doorLogic = new DoorLogic(
        this.viewModel,
        this.scenePresenter,
      );
    } else {
      this.logger.log(
        LogLevelTypes.WARN,
        "No valid DoorMesh found in DoorView. DoorLogic will not work.",
      );
    }

    if (!this.viewModel.isExit) {
      this.viewModel.isOpen.Value = true;
    }
    console.log(
      "Ist Ausgang? " +
        this.viewModel.isExit +
        " ist offen? " +
        this.viewModel.isOpen.Value,
    );

    // Setup for screen reader and integration tests
    this.accesibilitySetup();
  }

  private getModelLinkByThemeAndType(): string {
    const themeConfig = LearningSpaceThemeLookup.getLearningSpaceTheme(
      this.viewModel.theme,
    );

    return this.viewModel.isExit
      ? themeConfig.exitDoorModel
      : themeConfig.entryDoorModel;
  }

  private accesibilitySetup(): void {
    this.viewModel.meshes[0].accessibilityTag = {
      description:
        "door of space id: " +
        this.viewModel.spaceID +
        " of type: " +
        (this.viewModel.isExit ? "exit" : "entrance"),
      //@ts-ignore
      eventHandler: {
        click: () => {
          this.controller.accessibilityPicked();

          // get position on screen
          const canvas =
            this.scenePresenter.Scene.getEngine().getRenderingCanvas();
          const position = this.viewModel.meshes[0].getPositionInCameraSpace(
            this.scenePresenter.Scene.activeCamera!,
          );

          // simulate click on that position
          const event = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: position.x,
            clientY: position.y,
          });
          canvas!.dispatchEvent(event);
        },
      },
    };
  }

  @bind
  private positionMesh(): void {
    if (this.viewModel.meshes && this.viewModel.meshes.length > 0) {
      this.viewModel.meshes[0].position = this.viewModel.position;
      this.viewModel.meshes[0].rotation = new Vector3(
        0.0,
        Tools.ToRadians(this.viewModel.rotation),
        0.0,
      );
    }
  }

  @bind
  private onIsOpenChanged(newIsOpen: boolean): void {
    if (newIsOpen && this.viewModel.isExit) {
      this.IsReady.then(() => {
        this.viewModel.doorLogic.open();
      });
    }
  }

  private async isInteractableAnimation(avatarIsClose: boolean): Promise<void> {
    if (this.viewModel.doorLogic instanceof ElevatorLogic)
      if (avatarIsClose) {
        this.viewModel.doorLogic.avatarClose();
      } else {
        this.viewModel.doorLogic.avatarFar();
      }
  }

  private registerActions(): void {
    // create one action manager for all meshes
    const actionManager = new ActionManager(this.scenePresenter.Scene);
    this.viewModel.meshes.forEach((mesh) => {
      mesh.actionManager = actionManager;
    });
    this.viewModel.iconMeshes.forEach((mesh) => {
      mesh.actionManager = actionManager;
    });

    // register interaction callbacks
    actionManager.registerAction(
      new ExecuteCodeAction(
        ActionManager.OnPickTrigger,
        this.controller.picked,
      ),
    );
    actionManager.registerAction(
      new ExecuteCodeAction(
        ActionManager.OnPointerOverTrigger,
        this.controller.pointerOver,
      ),
    );
    actionManager.registerAction(
      new ExecuteCodeAction(
        ActionManager.OnPointerOutTrigger,
        this.controller.pointerOut,
      ),
    );
  }

  private changeHighlightColor(color: Color3): void {
    this.viewModel.meshes?.forEach((mesh) => {
      this.scenePresenter.HighlightLayer.removeMesh(mesh);
      this.scenePresenter.HighlightLayer.addMesh(mesh, color);
    });
    this.viewModel.iconMeshes?.forEach((mesh) => {
      this.scenePresenter.HighlightLayer.removeMesh(mesh);
      this.scenePresenter.HighlightLayer.addMesh(mesh, color);
    });
  }

  @bind
  private updateHighlight(): void {
    if (this.viewModel.isInteractable.Value)
      this.changeHighlightColor(HighlightColors.NonLearningElementBase);
    else
      this.changeHighlightColor(
        HighlightColors.getNonInteractableColor(
          HighlightColors.NonLearningElementBase,
        ),
      );
  }

  @bind private async loadIconModel(): Promise<void> {
    const doorRotationInRadians = (this.viewModel.rotation * Math.PI) / 180;

    const loadingResults = await this.scenePresenter.loadGLTFModel(
      this.viewModel.isExit ? iconLinkExitDoor : iconLinkEntryDoor,
    );

    // get meshes
    this.viewModel.iconMeshes = loadingResults.meshes as Mesh[];
    // position and rotate icon
    // Door is off centered, so we need to adjust the icon position based on rotation
    let doorPosition = { ...this.viewModel.position };
    this.viewModel.iconMeshes[0].position = new Vector3(
      doorPosition._x +
        Math.sin(doorRotationInRadians) * 0.4 +
        Math.cos(doorRotationInRadians) * 0.1,
      doorPosition._y + this.viewModel.iconYOffset,
      doorPosition._z +
        Math.sin(doorRotationInRadians) * 0.1 +
        Math.cos(doorRotationInRadians) * 0.4,
    );
    this.viewModel.iconMeshes[0].rotation = new Vector3(
      0,
      (7 * Math.PI) / 4,
      0,
    );

    // get floating animation, pause if not interactable from the start
    if (
      loadingResults.animationGroups.length > 1 ||
      loadingResults.animationGroups.length === 0
    ) {
      this.logger.log(
        LogLevelTypes.WARN,
        "Expected exactly one animation group for icon model, but got " +
          loadingResults.animationGroups.length +
          " instead. Using first animation group.",
      );
    }
    this.viewModel.iconFloatingAnimation = loadingResults.animationGroups[0];
    if (!this.viewModel.isInteractable.Value)
      this.viewModel.iconFloatingAnimation.pause();
  }

  @bind private toggleIconFloatAnimation(isInteractable: boolean): void {
    if (!this.viewModel.iconFloatingAnimation) return;
    if (isInteractable) this.viewModel.iconFloatingAnimation.restart();
    else this.viewModel.iconFloatingAnimation.pause();
  }
}
