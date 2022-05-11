import { useEffect, useRef } from "react";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import ICore from "../../../API/ICore";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";

export default function BabylonCanvas(props: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef) {
      const canvas = canvasRef.current;

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
