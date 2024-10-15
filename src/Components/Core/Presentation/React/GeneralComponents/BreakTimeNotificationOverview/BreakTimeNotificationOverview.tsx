import IBreakTimeNotificationOverviewController from "./IBreakTimeNotificationOverviewController";
import BreakTimeNotificationOverviewViewModel from "./BreakTimeNotificationOverviewViewModel";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";

export default function BreakTimeNotificationOverview() {
  const [viewModel, controller] = useBuilder<
    BreakTimeNotificationOverviewViewModel,
    IBreakTimeNotificationOverviewController
  >(BUILDER_TYPES.IBreakTimeNotificationOverviewBuilder);

  if (!viewModel || !controller) return null;

  return <div>BreakTimeNotificationOverview</div>;
}
