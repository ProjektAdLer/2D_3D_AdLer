import {
  EventState,
  KeyboardEventTypes,
  KeyboardInfo,
  LinesMesh,
  MeshBuilder,
  PointerEventTypes,
  PointerInfo,
} from "@babylonjs/core";
import bind from "bind-decorator";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import { config } from "../../../../../config";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import INavigation from "../Navigation/INavigation";
import IScenePresenter from "../SceneManagement/IScenePresenter";
import SpaceSceneDefinition from "../SceneManagement/Scenes/SpaceSceneDefinition";
import AvatarViewModel from "./AvatarViewModel";
import IAvatarController from "./IAvatarController";

export default class AvatarController implements IAvatarController {
  private scenePresenter: IScenePresenter;
  private navigation: INavigation;
  private pathLine: LinesMesh;

  constructor(private viewModel: AvatarViewModel) {
    this.navigation = CoreDIContainer.get<INavigation>(CORE_TYPES.INavigation);
    let scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    this.scenePresenter = scenePresenterFactory(SpaceSceneDefinition);

    this.scenePresenter.Scene.onPointerObservable.add(this.processPointerEvent);
    this.scenePresenter.Scene.onKeyboardObservable.add(
      this.processKeyboardEvent
    );
  }

  @bind
  private processKeyboardEvent(
    eventData: KeyboardInfo,
    eventState: EventState
  ) {
    if (eventData.type === KeyboardEventTypes.KEYDOWN) {
      // let move = this.navigation.Plugin.getClosestPoint(
      //   this.viewModel.parentNode.Value.position.add(
      //     this.viewModel.parentNode.Value.forward
      //   )
      // );

      switch (eventData.event.key) {
        case "w":
          this.navigation.Crowd.agentGoto(
            this.viewModel.agentIndex,
            this.navigation.Plugin.getClosestPoint(
              this.viewModel.parentNode.Value.position.add(
                this.viewModel.parentNode.Value.forward
              )
            )
          );
          break;
      }

      // debug: draw path line
      if (config.isDebug === true) {
        let pathPoints = this.navigation.Plugin.computePath(
          this.navigation.Crowd.getAgentPosition(this.viewModel.agentIndex),
          this.navigation.Plugin.getClosestPoint(
            this.viewModel.parentNode.Value.position.add(
              this.viewModel.parentNode.Value.forward
            )
          )
        );
        this.pathLine = MeshBuilder.CreateDashedLines(
          "navigation path",
          { points: pathPoints, updatable: true, instance: this.pathLine },
          this.scenePresenter.Scene
        );
      }
    }
  }

  @bind
  private processPointerEvent(pointerInfo: PointerInfo) {
    // quit if not right mouse button down or if no mesh was hit
    if (
      pointerInfo.type !== PointerEventTypes.POINTERTAP ||
      pointerInfo.pickInfo === null ||
      pointerInfo.pickInfo.pickedPoint === null
    )
      return;

    // set target in navigation crowd
    this.navigation.Crowd.agentGoto(
      this.viewModel.agentIndex,
      this.navigation.Plugin.getClosestPoint(pointerInfo.pickInfo.pickedPoint)
    );

    // debug: draw path line
    if (config.isDebug === true) {
      let pathPoints = this.navigation.Plugin.computePath(
        this.navigation.Crowd.getAgentPosition(this.viewModel.agentIndex),
        this.navigation.Plugin.getClosestPoint(pointerInfo.pickInfo.pickedPoint)
      );
      this.pathLine = MeshBuilder.CreateDashedLines(
        "navigation path",
        { points: pathPoints, updatable: true, instance: this.pathLine },
        this.scenePresenter.Scene
      );
    }
  }
}
