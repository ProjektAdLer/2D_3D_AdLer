import "reflect-metadata";

import { useEffect, useRef } from "react";
import ICoreFactory from "../../Babylon/Components/Core/API/ICoreFactory";
import CoreFactory from "../../Babylon/Components/Core/API/CoreFactory";

export default function BabylonCanvas(props: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef) {
      const canvas = canvasRef.current;

      // We use a Factory here, because React does not support DI - PG
      const coreFactory: ICoreFactory = new CoreFactory();
      const engineCore = coreFactory.CreateCore();
      engineCore.CreateEngine(canvas!);
    }
  }, [canvasRef]);

  return <canvas ref={canvasRef} {...props}></canvas>;
}
