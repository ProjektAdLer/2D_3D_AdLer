import "reflect-metadata";

import { useEffect, useRef } from "react";
import CoreDIContainer from "../../DependencyInjection/CoreDIContainer";
import ICore from "../../API/ICore";
import CORE_TYPES from "../../DependencyInjection/CoreTypes";

export default function BabylonCanvas(props: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef) {
      const canvas = canvasRef.current;

      // We use a Factory here, because React does not support DI - PG
      const engineCore = CoreDIContainer.get<ICore>(CORE_TYPES.ICore);
      if (canvas) {
        engineCore.setupBabylon(canvas);
      } else {
        throw new Error("No Canvas to render on!");
      }
    }
  }, [canvasRef]);

  return <canvas ref={canvasRef} {...props}></canvas>;
}
