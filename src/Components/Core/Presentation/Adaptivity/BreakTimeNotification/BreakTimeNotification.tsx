import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import IBreakTimeNotificationController from "./IBreakTimeNotificationController";
import BreakTimeNotificationViewModel from "./BreakTimeNotificationViewModel";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import { BreakTimeNotificationType } from "src/Components/Core/Domain/Entities/Adaptivity/BreakTimeNotificationEntity";
import { AdLerUIComponent } from "../../../Types/ReactTypes";
import tailwindMerge from "../../Utils/TailwindMerge";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import pauseIcon from "../../../../../Assets/icons/42-pause-icon/47-pause-icon-nobg.svg";
import { useEffect, useState } from "react";

export default function BreakTimeNotification({ className }: AdLerUIComponent) {
  const [viewModel, controller] = useBuilder<
    BreakTimeNotificationViewModel,
    IBreakTimeNotificationController
  >(BUILDER_TYPES.IBreakTimeNotificationBuilder);

  const [showModal] = useObservable(viewModel?.showModal);
  const [showMinimizedModal] = useObservable(viewModel?.showMinimizedModal);
  const [breakType] = useObservable(viewModel?.breakType);
  useObservable(viewModel?.slideIndex);
  const [randomNumber, setRandomNumber] = useState<number>(0);

  useEffect(() => {
    setRandomNumber(Math.random());
    controller.setSliderIndex(1);
  }, [viewModel?.showModal, controller]);

  if (!viewModel || !controller || !showModal || !breakType) return null;

  if (showMinimizedModal)
    return (
      <div>
        <StyledButton
          shape="freefloatleft"
          onClick={() => controller.minimizeOrMaximizeBreakNotification()}
          className="!hidden lg:flex fixed left-2 bottom-2"
        >
          <img src={pauseIcon} className="h-12" alt="" />
          <div className="flex flex-col items-start pl-4 pr-2">
            <h1 className="text-xl font-bold">Zeit für eine Pause!</h1>
            <p className="text-sm">Klicke für mehr Informationen</p>
          </div>
          <div
            className="place-self-start flex items-center justify-center border-t-[1px] border-l-[1px] border-b-4 border-r-4 border-adlerdarkblue rounded-lg px-1.5"
            onClick={() => controller.closeBreakNotification()}
          >
            x
          </div>
        </StyledButton>
        <StyledButton className="fixed lg:hidden left-2 bottom-2">
          <img src={pauseIcon} className="h-fit" alt="" />
        </StyledButton>
      </div>
    );

  return (
    <StyledModal
      className={tailwindMerge(className, "")}
      showModal={showModal}
      onClose={() => controller.minimizeOrMaximizeBreakNotification()}
      title="Pausenhinweis"
    >
      {GetBreakTimeModalContents(
        breakType,
        viewModel,
        controller,
        randomNumber
      )}
    </StyledModal>
  );
}

function GetBreakTimeModalContents(
  breakType: BreakTimeNotificationType,
  viewModel: BreakTimeNotificationViewModel,
  controller: IBreakTimeNotificationController,
  randomNumber: number
) {
  switch (breakType) {
    case BreakTimeNotificationType.Short:
      return ShortBreakContent(viewModel, controller, randomNumber);
    case BreakTimeNotificationType.Medium:
      return MediumBreakContent(viewModel, controller, randomNumber);
    case BreakTimeNotificationType.Long:
      return LongBreakContent(viewModel, controller, randomNumber);
    default:
      return "";
  }
}

function ShortBreakContent(
  viewModel: BreakTimeNotificationViewModel,
  controller: IBreakTimeNotificationController,
  randomNumber: number
) {
  let notSeenBeforeShortBreaks = viewModel.shortBreakContentPool.filter(
    (shortBreaks) => !shortBreaks.seenBefore
  );
  let randomIndex = Math.floor(randomNumber * notSeenBeforeShortBreaks.length);
  viewModel.shortBreakContentPool[randomIndex].seenBefore = true;

  return (
    <div data-testid="short-break">
      {RenderBreakContent(
        controller,
        randomIndex,
        viewModel.shortBreakContentPool,
        viewModel.slideIndex.Value
      )}
    </div>
  );
}

function MediumBreakContent(
  viewModel: BreakTimeNotificationViewModel,
  controller: IBreakTimeNotificationController,
  randomNumber: number
) {
  let notSeenBeforeMediumBreaks = viewModel.mediumBreakContentPool.filter(
    (mediumBreaks) => !mediumBreaks.seenBefore
  );
  let randomIndex = Math.floor(randomNumber * notSeenBeforeMediumBreaks.length);
  viewModel.mediumBreakContentPool[randomIndex].seenBefore = true;
  return (
    <div data-testid="medium-break">
      {RenderBreakContent(
        controller,
        randomIndex,
        viewModel.mediumBreakContentPool,
        viewModel.slideIndex.Value
      )}
    </div>
  );
}

