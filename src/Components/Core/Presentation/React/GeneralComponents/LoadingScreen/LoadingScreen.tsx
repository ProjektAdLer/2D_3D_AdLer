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
    <div className=" fixed top-0 left-0 w-screen h-screen z-[20000] bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto flex justify-center items-start">
      <div className="grid grid-rows-8 h-[85vh]">
        <section className="row-span-3 portrait:row-span-2 flex w-full justify-center items-center gap-8 portrait:gap-8 portrait:px-4">
          <img
            className="w-full m-4 xs:w-18 md:w-32 lg:w-36 xl:w-48 portrait:w-16 animate-wiggle"
            src={logo}
            alt="AdlerEngine Logo"
          />

          {viewModel.loadStep.Value && (
            <p className="text-sm">{viewModel.loadStep.Value}</p>
          )}
        </section>

        <div className="row-span-5 portrait:row-span-6 w-[85vw] max-w-6xl portrait:h-[70vh] flex flex-col ">
          <h1 className="pl-4 pb-1 font-bold">Steuerung</h1>
          <ControlsExplanationContent className="gap-4 bg-buttonbgblue p-4 rounded-xl" />
          <div className="w-full flex justify-center items-center pt-16 portrait:pt-4 ">
            {!canClose && (
              <section className="w-full h-12 flex justify-center content-center">
                <div className="flex scale-60 rounded-lg lg:scale-50 border-4 border-white">
                  <div className="w-10 h-10 mx-1 animate-loadtileone bg-adlerdarkblue"></div>
                  <div className="w-10 h-10 mx-1 animate-loadtiletwo bg-adlerdarkblue"></div>
                  <div className="w-10 h-10 mx-1 animate-loadtilethree bg-adlerdarkblue"></div>
                  <div className="w-10 h-10 mx-1 animate-loadtilefour bg-adlerdarkblue"></div>
                  <div className="w-10 h-10 mx-1 animate-loadtilefive bg-adlerdarkblue"></div>
                  <div className="w-10 h-10 mx-1 animate-loadtilesix bg-adlerdarkblue"></div>
                  <div className="w-10 h-10 mx-1 animate-loadtileseven bg-adlerdarkblue"></div>
                  <div className="w-10 h-10 mx-1 animate-loadtileeight bg-adlerdarkblue"></div>
                  <div className="w-10 h-10 mx-1 animate-loadtilenine bg-adlerdarkblue"></div>
                  <div className="w-10 h-10 mx-1 animate-loadtileten bg-adlerdarkblue"></div>
                </div>
              </section>
            )}

            {canClose && (
              <section className="w-full flex justify-center content-center h-12">
                <StyledButton
                  shape={"freefloatcenter"}
                  onClick={() => controller.closeLoadingScreen()}
                  className="p-5 scale-60 lg:scale-90"
                >
                  {translate("enterLearningSpace")}
                </StyledButton>
              </section>
            )}
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 w-full flex flex-col justify-center items-center gap-2 px-4">
        <p className="text-sm portrait:text-[10px] font-medium  text-adlerdarkblue">
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

        <p className="text-xs portrait:text-[8px]">
          {translate("copyright", { ns: "start" })}
        </p>
      </div>
    </div>
  );
}
