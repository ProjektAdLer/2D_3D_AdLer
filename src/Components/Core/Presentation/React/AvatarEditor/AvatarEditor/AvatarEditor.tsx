import IAvatarEditorController from "./IAvatarEditorController";
import AvatarEditorViewModel from "./AvatarEditorViewModel";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import React from "react";
import MenuHeaderBar from "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBar";

export default function AvatarEditor() {
  const [viewModel, controller] = useBuilder<
    AvatarEditorViewModel,
    IAvatarEditorController
  >(BUILDER_TYPES.IAvatarEditorBuilder);

  if (!viewModel || !controller) return null;

  return (
    <React.Fragment>
      <div className="flex flex-col h-[100svh] bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto overflow-hidden">
        <div className="grid order-2 grid-cols-2 grid-rows-1 portrait:grid-cols-1 portrait:grid-rows-2 portrait:gap-4 grow lg:rounded-lg">
          <div className="col-start-1">links</div>
          <div className="col-start-2">rechts</div>
        </div>
        <MenuHeaderBar
          location="editor"
          className="self-center order-1 w-full p-2 font-semibold"
        />
      </div>
    </React.Fragment>
  );
}