function LongBreakContent(
  viewModel: BreakTimeNotificationViewModel,
  controller: IBreakTimeNotificationController,
  randomNumber: number
) {
  let notSeenBeforeLongBreaks = viewModel.longBreakContentPool.filter(
    (longBreaks) => !longBreaks.seenBefore
  );
  let randomIndex = Math.floor(randomNumber * notSeenBeforeLongBreaks.length);
  viewModel.longBreakContentPool[randomIndex].seenBefore = true;
  return (
    <div data-testid="long-break">
      {RenderBreakContent(
        controller,
        randomIndex,
        viewModel.longBreakContentPool,
        viewModel.slideIndex.Value
      )}
    </div>
  );
}
function RenderBreakContent(
  controller: IBreakTimeNotificationController,
  randomIndex: number,
  breakContentPool: any,
  currentSlideIndex: number
) {
  return (
    <div className="pb-4 max-w-[90vw] lg:max-w-[60vw]">
      <div className="relative mx-0 my-auto slider-wrapper">
        <div className="flex gap-4 overflow-x-auto slider snap-x snap-mandatory scroll-smooth lg:max-w-[60vw] max-w-[90vw]">
          <figure>
            <p className="pb-4 pl-6 text-lg font-bold lg:text-xl text-adlerdarkblue">
              {breakContentPool[randomIndex].titleMessage}
            </p>
            {currentSlideIndex === 1 && (
              <img
                id="slide-1"
                className="object-cover lg:max-w-[60vw] max-w-[90vw] rounded-lg snap-start"
                src={breakContentPool[randomIndex].image1}
                title="Slide 1/3"
                alt=""
              ></img>
            )}
            {currentSlideIndex === 2 && (
              <img
                id="slide-2"
                className="object-cover lg:max-w-[60vw] max-w-[90vw] rounded-lg snap-start"
                src={breakContentPool[randomIndex].image2}
                title="Slide 2/3"
                alt=""
              ></img>
            )}
            {currentSlideIndex === 3 && (
              <img
                id="slide-3"
                className="object-cover lg:max-w-[60vw] max-w-[90vw] rounded-lg snap-start"
                src={breakContentPool[randomIndex].image3}
                title="Slide 3/3"
                alt=""
              ></img>
            )}
            {currentSlideIndex === 4 && (
              <img
                id="slide-4"
                className="object-cover lg:max-w-[60vw] max-w-[90vw] rounded-lg snap-start"
                src={breakContentPool[randomIndex].image4}
                title="Slide 4/4"
                alt=""
              ></img>
            )}
          </figure>
        </div>
        {breakContentPool[randomIndex].image2 !== "" && (
          <div className="absolute z-10 flex gap-4 -translate-x-1/2 lg:gap-6 slider-nav bottom-2 lg:bottom-4 left-1/2">
            {breakContentPool[randomIndex].image1 !== "" && (
              <button
                className={
                  (currentSlideIndex === 1 ? "bg-yellow-400 " : "bg-white ") +
                  "w-2 h-2 transition duration-200 ease-in-out rounded-full opacity-75 lg:w-4 lg:h-4 hover:opacity-100"
                }
                onClick={() => controller.setSliderIndex(1)}
              ></button>
            )}
            {breakContentPool[randomIndex].image2 !== "" && (
              <button
                className={
                  (currentSlideIndex === 2 ? "bg-yellow-400 " : "bg-white ") +
                  "w-2 h-2 transition duration-200 ease-in-out rounded-full opacity-75 lg:w-4 lg:h-4 hover:opacity-100"
                }
                onClick={() => controller.setSliderIndex(2)}
              ></button>
            )}
            {breakContentPool[randomIndex].image3 !== "" && (
              <button
                className={
                  (currentSlideIndex === 3 ? "bg-yellow-400 " : "bg-white ") +
                  "w-2 h-2 transition duration-200 ease-in-out rounded-full opacity-75 lg:w-4 lg:h-4 hover:opacity-100"
                }
                onClick={() => controller.setSliderIndex(3)}
              ></button>
            )}
            {breakContentPool[randomIndex].image4 !== "" && (
              <button
                className={
                  (currentSlideIndex === 4 ? "bg-yellow-400 " : "bg-white ") +
                  "w-2 h-2 transition duration-200 ease-in-out rounded-full opacity-75 lg:w-4 lg:h-4 hover:opacity-100"
                }
                onClick={() => controller.setSliderIndex(4)}
              ></button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
