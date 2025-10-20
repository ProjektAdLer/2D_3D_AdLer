import HelpDeskModal from "~ReactComponents/GeneralComponents/HelpDeskModal/HelpDeskModal";
import logo from "../../../../../../Assets/icons/adler-engine.svg";
import MenuHeaderBar from "~ReactComponents/GeneralComponents/MenuHeaderBar/MenuHeaderBar";
import React from "react";
import PrivacyContent from "~ReactComponents/Privacy/PrivacyContent";

export default function Privacy() {
  return (
    <React.Fragment>
      <div className="flex h-[100dvh] flex-col overflow-hidden bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto mobile-landscape:h-[100dvh] mobile-landscape:w-[100dvw] portrait:h-[100dvh]">
        <MenuHeaderBar
          location="privacy"
          className="w-full flex-shrink-0 self-center px-2 font-semibold"
        />

        <PrivacyContent />

        <img
          className="absolute -bottom-3 -right-3 m-4 w-32 opacity-20"
          src={logo}
          alt="Adler Logo"
        />
      </div>

      <HelpDeskModal />
    </React.Fragment>
  );
}
