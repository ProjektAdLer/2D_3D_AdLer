// Core/Presentation/React/LearningSpaceDisplay/SideBar/SideBarButton.tsx

import React from "react";
import { useTranslation } from "react-i18next";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import FullscreenSwitch from "~ReactComponents/LearningSpaceDisplay/FullscreenSwitch/FullscreenSwitch";
import HelpDeskButton from "~ReactComponents/GeneralComponents/HelpDeskButton/HelpDeskButton";
import HelpDeskModal from "~ReactComponents/GeneralComponents/HelpDeskModal/HelpDeskModal";
import { SideBarButtonConfig } from "./SideBarButtons";
import SideBarViewModel from "./SideBarViewModel";
import ISideBarController from "./ISideBarController";

interface SideBarButtonProps {
  button: SideBarButtonConfig;
  viewModel: SideBarViewModel;
  controller: ISideBarController;
}

export default function SideBarButton({
  button,
  viewModel,
  controller,
}: Readonly<SideBarButtonProps>) {
  const { t: translate } = useTranslation("learningSpace");

  const isDisabled = button.disabled ? button.disabled(viewModel) : false;

  const renderButtonContent = () => {
    if (button.isSpecialComponent) {
      switch (button.component) {
        case "FullscreenSwitch":
          return <FullscreenSwitch />;
        case "HelpDesk":
          return (
            <>
              <HelpDeskButton />
              <HelpDeskModal />
            </>
          );
        default:
          return null;
      }
    }

    return (
      <StyledButton
        onClick={() => controller[button.onClick]()}
        title={translate(button.tooltip).toString()}
        disabled={isDisabled}
      >
        <img src={button.icon} alt={button.id} />
      </StyledButton>
    );
  };

  return (
    <div className="flex h-20 min-h-[5rem] flex-col items-center justify-start">
      {renderButtonContent()}
      <div className="mt-1 flex w-full justify-center">
        <p className="text-outline min-h-[1.5rem] px-1 text-center text-2xs font-bold leading-tight text-adlerdarkblue">
          {translate(button.label)}
        </p>
      </div>
    </div>
  );
}
