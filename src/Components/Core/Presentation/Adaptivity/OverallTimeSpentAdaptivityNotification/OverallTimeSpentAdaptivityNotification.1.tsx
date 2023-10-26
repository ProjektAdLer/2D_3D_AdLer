import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import IOverallTimeSpentAdaptivityNotificationController from "./IOverallTimeSpentAdaptivityNotificationController";
import OverallTimeSpentAdaptivityNotificationViewModel from "./OverallTimeSpentAdaptivityNotificationViewModel";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import { AdLerUIComponent } from "../../../Types/ReactTypes";
import tailwindMerge from "../../Utils/TailwindMerge";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import pauseIcon from "../../../../../Assets/icons/42-pause-icon/47-pause-icon-nobg.svg";
import { useEffect } from "react";
import { GetNotificationModalContents } from "./OverallTimeSpentAdaptivityNotification";

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

  let randomIndex = 0;

  useEffect(() => {
    randomIndex = Math.floor(Math.random());
  }, [viewModel?.showModal]);

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
      {GetNotificationModalContents(breakType, viewModel, randomIndex)}
    </StyledModal>
  );
}
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import IOverallTimeSpentAdaptivityNotificationController from "./IOverallTimeSpentAdaptivityNotificationController";
import OverallTimeSpentAdaptivityNotificationViewModel from "./OverallTimeSpentAdaptivityNotificationViewModel";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import { AdLerUIComponent } from "../../../Types/ReactTypes";
import tailwindMerge from "../../Utils/TailwindMerge";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import pauseIcon from "../../../../../Assets/icons/42-pause-icon/47-pause-icon-nobg.svg";
import { useEffect } from "react";
import { GetNotificationModalContents } from "./OverallTimeSpentAdaptivityNotification";

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

  let randomIndex = 0;

  useEffect(() => {
    randomIndex = Math.floor(Math.random());
  }, [viewModel?.showModal]);

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
      {GetNotificationModalContents(breakType, viewModel, randomIndex)}
    </StyledModal>
  );
}
