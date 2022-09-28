import { useEffect, useRef } from "react";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import IEngineManager from "../EngineManager/IEngineManager";
import IScenePresenter from "./IScenePresenter";

export default function BabylonCanvas(props: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const asyncFunc = async () => {
      if (canvasRef) {
        const canvas = canvasRef.current;

        if (canvas) {
          const engineManager = CoreDIContainer.get<IEngineManager>(
            CORE_TYPES.IEngineManager
          );
          const scenePresenter = CoreDIContainer.get<IScenePresenter>(
            CORE_TYPES.IScenePresenter
          );

          engineManager.createEngine(canvas);

          await scenePresenter.createScene(
            CoreDIContainer.get(CORE_TYPES.ICreateSceneClass)
          );

          scenePresenter.startRenderLoop();
        }
      }
    };

    asyncFunc();
  }, [canvasRef]);

  return <canvas ref={canvasRef} {...props}></canvas>;
}
