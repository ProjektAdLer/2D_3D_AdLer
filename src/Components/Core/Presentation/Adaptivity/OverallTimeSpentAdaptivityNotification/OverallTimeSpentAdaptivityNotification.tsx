import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import IOverallTimeSpentAdaptivityNotificationController from "./IOverallTimeSpentAdaptivityNotificationController";
import OverallTimeSpentAdaptivityNotificationViewModel from "./OverallTimeSpentAdaptivityNotificationViewModel";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import { OverallTimeSpentAdaptivityNotificationBreakType } from "src/Components/Core/Domain/Entities/Adaptivity/OverallTimeSpentAdaptivityNotificationEntity";
import { AdLerUIComponent } from "../../../Types/ReactTypes";
import tailwindMerge from "../../Utils/TailwindMerge";
import exampleBreakPicture from "../../../../../Assets/prototype/breakPictureExample.png";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import TextWithLineBreaks from "~ReactComponents/ReactRelated/ReactBaseComponents/TextWithLineBreaks";

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
      <StyledContainer
        className={
          tailwindMerge(`${className}`) +
          "flex flex-row-reverse bottom-1.5 right-1.5 bg-buttonbgblue rounded-lg"
        }
      >
        <StyledButton
          onClick={() => controller.closeBreakNotification()}
          className="w-8 h-8 p-1 text-xs roboto-black xl:w-10 xl:h-10 lg:w-10 lg:h-10 md:w-10 md:h-10 sm:w-10 sm:h-10"
        >
          X
        </StyledButton>
        <div
          className="flex flex-col items-center justify-center gap-2"
          onClick={() => controller.minimizeOrMaximizeBreakNotification()}
        >
          <p className="text-center underline">Pausenempfehlung</p>
          <p className="text-center">Klicke hier um mehr zu erfahren!</p>
        </div>
      </StyledContainer>
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
    <div data-testid="short-break" className="max-w-2xl px-4 pb-4">
      {/* title */}
      <p>{viewModel.shortBreakContentPool[randomIndex][0]}</p>
      {/* content */}
      <TextWithLineBreaks
        text={viewModel.shortBreakContentPool[randomIndex][1]}
      ></TextWithLineBreaks>
      <br />
      {/* media */}
      {viewModel.shortBreakContentPool[randomIndex][2] !== "" && (
        <iframe
          className="w-full rounded-lg aspect-video"
          src={viewModel.shortBreakContentPool[randomIndex][2]}
          title="Break Item Iframe"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
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
