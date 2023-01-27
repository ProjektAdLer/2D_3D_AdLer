import React from "react";
import LoginButton from "~ReactComponents/WelcomePage/LoginButton/LoginButton";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import useIsMobilePortrait from "~ReactComponents/ReactRelated/CustomHooks/useIsMobilePortrait";
import WorldMenuButton from "~ReactComponents/WelcomePage/WorldMenuButton/WorldMenuButtonView";
import logo from "../../../../../../Assets/icons/00-engine-logo/adler-engine-logo.svg";

export default function WelcomePage() {
  return (
    <React.Fragment>
      <div className="grid h-0 min-h-screen grid-cols-5 grid-rows-5 p-6 bg-adlerblue-200">
        <div className="z-10 col-start-1 row-start-1">
          <LoginButton />
        </div>

        <p className="self-center col-span-2 col-start-4 row-start-1 p-2 text-lg font-extrabold text-white rounded-lg lg:col-span-3 lg:col-start-2 lg:row-start-1 lg:p-5 justify-self-center bg-adlergold text-shadow lg:text-4xl">
          Willkommen bei AdLer!
        </p>

        <div className="flex flex-col items-center justify-center col-span-2 col-start-4 row-span-3 row-start-2 gap-4 m-1 lg:col-span-3 lg:col-start-2 lg:row-start-5">
          <WorldMenuButton />
        </div>

        <div className="flex items-center justify-center col-span-3 col-start-1 row-span-4 row-start-1 lg:col-start-2 lg:col-span-3 lg:row-start-2 lg:row-span-3">
          <img
            className="w-56 max-h-full m-4 lg:w-3/6"
            src={logo}
            alt="Adler Logo"
          />
        </div>

        <p className="self-end col-span-5 col-start-1 row-start-5 p-2 text-xs text-center text-black rounded-lg lg:text-md lg:font-semibold font-regular justify-self-center bg-adlergold">
          © Projekt AdLer, Technische Hochschule Aschaffenburg, Hochschule für
          angewandte Wissenschaften Kempten, ZFH - Zentrum für Fernstudien im
          Hochschulverbund
        </p>
      </div>

      <StyledModal canClose={false} showModal={useIsMobilePortrait()}>
        <div className="text-lg font-bold text-white text-shadow-sm">
          <h1>
            Die AdLer Engine ist für den<br></br>
            Landscape Modus konzipiert.<br></br>
            Bitte nimm dein Smartphone quer.<br></br>
            Danke!
          </h1>
        </div>
      </StyledModal>
    </React.Fragment>
  );
}
