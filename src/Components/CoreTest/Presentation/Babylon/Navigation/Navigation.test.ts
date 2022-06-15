import {
  Scene,
  Mesh,
  Nullable,
  ISceneLoaderProgressEvent,
  AbstractMesh,
  NullEngine,
} from "@babylonjs/core";
import SimpleEvent from "../../../../../Lib/SimpleEvent";
import Navigation from "../../../../Core/Presentation/Babylon/Navigation/Navigation";
import NavigationConfiguration from "../../../../Core/Presentation/Babylon/Navigation/NavigationConfiguration";
import ICreateSceneClass from "../../../../Core/Presentation/Babylon/SceneManagement/ICreateSceneClass";
import IScenePresenter from "../../../../Core/Presentation/Babylon/SceneManagement/IScenePresenter";

const notifySubscribersMock = jest.spyOn(
  SimpleEvent.prototype,
  "notifySubscribers"
);

class ScenePresenterMock implements IScenePresenter {
  get Scene(): Scene {
    return new Scene(new NullEngine());
  }
  get NavigationMeshes(): Mesh[] {
    throw new Error("Method not implemented.");
  }
  createScene(createSceneClass: ICreateSceneClass): Promise<void> {
    throw new Error("Method not implemented.");
  }
  startRenderLoop(): void {
    throw new Error("Method not implemented.");
  }
  loadModel(
    url: string,
    isRelevantForNavigation?: boolean | undefined,
    onProgress?:
      | Nullable<(event: ISceneLoaderProgressEvent) => void>
      | undefined
  ): Promise<AbstractMesh[]> {
    throw new Error("Method not implemented.");
  }
  createMesh(
    name: string,
    isRelevantForNavigation?: boolean | undefined
  ): Mesh {
    throw new Error("Method not implemented.");
  }
}

describe("Navigation", () => {
  let navigation: Navigation;

  beforeEach(() => {
    navigation = new Navigation(
      new ScenePresenterMock(),
      new NavigationConfiguration()
    );
  });

  test.todo("fix tests using Recast");
  // test("setupNavigation creates a plugin instance, a navMesh and a crowd", async () => {
  //   await navigation.setupNavigation();

  //   expect(navigation["plugin"]).toBeDefined();
  //   expect(navigation["crowd"]).toBeDefined();
  //   expect(navigation.Plugin.navMesh).toBeDefined();
  //   expect(notifySubscribersMock).toHaveBeenCalledTimes(1);
  // });
});
