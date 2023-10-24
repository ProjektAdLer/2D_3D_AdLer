import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import IOverallTimeSpentAdaptivityNotificationController from "./IOverallTimeSpentAdaptivityNotificationController";
import OverallTimeSpentAdaptivityNotificationViewModel from "./OverallTimeSpentAdaptivityNotificationViewModel";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import { OverallTimeSpentAdaptivityNotificationBreakType } from "src/Components/Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
import { AdLerUIComponent } from "../../../Types/ReactTypes";
import tailwindMerge from "../../Utils/TailwindMerge";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import TextWithLineBreaks from "~ReactComponents/ReactRelated/ReactBaseComponents/TextWithLineBreaks";
import pauseIcon from "../../../../../Assets/icons/42-pause-icon/47-pause-icon-nobg.svg";

export default function OverallTimeSpentAdaptivityNotification({
  className,
}: AdLerUIComponent) {
  const [viewModel, controller] = useBuilder<
    OverallTimeSpentAdaptivityNotificationViewModel,
    IOverallTimeSpentAdaptivityNotificationController
  >(BUILDER_TYPES.IOverallTimeSpentAdaptivityNotificationBuilder);

  const [showModal] = useObservable(viewModel?.showModal);
  const [showMinimizedModal] = useObservable(viewModel?.showMinimizedModal);
  const [breakType] = useObservable(viewModel?.breakType);

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
      </div>
    );

  return (
    <StyledModal
      className={tailwindMerge(className, "")}
      showModal={showModal}
      onClose={() => controller.minimizeOrMaximizeBreakNotification()}
      title="Pausenhinweis"
    >
      {GetNotificationModalContents(breakType, viewModel)}
    </StyledModal>
  );
}

function GetNotificationModalContents(
  breakType: OverallTimeSpentAdaptivityNotificationBreakType,
  viewModel: OverallTimeSpentAdaptivityNotificationViewModel
) {
  switch (breakType) {
    case OverallTimeSpentAdaptivityNotificationBreakType.Short:
      return ShortBreakContent(viewModel);
    case OverallTimeSpentAdaptivityNotificationBreakType.Medium:
      return MediumBreakContent(viewModel);
    case OverallTimeSpentAdaptivityNotificationBreakType.Long:
      return LongBreakContent(viewModel);
    default:
      return "";
  }
}

function ShortBreakContent(
  viewModel: OverallTimeSpentAdaptivityNotificationViewModel
) {
  let randomIndex = Math.floor(
    Math.random() * viewModel.shortBreakContentPool.length
  );
  return (
    <div data-testid="short-break" className="pb-4 w-[90vw] lg:w-[60vw]">
      {/* media */}
      {/*Bitte die "nicht Tailwindklassen" drinne lassen! Brauchen hierfür Plain CSS in de app.css*/}
      {viewModel.shortBreakContentPool[randomIndex][2] !== "" && (
        <div className="relative mx-0 my-auto slider-wrapper">
          <div className="flex gap-4 overflow-x-auto slider snap-x snap-mandatory scroll-smooth lg:max-w-[60vw] max-w-[90vw]">
            <figure>
              <img
                id="slide-1"
                className="object-cover lg:max-w-[60vw] max-w-[90vw] rounded-lg snap-start"
                src={viewModel.shortBreakContentPool[randomIndex][0]}
                title="Slide 1/3"
                alt=""
              ></img>
              <figcaption className="p-4 text-lg font-bold text-end lg:text-xl text-adlerdarkblue">
                1/3
              </figcaption>
            </figure>
            <figure>
              <img
                id="slide-2"
                className="object-cover lg:max-w-[60vw] max-w-[90vw] rounded-lg snap-start"
                src={viewModel.shortBreakContentPool[randomIndex][1]}
                title="Slide 2/3"
                alt=""
              ></img>
              <figcaption className="p-4 text-lg font-bold text-end lg:text-xl text-adlerdarkblue">
                2/3
              </figcaption>
            </figure>
            <figure>
              <img
                id="slide-3"
                className="object-cover lg:max-w-[60vw] max-w-[90vw] rounded-lg snap-start"
                src={viewModel.shortBreakContentPool[randomIndex][2]}
                title="Slide 3/3"
                alt=""
              ></img>
              <figcaption className="p-4 text-lg font-bold text-end lg:text-xl text-adlerdarkblue">
                3/3
              </figcaption>
            </figure>
          </div>
          <div className="absolute z-10 flex gap-4 -translate-x-1/2 lg:gap-6 slider-nav bottom-2 lg:bottom-4 left-1/2">
            <a
              href="#slide-1"
              className="w-2 h-2 transition duration-200 ease-in-out bg-white rounded-full opacity-75 lg:w-4 lg:h-4 hover:opacity-100"
            ></a>
            <a
              href="#slide-2"
              className="w-2 h-2 transition duration-200 ease-in-out bg-white rounded-full opacity-75 lg:w-4 lg:h-4 hover:opacity-100"
            ></a>
            <a
              href="#slide-3"
              className="w-2 h-2 transition duration-200 ease-in-out bg-white rounded-full opacity-75 lg:w-4 lg:h-4 hover:opacity-100"
            ></a>
          </div>
        </div>
      )}
    </div>
  );
}

function MediumBreakContent(
  viewModel: OverallTimeSpentAdaptivityNotificationViewModel
) {
  let randomIndex = Math.floor(
    Math.random() * viewModel.mediumBreakContentPool.length
  );
  return (
    <div
      data-testid="medium-break"
      className="pb-4 w-[90vw] portrait:w-[99vw] lg:w-[60vw]"
    >
      {/* title */}
      <p>{viewModel.mediumBreakContentPool[randomIndex][0]}</p>
      {/* content */}
      <TextWithLineBreaks
        text={viewModel.mediumBreakContentPool[randomIndex][1]}
      ></TextWithLineBreaks>
      <br />
      {/* media */}
      {viewModel.mediumBreakContentPool[randomIndex][2] !== "" && (
        <iframe
          className="w-full rounded-lg aspect-video"
          src={viewModel.mediumBreakContentPool[randomIndex][2]}
          title="Break Item Iframe"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}

function LongBreakContent(
  viewModel: OverallTimeSpentAdaptivityNotificationViewModel
) {
  let randomIndex = Math.floor(
    Math.random() * viewModel.longBreakContentPool.length
  );
  return (
    <div
      data-testid="long-break"
      className="pb-4 w-[90vw] portrait:w-[99vw] lg:w-[60vw]"
    >
      {/* title */}
      <p>{viewModel.longBreakContentPool[randomIndex][0]}</p>
      {/* content */}
      <TextWithLineBreaks
        text={viewModel.longBreakContentPool[randomIndex][1]}
      ></TextWithLineBreaks>
      <br />
      {/* media */}
      {viewModel.longBreakContentPool[randomIndex][2] !== "" && (
        <iframe
          className="w-full rounded-lg aspect-video"
          src={viewModel.longBreakContentPool[randomIndex][2]}
          title="Break Item Iframe"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}
