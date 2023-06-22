import React from "react";
import logo from "../../../../../../Assets/icons/00-engine-logo/adler-engine-logo.svg";

export default function LoadingScreen() {
  return (
    <React.Fragment>
      <main className="grid w-screen h-screen grid-cols-6 grid-rows-5 bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto">
        <div className="flex items-center justify-center col-span-4 col-start-2 row-span-3 row-start-1 mt-24">
          <img
            className="w-56 m-4 mt-24 lg:w-3/6 animate-wiggle"
            src={logo}
            alt="Adler Logo"
          />
        </div>
        <div className="self-start col-span-2 col-start-3 row-start-5 justify-self-center">
          <div className="flex w-full border-8 border-white rounded-lg">
            <div className="w-10 h-10 m-1 animate-loadtileone bg-adlerdarkblue"></div>
            <div className="w-10 h-10 m-1 animate-loadtiletwo bg-adlerdarkblue"></div>
            <div className="w-10 h-10 m-1 animate-loadtilethree bg-adlerdarkblue"></div>
            <div className="w-10 h-10 m-1 animate-loadtilefour bg-adlerdarkblue"></div>
            <div className="w-10 h-10 m-1 animate-loadtilefive bg-adlerdarkblue"></div>
            <div className="w-10 h-10 m-1 animate-loadtilesix bg-adlerdarkblue"></div>
            <div className="w-10 h-10 m-1 animate-loadtileseven bg-adlerdarkblue"></div>
            <div className="w-10 h-10 m-1 animate-loadtileeight bg-adlerdarkblue"></div>
            <div className="w-10 h-10 m-1 animate-loadtilenine bg-adlerdarkblue"></div>
            <div className="w-10 h-10 m-1 animate-loadtileten bg-adlerdarkblue"></div>
          </div>
        </div>

        <p className="self-end col-span-6 col-start-1 row-start-6 p-2 mb-8 text-xs text-center rounded-lg text-adlerdarkblue lg:text-md lg:font-semibold font-regular justify-self-center">
          © Projekt AdLer, Technische Hochschule Aschaffenburg, Hochschule für
          angewandte Wissenschaften Kempten, ZFH - Zentrum für Fernstudien im
          Hochschulverbund
        </p>
      </main>
    </React.Fragment>
  );
}
