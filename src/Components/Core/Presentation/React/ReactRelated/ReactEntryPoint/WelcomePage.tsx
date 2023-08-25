import React from "react";
import LoginComponent from "~ReactComponents/WelcomePage/LoginComponent/LoginComponent";
import LearningWorldMenuButton from "~ReactComponents/WelcomePage/LearningWorldMenuButton/LearningWorldMenuButtonView";
import logo from "../../../../../../Assets/icons/00-engine-logo/adler-engine-logo.svg";
import HelpDeskButton from "~ReactComponents/GeneralComponents/HelpDeskButton/HelpDeskButton";
import HelpDeskModal from "~ReactComponents/GeneralComponents/HelpDeskModal/HelpDeskModal";

export default function WelcomePage() {
  return (
    <React.Fragment>
      <div className="grid h-[100svh] grid-cols-5 grid-rows-6 p-6 bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto">
        <LoginComponent className="z-10 col-start-1 row-start-1 portrait:self-start portrait:justify-self-start" />

        <HelpDeskButton className="col-start-5 row-start-1 justify-self-end" />
        <HelpDeskModal />

        <h1 className="self-end p-2 text-lg font-extrabold rounded-lg portrait:text-2xl portrait:row-start-1 portrait:row-span-1 portrait:col-start-1 portrait:col-span-5 landscape:col-span-2 landscape:col-start-4 landscape:row-start-1 text-adlerdarkblue lg:landscape:col-span-3 lg:landscape:col-start-2 xl:landscape:col-start-1 xl:landscape:col-span-5 lg:landscape:row-start-1 lg:p-5 justify-self-center lg:text-4xl 2xl:text-8xl">
          Willkommen bei AdLer!
        </h1>

        <LearningWorldMenuButton className="self-center gap-4 m-1 portrait:row-start-5 portrait:col-start-1 portrait:col-span-5 landscape:col-span-2 landscape:col-start-4 landscape:row-span-3 landscape:row-start-3 justify-self-center w-fit h-fit lg:landscape:col-span-3 lg:landscape:self-start lg:landscape:col-start-2 lg:landscape:row-start-6" />

        <div className="flex items-center justify-center portrait:row-start-2 portrait:row-span-3 portrait:col-start-2 portrait:col-span-3 landscape:col-span-3 landscape:col-start-1 landscape:row-span-4 landscape:row-start-1 lg:landscape:col-start-2 lg:landscape:col-span-3 lg:landscape:row-start-2 lg:Landscape:row-span-3">
          <img
            className="w-56 m-4 lg:w-3/6 2xl:w-4/12"
            src={logo}
            alt="Adler Logo"
          />
        </div>

        <p className="self-end p-2 text-xs text-center rounded-lg portrait:row-start-6 portrait:col-start-1 portrait:col-span-5 portrait:text-xs landscape:col-span-5 landscape:col-start-1 landscape:row-start-6 text-adlerdarkblue lg:text-md lg:font-semibold font-regular justify-self-center lg:landscape:row-start-6">
          © Projekt AdLer, Technische Hochschule Aschaffenburg, Hochschule für
          angewandte Wissenschaften Kempten, ZFH - Zentrum für Fernstudien im
          Hochschulverbund
        </p>
      </div>
    </React.Fragment>
  );
}
