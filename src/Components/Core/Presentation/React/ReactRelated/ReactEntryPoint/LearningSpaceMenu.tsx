import React, { useEffect } from "react";
import MenuHeaderBar from "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBar";
import LearningSpaceDetail from "~ReactComponents/LearningSpaceMenu/LearningSpaceDetail/LearningSpaceDetail";
import LearningWorldCompletionModal from "~ReactComponents/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModal";
import SpaceSelection from "~ReactComponents/LearningSpaceMenu/LearningSpaceSelection/LearningSpaceSelection";
import { useInjection } from "inversify-react";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import BreakTimeNotification from "../../../Adaptivity/BreakTimeNotification/BreakTimeNotification";
import ICreateOverallTimeSpentTimerUseCase from "src/Components/Core/Application/UseCases/Adaptivity/OverallTimeSpent/CreateOverallTimeSpentTimer/ICreateOverallTimeSpentTimerUseCase";

export default function LearningSpaceMenu() {
  const createTimerUseCase = useInjection<ICreateOverallTimeSpentTimerUseCase>(
    USECASE_TYPES.ICreateOverallTimeSpentTimerUseCase,
  );

  useEffect(() => {
    createTimerUseCase.execute();
  }, [createTimerUseCase]);

  return (
    <React.Fragment>
      <div className="flex h-[100dvh] flex-col overflow-hidden bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto mobile-landscape:h-[100dvh] mobile-landscape:w-[100dvw] portrait:h-[100dvh]">
        <MenuHeaderBar
          location="space"
          className="w-full flex-shrink-0 self-center px-2 font-semibold"
        />
        <div className="grid min-h-0 flex-1 grid-cols-[1fr_1fr] grid-rows-1 lg:rounded-lg mobile-landscape:overflow-hidden portrait:grid-cols-1 portrait:grid-rows-[1fr_2fr] portrait:gap-4">
          <SpaceSelection className="col-start-1 m-2 rounded-lg p-2 lg:p-8 mobile-landscape:max-h-full mobile-landscape:overflow-auto portrait:col-span-1 portrait:col-start-1 portrait:row-start-1 portrait:overflow-auto" />
          <LearningSpaceDetail className="col-start-2 flex p-2 lg:p-8 mobile-landscape:min-h-0 mobile-landscape:overflow-hidden portrait:col-start-1 portrait:row-start-2 portrait:min-h-0 portrait:overflow-hidden" />
        </div>
      </div>
      <LearningWorldCompletionModal className="transition-opacity delay-75 duration-100 ease-in" />
      <BreakTimeNotification />
    </React.Fragment>
  );
}
