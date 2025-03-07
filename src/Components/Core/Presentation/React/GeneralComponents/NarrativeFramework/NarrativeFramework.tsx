import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import NarrativeFrameworkViewModel from "./NarrativeFrameworkViewModel";
import INarrativeFrameworkController from "./INarrativeFrameworkController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";

export default function NarrativeFramework() {
  const [viewModel, controller] = useBuilder<
    NarrativeFrameworkViewModel,
    INarrativeFrameworkController
  >(BUILDER_TYPES.INarrativeFrameworkBuilder);
  const [isOpen] = useObservable<boolean>(viewModel?.isOpen);

  if (!viewModel || !controller || !isOpen) return null;

  return <div className="fixed ">{viewModel.text}</div>;
}
