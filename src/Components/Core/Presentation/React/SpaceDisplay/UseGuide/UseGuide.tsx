import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import IUseGuideController from "./IUseGuideController";
import UseGuideViewModel from "./UseGuideViewModel";

export default function UseGuide() {
  const [viewModel, controller] = useBuilder<
    UseGuideViewModel,
    IUseGuideController
  >(BUILDER_TYPES.IUseGuideBuilder);

  if (!viewModel || !controller) return null;

  return <div>UseGuide</div>;
}
