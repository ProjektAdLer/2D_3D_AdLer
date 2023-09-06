import React from "react";
import MenuHeaderBar from "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBar";
import LearningSpaceDetail from "~ReactComponents/LearningSpaceMenu/LearningSpaceDetail/LearningSpaceDetail";
import LearningWorldCompletionModal from "~ReactComponents/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModal";
import SpaceSelection from "~ReactComponents/LearningSpaceMenu/LearningSpaceSelection/LearningSpaceSelection";
import { useInjection } from "inversify-react";
import IStartOverallTimeSpentNotificationTimerUseCase from "src/Components/Core/Application/UseCases/Adaptivity/StartOverallTimeSpentNotificationTimerUseCase/IStartOverallTimeSpentNotificationTimerUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import { OverallTimeSpentAdaptivityNotificationBreakType } from "../../../Adaptivity/OverallTimeSpentAdaptivityNotification/OverallTimeSpentAdaptivityNotificationViewModel";

export default function LearningSpaceMenu() {
  const startTimerUseCase =
    useInjection<IStartOverallTimeSpentNotificationTimerUseCase>(
      USECASE_TYPES.IStartOverallTimeSpentNotificationTimerUseCase
    );
  startTimerUseCase.execute({
    delay: 30,
    breakType: OverallTimeSpentAdaptivityNotificationBreakType.Short,
  });

  return (
    <React.Fragment>
      <div className="flex flex-col h-[100svh] bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto overflow-hidden">
        <div className="grid order-2 grid-cols-2 grid-rows-1 portrait:grid-cols-1 portrait:grid-rows-2 grow lg:rounded-lg">
          <SpaceSelection className="col-start-1 p-2 portrait:row-start-1 lg:pb-8" />
          <LearningSpaceDetail className="flex col-start-2 p-2 portrait:col-start-1 portrait:row-start-2 lg:p-8" />
        </div>
        <MenuHeaderBar
          location="space"
          className="self-center order-1 w-full p-2 font-semibold"
        />
      </div>
      <LearningWorldCompletionModal className="transition-opacity duration-100 ease-in delay-75" />
    </React.Fragment>
  );
}
