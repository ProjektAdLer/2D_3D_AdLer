import React from "react";
import logo from "../../../../../../Assets/icons/00-engine-logo/adler-engine-logo.svg";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import LoadingScreenViewModel from "./LoadingScreenViewModel";
import ILoadingScreenController from "./ILoadingScreenController";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

export default function LoadingScreen() {
  const [viewModel, controller] = useBuilder<
    LoadingScreenViewModel,
    ILoadingScreenController
  >(BUILDER_TYPES.ILoadingScreenBuilder);
  const [isOpen] = useObservable<boolean>(viewModel?.isOpen);
  const [canClose] = useObservable<boolean>(viewModel?.isReadyToBeClosed);

  if (!viewModel || !controller || !isOpen) return null;

  return (
    <div className="absolute z-[20000]">
      <main className="grid w-screen h-screen grid-cols-6 grid-rows-5 bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto">
        <section className="z-20 flex items-center justify-center col-span-4 col-start-2 row-span-3 row-start-1 mt-24">
          <img
            className="w-32 m-4 xs:w-36 md:w-64 lg:w-72 xl:w-96 animate-wiggle"
            src={logo}
            alt="AdlerEngine Logo"
          />
        </section>
        <section className="z-10 flex flex-col items-center justify-center col-span-4 col-start-2 row-span-1 row-start-4 mb-10">
          {viewModel.loadStep.Value && <p>{viewModel.loadStep.Value}</p>}
        </section>

        {!canClose && (
          <section className="self-end col-span-2 col-start-3 row-start-4 justify-self-center">
            <div className="flex w-full border-4 border-white rounded-lg">
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
        )}
        {canClose && (
          <section className="self-end col-span-2 col-start-3 row-start-4 justify-self-center">
            <StyledButton
              shape={"freefloatcenter"}
              onClick={() => controller.closeLoadingScreen()}
              className="p-5"
            >
              Weiter zum Lernraum
            </StyledButton>
          </section>
        )}

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
              Projekt Homepage
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
    </div>
  );
}