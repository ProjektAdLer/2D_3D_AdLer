import logo from "../../../../../../Assets/icons/adler-engine.svg";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import LoadingScreenViewModel from "./LoadingScreenViewModel";
import ILoadingScreenController from "./ILoadingScreenController";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { Trans, useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import NarrativeFrameworkLoadingScreenContainer from "../NarrativeFrameworkLoadingScreenContainer/NarrativeFrameworkLoadingScreenContainer";

type LoadinScreenProps = {
  content: JSX.Element;
  i18nKeys: {
    namespace: string;
    button: string;
    onLoading?: string;
    onLoadingFinished?: string;
  };
  autoClose?: boolean;
};

export default function LoadingScreen(props: Readonly<LoadinScreenProps>) {
  const [viewModel, controller] = useBuilder<
    LoadingScreenViewModel,
    ILoadingScreenController
  >(BUILDER_TYPES.ILoadingScreenBuilder);
  const [isOpen] = useObservable<boolean>(viewModel?.isOpen);
  const [canClose] = useObservable<boolean>(viewModel?.isReadyToBeClosed);
  const { t: translate } = useTranslation(props.i18nKeys.namespace);

  const [autoClose] = useState(props.autoClose ? props.autoClose : false);
  const [loadingText, setLoadingText] = useState(
    props.i18nKeys.onLoading ? translate(props.i18nKeys.onLoading) : null,
  );
  const [externalLoadText] = useObservable<string>(viewModel?.loadStep);

  useEffect(() => {
    if (props.i18nKeys.onLoadingFinished && canClose) {
      setLoadingText(translate(props.i18nKeys.onLoadingFinished));
    }
  }, [canClose, props.i18nKeys.onLoadingFinished, translate]);

  useEffect(() => {
    if (autoClose && canClose) {
      controller.closeLoadingScreen();
    }
  }, [canClose, controller, autoClose]);

  useEffect(() => {
    if (externalLoadText) {
      setLoadingText(externalLoadText);
    }
  }, [externalLoadText]);

  if (!viewModel || !controller || !isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[20000] bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto flex justify-center items-center pb-24">
      <div className="grid w-full p-3 justify-center">
        <section className="flex items-center justify-center w-full gap-8 portrait:flex mobile-landscape:pt-10 xl:m-3 xl:mt-6">
          <img
            className="w-full xs:w-16 md:w-24 lg:w-32 xl:w-20 onek:w-32 twok:w-40 portrait:w-16 animate-wiggle place-self-end mobile-landscape:w-12 mobile-landscape:m-2"
            src={logo}
            alt="AdlerEngine Logo"
          />
          {loadingText && (
            <p className="text-sm font-bold lg:text-lg xl:text-2xl text-outline mobile-landscape:text-lg tablet-portrait:text-xl text-adlerdarkblue">
              {loadingText}
            </p>
          )}
        </section>

        {/* Loading screen content */}
        {!viewModel.loadingLocation.Value.includes("spacedisplay") &&
          props.content}
        {viewModel.loadingLocation.Value.includes("spacedisplay") && (
          <NarrativeFrameworkLoadingScreenContainer />
        )}

        {/* Loading screen controls */}

        <div className="flex flex-col items-center justify-center h-16 pt-16 portrait:pt-8 mobile-landscape:pt-4">
          {!canClose && (
            <div className="flex gap-1 border-4 border-white rounded-lg ">
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

          {canClose && !autoClose && (
            <section className="flex justify-center h-12">
              <StyledButton
                shape={"freeFloatCenter"}
                onClick={() => controller.closeLoadingScreen()}
                className="p-5 font-bold scale-60 lg:scale-90"
              >
                {translate(props.i18nKeys.button)}
              </StyledButton>
            </section>
          )}
        </div>
      </div>
      <div className="fixed flex flex-col items-center justify-center w-full gap-2 px-4 bottom-4">
        <p className="text-sm portrait:text-[10px] font-medium mobile-landscape:text-xs text-adlerdarkblue portrait:leading-normal">
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

        <p className="text-xs portrait:text-[8px] portrait:leading-normal mobile-landscape:text-2xs text-center">
          {translate("copyright", { ns: "start" })}
        </p>
      </div>
    </div>
  );
}
