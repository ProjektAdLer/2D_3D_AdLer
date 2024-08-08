import { useEffect, useRef } from "react";
import { H5P as H5PPlayer } from "h5p-standalone";
import LearningElementModalViewModel from "../LearningElementModalViewModel";
import { createH5POptions } from "./H5pUtils";

export default function H5PContent({
  viewModel,
}: {
  readonly viewModel: LearningElementModalViewModel;
}) {
  const h5pContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setup = async () => {
      if (h5pContainerRef.current) {
        const el = h5pContainerRef.current;

        await new H5PPlayer(el, createH5POptions(viewModel));
      }
    };
    setup();
  }, [viewModel]);

  return (
    <div className="App">
      <div
        className=" w-[80vw] h-[80vh] sm:h-[80vh] sm:w-[90vw] xl:h-[85vh] xl:w-[80vw] "
        id="h5p-container"
        ref={h5pContainerRef}
      ></div>
    </div>
  );
}
