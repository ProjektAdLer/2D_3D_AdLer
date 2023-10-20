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
    <div
      data-testid="short-break"
      className="pb-4 w-[90vw] portrait:w-[99vw] lg:w-[60vw]"
    >
      {/* title */}
      <p>{viewModel.shortBreakContentPool[randomIndex][0]}</p>
      {/* content */}
      <TextWithLineBreaks
        text={viewModel.shortBreakContentPool[randomIndex][1]}
      ></TextWithLineBreaks>
      <br />
      {/* media */}
      {viewModel.shortBreakContentPool[randomIndex][2] !== "" && (
        // <iframe
        //   className="w-full rounded-lg aspect-video"
        //   // src={viewModel.shortBreakContentPool[randomIndex][2]}
        //   src={require(viewModel.shortBreakContentPool[randomIndex][2])}
        //   title="Break item iframe"
        //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        //   allowFullScreen
        // ></iframe>
        <img
          className="w-full rounded-lg"
          src={viewModel.shortBreakContentPool[randomIndex][2]}
          title="Break item image"
          alt=""
        ></img>
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
    <div data-testid="medium-break" className="max-w-2xl px-4 pb-4">
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
    <div data-testid="long-break" className="max-w-2xl px-4 pb-4">
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
