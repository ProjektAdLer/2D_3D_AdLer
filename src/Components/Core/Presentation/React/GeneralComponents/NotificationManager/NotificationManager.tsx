import {
  Message,
  NotificationType,
} from "src/Components/Core/Application/Ports/NotificationPort/INotificationAdapter";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import tailwindMerge from "../../../Utils/TailwindMerge";
import useObservable from "../../ReactRelated/CustomHooks/useObservable";
import StyledModal from "../../ReactRelated/ReactBaseComponents/StyledModal";
import NotificationManagerController from "./NotificationManagerController";
import NotificationManagerViewModel from "./NotificationManagerViewModel";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IGetSettingsConfigUseCase from "src/Components/Core/Application/UseCases/GetSettingsConfig/IGetSettingsConfigUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";

const breakNoticeSoundLink = require("../../../../../../Assets/Sounds/BreakNotice.mp3");

export default function NotificationManager({
  className,
  ...restProps
}: AdLerUIComponent<{ [x: string]: any }>) {
  const [viewModel] = useBuilder<
    NotificationManagerViewModel,
    NotificationManagerController
  >(BUILDER_TYPES.IModalManagerBuilder);

  const [notifications, setNotifications] = useObservable<Message[]>(
    viewModel?.messages,
  );

  const { t: translate } = useTranslation("helpMenu");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    const settings = CoreDIContainer.get<IGetSettingsConfigUseCase>(
      USECASE_TYPES.IGetSettingsConfigUseCase,
    ).execute();
    audioRef.current = new Audio(breakNoticeSoundLink);
    audioRef.current.volume = settings.volume ?? 0.5;
  }, []);

  // Play sound when notifications appear
  useEffect(() => {
    if (notifications && notifications.length > 0 && audioRef.current) {
      audioRef.current.play();
    }
  }, [notifications]);

  if (notifications == null || notifications.length === 0) return null;

  const getTypeString = (type: NotificationType) => {
    switch (type) {
      case LogLevelTypes.ERROR:
        return "Error";
      case LogLevelTypes.WARN:
        return "Warning";
    }
  };

  return (
    <StyledModal
      className={tailwindMerge(className)}
      showModal={notifications?.length > 0}
      title={getTypeString(notifications[notifications.length - 1].type)}
      onClose={() => {
        const remainingNotifications = [...notifications];
        remainingNotifications.pop();
        setNotifications(remainingNotifications);
      }}
      closeButtonToolTip={translate("closeToolTip").toString()}
      {...restProps}
    >
      {notifications[notifications.length - 1].message}
    </StyledModal>
  );
}
