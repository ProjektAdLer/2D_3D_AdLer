import { useEffect, useRef } from "react";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import IPresentation from "../../API/IPresentation";

export default function BabylonCanvas(props: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef) {
      const canvas = canvasRef.current;

      const engine = CoreDIContainer.get<IPresentation>(
        CORE_TYPES.IPresentation
      );
      if (canvas) {
        engine.setupBabylon(canvas);
      } else {
        throw new Error("No Canvas to render on!");
      }
    }
  }, [canvasRef]);

  return <canvas ref={canvasRef} {...props}></canvas>;
}
