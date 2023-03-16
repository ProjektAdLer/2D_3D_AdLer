import { Engine, EngineOptions, SceneOptions } from "@babylonjs/core";
import { useEffect, useRef } from "react";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import AbstractSceneDefinition from "./Scenes/AbstractSceneDefinition";
import SCENE_TYPES, {
  ScenePresenterFactory,
} from "~DependencyInjection/Scenes/SCENE_TYPES";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../Utils/TailwindMerge";

export type BabylonCanvasProps = {
  sceneDefinitionType: { new (...args: any[]): AbstractSceneDefinition };
  antialias?: boolean;
  engineOptions?: EngineOptions;
  adaptToDeviceRatio?: boolean;
  renderChildrenWhenReady?: boolean;
  sceneOptions?: SceneOptions;
  observeCanvasResize?: boolean;
  children?: React.ReactNode;
};

export default function BabylonCanvas(
  props: AdLerUIComponent<
    BabylonCanvasProps & React.HTMLAttributes<HTMLCanvasElement>
  >
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    sceneDefinitionType,
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    renderChildrenWhenReady,
    children,
    className,
    ...rest
  } = props;

  useEffect(() => {
    if (!canvasRef.current) return;

    // create engine
    const engine = new Engine(
      canvasRef.current,
      antialias,
      engineOptions,
      adaptToDeviceRatio
    );

    // create scene
    const scenePresenterFactory = CoreDIContainer.get<ScenePresenterFactory>(
      SCENE_TYPES.ScenePresenterFactory
    );
    const scenePresenter = scenePresenterFactory(sceneDefinitionType);
    const createSceneAsync = async () => {
      await scenePresenter.createScene(engine, sceneOptions);
      scenePresenter.startRenderLoop();
    };
    createSceneAsync();

    // add callback to handle canvas resize
    const resize = () => {
      engine.resize();
    };
    if (window) window.addEventListener("resize", resize);

    return () => {
      scenePresenter.disposeScene();
      engine.dispose();
      if (window) window.removeEventListener("resize", resize);
    };
  }, [
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    sceneDefinitionType,
  ]);

  return (
    <canvas
      className={tailwindMerge(className)}
      ref={canvasRef}
      {...rest}
    ></canvas>
  );
}
