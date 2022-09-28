import { Engine, EngineOptions, SceneOptions } from "@babylonjs/core";
import { useEffect, useRef } from "react";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import ICreateSceneClass from "./ICreateSceneClass";
import IScenePresenter from "./IScenePresenter";

export type BabylonjsProps = {
  createSceneClass: ICreateSceneClass;
  antialias?: boolean;
  engineOptions?: EngineOptions;
  adaptToDeviceRatio?: boolean;
  renderChildrenWhenReady?: boolean;
  sceneOptions?: SceneOptions;
  observeCanvasResize?: boolean;
  children?: React.ReactNode;
};

export default function BabylonCanvas(
  props: BabylonjsProps & React.HTMLAttributes<HTMLCanvasElement>
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    createSceneClass,
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    renderChildrenWhenReady,
    children,
    ...rest
  } = props;

  useEffect(() => {
    const asyncFunc = async () => {
      if (!canvasRef.current) return null;

      // create engine
      const engine = new Engine(
        canvasRef.current,
        antialias,
        engineOptions,
        adaptToDeviceRatio
      );

      // create scene
      const scenePresenter = CoreDIContainer.get<IScenePresenter>(
        CORE_TYPES.IScenePresenter
      );
      await scenePresenter.createScene(engine, createSceneClass, sceneOptions);

      scenePresenter.startRenderLoop();

      // add callback to handle canvas resize
      const resize = () => {
        engine.resize();
      };
      if (window) window.addEventListener("resize", resize);

      return () => {
        engine.dispose();
        if (window) window.removeEventListener("resize", resize);
      };
    };

    asyncFunc();
  }, [
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    createSceneClass,
  ]);

  return <canvas ref={canvasRef} {...rest}></canvas>;
}
