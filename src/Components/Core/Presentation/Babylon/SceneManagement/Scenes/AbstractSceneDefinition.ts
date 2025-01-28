import { Engine, HighlightLayer, Scene, SceneOptions } from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import { injectable } from "inversify";
import { config } from "src/config";
import { Semaphore } from "src/Lib/Semaphore";
import {HTMLTwinRenderer} from "@babylonjs/accessibility";


/**
 * @description This class is responsible for creating a Scene.
 */
@injectable()
export default abstract class AbstractSceneDefinition {
  private semaphore = new Semaphore(
    "AbstractSceneDefinition scene creation running",
    1,
  );

  /**
   * This array contains functions that need to be executed before the scene is created.
   * This is useful for loading data that is required for the scene.
   * The functions will be executed in the order they are added to the array.
   **/
  protected preTasks: (() => Promise<void> | void)[] = [];

  protected scene: Scene;
  /**
   * Getter for the scene.
   **/
  get Scene(): Scene {
    return this.scene;
  }

  protected highlightLayer: HighlightLayer;
  /**
   * Getter for the highligh layer.
   **/
  get HighlightLayer(): HighlightLayer {
    return this.highlightLayer;
  }

  /**
   * This function creates the scene and initializes it.
   **/
  async createScene(
    engine: Engine,
    sceneOptions?: SceneOptions,
  ): Promise<void> {
    let lock = await this.semaphore.acquire();

    this.scene = new Scene(engine, sceneOptions);

    HTMLTwinRenderer.Render(this.Scene);

    // execute pretasks in order, waiting inbetween
    await Promise.all(
      this.preTasks.map(async (task) => {
        await task();
      }),
    );

    await this.initializeScene();

    this.applyDebugLayer();

    lock.release();
  }

  disposeScene(): void {
    this.scene.dispose();
    this.highlightLayer?.dispose();
    this.semaphore = new Semaphore(
      "AbstractSceneDefinition scene creation running",
      1,
    );
  }

  /**
   * This function initializes the scene.
   * Must be overridden.
   * Add custom scene creation and setup logic here.
   **/
  protected abstract initializeScene(): Promise<void>;

  /**
   * This function applies the debug layer to the scene if config.isDebug is set to true.
   * Can be overridden to apply custom debug elements or with a empty function to prevent the debug layer from beeing applied.
   */
  protected applyDebugLayer(): void {
    if (config.isDebug) Inspector.Show(this.scene, { overlay: true });
  }
}
