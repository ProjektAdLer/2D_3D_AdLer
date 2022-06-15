import {
  RecastJSPlugin,
  ICrowd,
  Mesh,
  Quaternion,
  AbstractMesh,
  Scene,
  NullEngine,
  ISceneLoaderProgressEvent,
  Nullable,
  IAgentParameters,
  Vector3,
} from "@babylonjs/core";
import { injectable } from "inversify";
import SimpleEvent from "../../../../../Lib/SimpleEvent";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import AvatarController from "../../../../Core/Presentation/Babylon/Avatar/AvatarController";
import AvatarView from "../../../../Core/Presentation/Babylon/Avatar/AvatarView";
import AvatarViewModel from "../../../../Core/Presentation/Babylon/Avatar/AvatarViewModel";
import INavigation from "../../../../Core/Presentation/Babylon/Navigation/INavigation";
import ICreateSceneClass from "../../../../Core/Presentation/Babylon/SceneManagement/ICreateSceneClass";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";

jest.mock("../../../../Core/Presentation/Babylon/Avatar/AvatarController");

let scene = new Scene(new NullEngine());

@injectable()
//@ts-ignore
class NavigationMock implements INavigation {
  get Plugin(): RecastJSPlugin {
    throw new Error("Method not implemented.");
  }
  get Crowd(): ICrowd {
    return new CrowdMock();
  }
  onNavigationReadyObservable: SimpleEvent = new SimpleEvent();
  setupNavigation(): void {}
}

class CrowdMock implements ICrowd {
  getAgentPosition(index: number): Vector3 {
    throw new Error("Method not implemented.");
  }
  getAgentPositionToRef(index: number, result: Vector3): void {
    throw new Error("Method not implemented.");
  }
  getAgentVelocity(index: number): Vector3 {
    throw new Error("Method not implemented.");
  }
  getAgentVelocityToRef(index: number, result: Vector3): void {
    throw new Error("Method not implemented.");
  }
  getAgentNextTargetPath(index: number): Vector3 {
    throw new Error("Method not implemented.");
  }
  getAgentState(index: number): number {
    throw new Error("Method not implemented.");
  }
  overOffmeshConnection(index: number): boolean {
    throw new Error("Method not implemented.");
  }
  getAgentNextTargetPathToRef(index: number, result: Vector3): void {
    throw new Error("Method not implemented.");
  }
  removeAgent(index: number): void {
    throw new Error("Method not implemented.");
  }
  getAgents(): number[] {
    throw new Error("Method not implemented.");
  }
  update(deltaTime: number): void {
    throw new Error("Method not implemented.");
  }
  agentGoto(index: number, destination: Vector3): void {
    throw new Error("Method not implemented.");
  }
  agentTeleport(index: number, destination: Vector3): void {
    throw new Error("Method not implemented.");
  }
  updateAgentParameters(index: number, parameters: IAgentParameters): void {
    throw new Error("Method not implemented.");
  }
  setDefaultQueryExtent(extent: Vector3): void {
    throw new Error("Method not implemented.");
  }
  getDefaultQueryExtent(): Vector3 {
    throw new Error("Method not implemented.");
  }
  getDefaultQueryExtentToRef(result: Vector3): void {
    throw new Error("Method not implemented.");
  }
  dispose(): void {
    throw new Error("Method not implemented.");
  }
  addAgent = jest.fn().mockReturnValue(42);
}

@injectable()
//@ts-ignore
class ScenePresenterMock implements IScenePresenter {
  get NavigationMeshes(): Mesh[] {
    throw new Error("Method not implemented.");
  }
  createScene(createSceneClass: ICreateSceneClass): Promise<void> {
    throw new Error("Method not implemented.");
  }
  startRenderLoop(): void {
    throw new Error("Method not implemented.");
  }
  createMesh(
    name: string,
    isRelevantForNavigation?: boolean | undefined
  ): Mesh {
    throw new Error("Method not implemented.");
  }

  get Scene(): Scene {
    return scene;
  }
  loadModel(
    url: string,
    isRelevantForNavigation?: boolean | undefined,
    onProgress?:
      | Nullable<(event: ISceneLoaderProgressEvent) => void>
      | undefined
  ): Promise<AbstractMesh[]> {
    return Promise.resolve([new AbstractMesh("testmesh", scene)]);
  }
}

describe("AvatarView", () => {
  let avatarView: AvatarView;
  let navigationMock: NavigationMock;

  beforeEach(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.unbind(CORE_TYPES.INavigation);
    CoreDIContainer.bind<INavigation>(CORE_TYPES.INavigation)
      .to(NavigationMock)
      .inSingletonScope();
    navigationMock = CoreDIContainer.get<NavigationMock>(
      CORE_TYPES.INavigation
    );

    CoreDIContainer.unbind(CORE_TYPES.IScenePresenter);
    CoreDIContainer.bind<IScenePresenter>(CORE_TYPES.IScenePresenter)
      .to(ScenePresenterMock)
      .inSingletonScope();

    let viewModel = new AvatarViewModel();
    avatarView = new AvatarView(viewModel, new AvatarController(viewModel));
  });

  afterEach(() => {
    CoreDIContainer.restore();
  });

  test("constructor calls the scenePresenter to load avatar models", () => {
    let quaternion = new Quaternion(0, 0, 0, 1);
    quaternion._isDirty = false;

    expect(avatarView["viewModel"].meshes.Value).toHaveLength(1);
    expect(avatarView["viewModel"].meshes.Value[0].name).toBe("testmesh");
    expect(avatarView["viewModel"].meshes.Value[0].rotationQuaternion).toEqual(
      quaternion
    );
  });

  test("constructor registeres callback for navigation setup", () => {
    expect(
      navigationMock.onNavigationReadyObservable["subscribers"]
    ).toHaveLength(1);
  });

  test("setupAvatarNavigation is called when the event in the navigation is fired", () => {
    navigationMock.onNavigationReadyObservable.notifySubscribers();
    expect(avatarView["viewModel"].agentIndex).toBe(42);
    expect(
      navigationMock.onNavigationReadyObservable["subscribers"]
    ).toHaveLength(0);
  });
});
