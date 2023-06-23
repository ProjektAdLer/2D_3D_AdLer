import React from "react";
import logo from "../../../../../../Assets/icons/00-engine-logo/adler-engine-logo.svg";

export default function LoadingScreen() {
  return (
    <React.Fragment>
      <main className="grid w-screen h-screen grid-cols-6 grid-rows-5 bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto">
        <section className="flex items-center justify-center col-span-4 col-start-2 row-span-3 row-start-1 mt-24">
          <img
            className="w-32 m-4 xs:w-36 md:w-64 lg:w-72 xl:w-96 animate-wiggle"
            src={logo}
            alt="AdlerEngine Logo"
          />
        </section>

        <section className="self-end col-span-2 col-start-3 row-start-4 justify-self-center">
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
        </section>

        <section className="flex items-center self-center col-span-4 col-start-2 row-start-5 rounded-lg bg-buttonbgblue justify-self-center">
          <p className="p-4 text-xl font-medium text-center text-adlerdarkblue">
            Du willst mehr über das Projekt AdLer erfahren? Dann schau doch mal
            auf unserer{" "}
            <a
              target="_blank"
              href="https://projekt-adler.eu"
              title="AdLer Projekthomepage https://projekt-adler.eu"
              rel="noreferrer"
              className="underline text-nodehandlecolor"
            >
              Projekthomepage
            </a>{" "}
            vorbei.
          </p>
        </section>

        <p className="self-end col-span-6 col-start-1 row-start-6 p-2 mb-8 text-xs text-center rounded-lg text-adlerdarkblue lg:text-md lg:font-semibold font-regular justify-self-center">
          © Projekt AdLer, Technische Hochschule Aschaffenburg, Hochschule für
          angewandte Wissenschaften Kempten, ZFH - Zentrum für Fernstudien im
          Hochschulverbund
        </p>
      </main>
    </React.Fragment>
  );
}
