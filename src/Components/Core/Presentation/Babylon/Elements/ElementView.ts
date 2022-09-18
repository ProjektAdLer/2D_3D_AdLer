import {
  ActionEvent,
  ActionManager,
  ExecuteCodeAction,
  Mesh,
  Tools,
  Vector3,
} from "@babylonjs/core";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import type IScenePresenter from "../SceneManagement/IScenePresenter";
import IElementController from "./IElementController";
import IElementView from "./IElementView";
import ElementViewModel from "./ElementViewModel";
import { ElementTypes } from "./Types/ElementTypes";

const modelLinks: { [key in ElementTypes]?: any } = {
  [ElementTypes.h5p]: require("../../../../../Assets/3DModel_LElement_H5P.glb"),
  [ElementTypes.text]: require("../../../../../Assets/3DModel_LElement_Text.glb"),
  [ElementTypes.image]: require("../../../../../Assets/3DModel_LElement_Image.glb"),
  [ElementTypes.video]: require("../../../../../Assets/3DModel_LElement_Video.glb"),
};

export default class ElementView implements IElementView {
  private viewModel: ElementViewModel;
  private controller: IElementController;
  private scenePresenter: IScenePresenter;

  constructor(viewModel: ElementViewModel, controller: IElementController) {
    this.scenePresenter = CoreDIContainer.get<IScenePresenter>(
      CORE_TYPES.IScenePresenter
    );
    this.viewModel = viewModel;
    this.controller = controller;

    // setup callbacks for rerendering when the view model changes
    viewModel.elementData.subscribe(async () => {
      await this.loadMeshAsync();
      this.registerAction(ActionManager.OnPickTrigger, this.controller.clicked);
      this.registerAction(
        ActionManager.OnPointerOverTrigger,
        this.controller.pointerOver
      );
      this.registerAction(
        ActionManager.OnPointerOutTrigger,
        this.controller.pointerOut
      );
      this.positionMesh();
    });
    viewModel.position.subscribe(() => {
      this.positionMesh();
    });
    viewModel.rotation.subscribe(() => {
      this.positionMesh();
    });
  }

  private async loadMeshAsync(): Promise<void> {
    this.viewModel.meshes.Value = (await this.scenePresenter.loadModel(
      modelLinks[this.viewModel.elementData.Value.type as ElementTypes],
      true
    )) as Mesh[];

    this.viewModel.meshes.Value.forEach((mesh) => {
      mesh.actionManager = new ActionManager(this.scenePresenter.Scene);
    });
  }

  private positionMesh(): void {
    if (this.viewModel.meshes.Value) {
      this.viewModel.meshes.Value[0].position = this.viewModel.position.Value;
      this.viewModel.meshes.Value[0].rotate(
        Vector3.Up(),
        Tools.ToRadians(this.viewModel.rotation.Value)
      );
    }
  }

  private registerAction(
    triggerOptions: any,
    callback: (event?: ActionEvent) => void
  ): void {
    this.viewModel.meshes.Value.forEach((mesh) => {
      mesh.actionManager?.registerAction(
        new ExecuteCodeAction(triggerOptions, callback)
      );
    });
  }
}
