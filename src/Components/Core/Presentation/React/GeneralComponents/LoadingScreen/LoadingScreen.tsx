import React from "react";
import logo from "../../../../../../Assets/icons/00-engine-logo/adler-engine-logo.svg";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import LoadingScreenViewModel from "./LoadingScreenViewModel";
import ILoadingScreenController from "./ILoadingScreenController";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { Trans, useTranslation } from "react-i18next";
import ControlsExplanationContent from "../ControlsExplanationModal/ControlsExplanationContent";

export default function LoadingScreen() {
  const [viewModel, controller] = useBuilder<
    LoadingScreenViewModel,
    ILoadingScreenController
  >(BUILDER_TYPES.ILoadingScreenBuilder);
  const [isOpen] = useObservable<boolean>(viewModel?.isOpen);
  const [canClose] = useObservable<boolean>(viewModel?.isReadyToBeClosed);
  const { t: translate } = useTranslation("learningSpace");

  if (!viewModel || !controller || !isOpen) return null;

  return (
    <div className=" fixed top-0 left-0 w-screen h-screen z-[20000] bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto flex justify-center items-center pb-24">
      <div className="grid max-h-[1000px]">
        <section className="row-span-2 portrait:row-span-2 grid grid-cols-2 portrait:flex w-full justify-center items-center gap-8 ">
          <img
            className="w-full m-4 xs:w-16 md:w-24 lg:w-32 xl:w-48 portrait:w-16 animate-wiggle place-self-end"
            src={logo}
            alt="AdlerEngine Logo"
          />

          {viewModel.loadStep.Value && (
            <p className="text-sm font-bold lg:text-lg xl:text-xl text-adlerdarkblue">
              {viewModel.loadStep.Value}
            </p>
          )}
        </section>

        <div className="row-span-4 w-[85vw] max-w-6xl portrait:h-[60vh] flex flex-col justify-center">
          <h1 className="pl-4 pb-1 font-bold text-adlerdarkblue">
            {translate("sidebar_controls")}
          </h1>
          <ControlsExplanationContent className="gap-4 bg-buttonbgblue p-4 rounded-xl" />
        </div>
        <div className="flex flex-col justify-center items-center pt-16 portrait:pt-8 h-16">
          {!canClose && (
            <div className="flex gap-1 rounded-lg border-4 border-white ">
              <div className="w-6 h-6 animateColor"></div>
              <div className="w-6 h-6 animateColor1"></div>
              <div className="w-6 h-6 animateColor2"></div>
              <div className="w-6 h-6 animateColor3"></div>
              <div className="w-6 h-6 animateColor4"></div>
              <div className="w-6 h-6 animateColor5"></div>
              <div className="w-6 h-6 animateColor6"></div>
              <div className="w-6 h-6 animateColor7"></div>
              <div className="w-6 h-6 animateColor8"></div>
              <div className="w-6 h-6 animateColor9"></div>
            </div>
          )}

          {canClose && (
            <section className="flex justify-center h-12">
              <StyledButton
                shape={"freeFloatCenter"}
                onClick={() => controller.closeLoadingScreen()}
                className="p-5 scale-60 lg:scale-90 font-bold"
              >
                {translate("enterLearningSpace")}
              </StyledButton>
            </section>
          )}
        </div>
      </div>
      <div className="fixed bottom-4 w-full flex flex-col justify-center items-center gap-2 px-4">
        <p className="text-sm portrait:text-[10px] font-medium  text-adlerdarkblue portrait:leading-normal">
          <Trans
            i18nKey="projectInformation"
            ns="learningSpace"
            components={[
              <a
                key={0}
                target="_blank"
                href="https://projekt-adler.eu"
                title={translate("linkInfo").toString()}
                rel="noreferrer"
                className="underline text-adleroceanblue hover:text-nodehandlecolor"
              >
                {}
              </a>,
            ]}
            values={{ homepageLink: translate("homepage") }}
          />
        </p>

        <p className="text-xs portrait:text-[8px] portrait:leading-normal">
          {translate("copyright", { ns: "start" })}
        </p>
      </div>
    </div>
  );
}
