import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import SettingContentViewModel from "./SettingContentViewModel";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import SettingContentController from "./SettingContentController";

export default function SettingContent({ className }: AdLerUIComponent) {
  const [viewModel, controller] = useBuilder<
    SettingContentViewModel,
    SettingContentController
  >(BUILDER_TYPES.ISettingContentBuilder);
  return (
    <div
      className={`flex h-full w-full flex-col items-center overflow-hidden px-4 pt-4 ${className}`}
    ></div>
  );
}
