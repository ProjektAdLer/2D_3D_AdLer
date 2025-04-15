import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import CinemaStripesViewModel from "./CinemaStripesViewModel";
import ICinemaStripesController from "./ICinemaStripesController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";

export default function CinemaStripes() {
  const [viewModel, controller] = useBuilder<
    CinemaStripesViewModel,
    ICinemaStripesController
  >(BUILDER_TYPES.ICinemaStripesBuilder);

  const [isOpen] = useObservable<boolean>(viewModel?.isOpen);

  if (!viewModel || !controller) return null;
  if (!isOpen) return null;
  return (
    <div>
      <div className="absolute top-0 left-0 w-full h-24 bg-black z-[100]"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-black z-[100]"></div>
    </div>
  );
}
