import React from "react";
import MenuHeaderBar from "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBar";
import LearningWorldDetail from "~ReactComponents/LearningWorldMenu/LearningWorldDetail/LearningWorldDetail";
import WorldSelection from "~ReactComponents/LearningWorldMenu/LearningWorldSelection/LearningWorldSelection";
import ReturnHomeModal from "~ReactComponents/LearningWorldMenu/ReturnHomeModal/ReturnHomeModal";
import MBZImportButton from "~ReactComponents/LearningWorldMenu/MBZImportButton/MBZImportButton";
import WorldManagerModal from "~ReactComponents/LearningWorldMenu/WorldManagement/WorldManagerModal";
import WorldManagementButton from "~ReactComponents/LearningWorldMenu/WorldManagement/WorldManagementButton";
import useBuilder from "../CustomHooks/useBuilder";
import BUILDER_TYPES from "../../../../DependencyInjection/Builders/BUILDER_TYPES";
import WorldManagerModalViewModel from "~ReactComponents/LearningWorldMenu/WorldManagement/WorldManagerModalViewModel";
import type IWorldManagerModalController from "~ReactComponents/LearningWorldMenu/WorldManagement/IWorldManagerModalController";

export default function LearningWorldMenu() {
  // Build WorldManagerModal MVC components
  const [worldManagerViewModel, worldManagerController] = useBuilder<
    WorldManagerModalViewModel,
    IWorldManagerModalController
  >(BUILDER_TYPES.IWorldManagerModalBuilder);

  return (
    <div className="relative flex h-[100dvh] flex-col overflow-hidden bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto mobile-landscape:h-[100dvh] mobile-landscape:w-[100dvw] portrait:h-[100dvh]">
      <MenuHeaderBar
        location="world"
        className="w-full flex-shrink-0 self-center p-2 font-semibold"
      />
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_1fr] grid-rows-1 lg:rounded-lg mobile-landscape:overflow-hidden portrait:grid-cols-1 portrait:grid-rows-[1fr_2fr] portrait:gap-4">
        <ReturnHomeModal />
        <WorldSelection className="col-start-1 m-2 rounded-lg p-2 lg:p-8 mobile-landscape:max-h-full mobile-landscape:overflow-auto portrait:col-span-1 portrait:col-start-1 portrait:row-start-1 portrait:overflow-auto" />
        <LearningWorldDetail className="col-start-2 flex p-2 lg:p-8 mobile-landscape:min-h-0 mobile-landscape:overflow-hidden portrait:col-start-1 portrait:row-start-2 portrait:min-h-0 portrait:overflow-hidden" />
      </div>

      {/* Floating action buttons - bottom left */}
      <div className="fixed bottom-4 left-4 z-50 flex gap-2">
        <MBZImportButton />
        {worldManagerController && worldManagerViewModel && (
          <WorldManagementButton controller={worldManagerController} />
        )}
      </div>

      {/* WorldManager Modal */}
      {worldManagerController && worldManagerViewModel && (
        <WorldManagerModal
          viewModel={worldManagerViewModel}
          controller={worldManagerController}
        />
      )}
    </div>
  );
}
