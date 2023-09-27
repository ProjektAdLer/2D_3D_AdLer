import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import AdaptivityElementViewModel from "../AdaptivityElementViewModel";
import IAdaptivityElementController from "../IAdaptivityElementController";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { AdLerUIComponent } from "../../../../Types/ReactTypes";

import quizBackgroundVRGuy from "../../../../../../Assets/misc/quizBackgrounds/vr-guy-quiz-background.png";
import AdaptivityElementTaskSelection from "./AdaptivityElementTaskSelection";
import { useState } from "react";

export default function AdaptivityElementDialogContainer({
  className,
}: AdLerUIComponent) {
  const [viewmodel, controller] = useBuilder<
    AdaptivityElementViewModel,
    IAdaptivityElementController
  >(BUILDER_TYPES.IAdaptivityElementBuilder);

  // -- Observables --
  const [isOpen] = useObservable<boolean>(viewmodel?.isOpen);
  const [currentTaskID] = useObservable<number | null>(
    viewmodel?.currentTaskID
  );
  const [currentQuestionID] = useObservable<number | null>(
    viewmodel?.currentQuestionID
  );
  const [contentData] = useObservable(viewmodel?.contentData);
  const [footerText] = useObservable<string>(viewmodel?.footerText);

  // -- State --
  const [headerText, setHeaderText] = useState<string>("");

  if (!viewmodel || !controller) return null;
  if (!isOpen || !contentData) return null;

  return (
    <>
      <StyledContainer className={tailwindMerge(className, "")}>
        <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center w-screen h-screen bg-black bg-opacity-50">
          <img
            className="absolute top-0 right-0 z-0 max-h-[93vh] w-fit max-w-[90vw] lg:max-w-[99vw]"
            alt="LearningImage!"
            src={quizBackgroundVRGuy}
          ></img>
          <div className="z-10 p-2 xl:px-8 rounded-lg bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto max-w-[95%] max-h-[95%] overflow-auto">
            <div className="flex items-center justify-center w-full gap-2 p-1 pb-3 text-xl font-bold text-adlerdarkblue lg:roboto-black lg:text-2xl h-fit">
              <div className="w-full">{headerText}</div>

              <StyledButton
                onClick={controller.closeModal}
                className="w-8 h-8 p-1 text-xs roboto-black xl:w-10 xl:h-10 lg:w-10 lg:h-10 md:w-10 md:h-10 sm:w-10 sm:h-10"
              >
                X
              </StyledButton>
            </div>

            {currentTaskID === null && currentQuestionID === null && (
              <div className="flex justify-center items-center px-1 rounded-lg font-regular h-fit mt-2">
                <AdaptivityElementTaskSelection
                  tasks={contentData.tasks}
                  setHeaderText={setHeaderText}
                  onSelectTask={controller.selectTask}
                />
              </div>
            )}

            {
              <div className="modal-footer">
                <p>{footerText}</p>
              </div>
            }
          </div>
        </div>
      </StyledContainer>
    </>
  );
}
