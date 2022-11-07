import {
  ActionEvent,
  ActionManager,
  Color3,
  ExecuteCodeAction,
  Mesh,
  Tools,
  Vector3,
} from "@babylonjs/core";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import type IScenePresenter from "../SceneManagement/IScenePresenter";
import IElementController from "./IElementController";
import ElementViewModel from "./ElementViewModel";
import { ElementTypes } from "../../../Domain/Types/ElementTypes";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import SpaceSceneDefinition from "../SceneManagement/Scenes/SpaceSceneDefinition";
import bind from "bind-decorator";

const modelLinks: { [key in ElementTypes]?: any } = {
  [ElementTypes.h5p]: require("../../../../../Assets/3DModel_LElement_H5P.glb"),
  [ElementTypes.text]: require("../../../../../Assets/3DModel_LElement_Text.glb"),
  [ElementTypes.image]: require("../../../../../Assets/3DModel_LElement_Image.glb"),
  [ElementTypes.video]: require("../../../../../Assets/3DModel_LElement_Video.glb"),
};

export default class ElementView {
  isReady: Promise<void>;

  private scenePresenter: IScenePresenter;

  constructor(
    private viewModel: ElementViewModel,
    private controller: IElementController
  ) {
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(SpaceSceneDefinition);

    // setup callbacks for rerendering when the view model changes
    viewModel.position.subscribe(this.positionModel);
    viewModel.rotation.subscribe(this.positionModel);
    viewModel.hasScored.subscribe(() => {
      this.changeHighlightColor(
        this.viewModel.hasScored.Value ? Color3.Green() : Color3.Red()
      );
    });

    this.isReady = this.asyncSetup();
  }

  private async asyncSetup(): Promise<void> {
    // load meshes
    this.viewModel.meshes.Value = (await this.scenePresenter.loadModel(
      modelLinks[this.viewModel.type.Value as ElementTypes],
      true
    )) as Mesh[];

    // create action manager for each mesh
    this.viewModel.meshes.Value.forEach((mesh) => {
      mesh.actionManager = new ActionManager(this.scenePresenter.Scene);
    });

    // register interaction callbacks
    this.registerActionWithAllMeshes(
      ActionManager.OnPickTrigger,
      this.controller.clicked
    );
    this.registerActionWithAllMeshes(
      ActionManager.OnPointerOverTrigger,
      this.controller.pointerOver
    );
    this.registerActionWithAllMeshes(
      ActionManager.OnPointerOutTrigger,
      this.controller.pointerOut
    );

    // add meshes to highlight layer
    this.viewModel.meshes.Value.forEach((mesh) => {
      this.scenePresenter.HighlightLayer.addMesh(
        mesh,
        this.viewModel.hasScored.Value ? Color3.Green() : Color3.Red()
      );
    });

    this.positionModel();
  }

  private registerActionWithAllMeshes(
    triggerOptions: any,
    callback: (event?: ActionEvent) => void
  ): void {
    this.viewModel.meshes.Value.forEach((mesh) => {
      mesh.actionManager?.registerAction(
        new ExecuteCodeAction(triggerOptions, callback)
      );
    });
  }

  @bind
  private positionModel(): void {
    if (this.viewModel.meshes.Value) {
      this.viewModel.meshes.Value[0].position = this.viewModel.position.Value;
      this.viewModel.meshes.Value[0].rotate(
        Vector3.Up(),
        Tools.ToRadians(this.viewModel.rotation.Value)
      );
    }
  }

  @bind
  private changeHighlightColor(color: Color3): void {
    this.viewModel.meshes.Value?.forEach((mesh) => {
      this.scenePresenter.HighlightLayer.removeMesh(mesh);
      this.scenePresenter.HighlightLayer.addMesh(mesh, color);
    });
  }
}
