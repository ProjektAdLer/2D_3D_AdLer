import { useEffect, useRef } from "react";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import IEngineManager from "../../Babylon/EngineManager/IEngineManager";
import ISceneController from "../../Babylon/SceneManagment/ISceneController";

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
          const sceneController = CoreDIContainer.get<ISceneController>(
            CORE_TYPES.ISceneController
          );

          engineManager.createEngine(canvas);

          await sceneController.createScene(
            CoreDIContainer.get(CORE_TYPES.ICreateSceneClass)
          );

          sceneController.createRenderLoop();
        } else {
          throw new Error("No Canvas to render on!");
        }
      }
    };

    asyncFunc();
  }, [canvasRef]);

  return <canvas ref={canvasRef} {...props}></canvas>;
}
