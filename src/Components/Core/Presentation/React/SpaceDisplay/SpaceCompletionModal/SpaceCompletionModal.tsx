import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import ISpaceCompletionModalController from "./ISpaceCompletionModalController";
import SpaceCompletionModalViewModel from "./SpaceCompletionModalViewModel";

export default function SpaceCompletionModal() {
  const [viewModel, controller] = useBuilder<
    SpaceCompletionModalViewModel,
    ISpaceCompletionModalController
  >(BUILDER_TYPES.ISpaceCompletionModalBuilder);

  if (!viewModel || !controller) return null;

  return <div>SpaceCompletionModal</div>;
}
