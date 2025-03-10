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
      <div className="flex flex-col h-[100svh] mobile-landscape:w-[100dvw] mobile-landscape:h-[100dvh] bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto overflow-hidden">
        <div className="grid order-2 grid-cols-2 grid-rows-1 portrait:grid-cols-1 portrait:grid-rows-2 portrait:gap-4 grow lg:rounded-lg">
          <SpaceSelection className="col-start-1 p-2 portrait:row-start-1 lg:pb-8" />
          <LearningSpaceDetail className="flex col-start-2 p-2 portrait:col-start-1 portrait:row-start-2 lg:p-8" />
        </div>
        <MenuHeaderBar
          location="space"
          className="self-center order-1 w-full p-2 font-semibold"
        />
      </div>
      <LearningWorldCompletionModal className="transition-opacity duration-100 ease-in delay-75" />
      <BreakTimeNotification />
    </React.Fragment>
  );
}
