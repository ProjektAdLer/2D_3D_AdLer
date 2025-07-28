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
  tooltip?: string;
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
    <div className="fixed left-0 top-0 z-[20000] flex h-screen w-screen items-center justify-center bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto pb-24">
      <div className="grid w-full justify-center p-3">
        <section className="flex w-full items-center justify-center gap-8 xl:m-3 xl:mt-6 mobile-landscape:pt-10 portrait:flex">
          <img
            className="xs:w-16 w-full animate-wiggle place-self-end md:w-24 lg:w-32 xl:w-20 onek:w-32 twok:w-40 mobile-landscape:m-2 mobile-landscape:w-12 portrait:w-16"
            src={logo}
            alt="AdlerEngine Logo"
          />
          {loadingText && (
            <p className="text-outline text-sm font-bold text-adlerdarkblue lg:text-lg xl:text-2xl mobile-landscape:text-lg tablet-portrait:text-xl">
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

        <div className="flex h-16 flex-col items-center justify-center pt-16 xl:pt-4 mobile-landscape:pt-4 portrait:pt-8">
          {!canClose && (
            <div className="flex gap-1 rounded-lg border-4 border-white">
              <div className="animateColor h-6 w-6"></div>
              <div className="animateColor1 h-6 w-6"></div>
              <div className="animateColor2 h-6 w-6"></div>
              <div className="animateColor3 h-6 w-6"></div>
              <div className="animateColor4 h-6 w-6"></div>
              <div className="animateColor5 h-6 w-6"></div>
              <div className="animateColor6 h-6 w-6"></div>
              <div className="animateColor7 h-6 w-6"></div>
              <div className="animateColor8 h-6 w-6"></div>
              <div className="animateColor9 h-6 w-6"></div>
            </div>
          )}

          {canClose && !autoClose && (
            <section className="flex h-12 justify-center">
              <StyledButton
                shape={"freeFloatCenter"}
                onClick={() => controller.closeLoadingScreen()}
                className="scale-60 p-5 font-bold lg:scale-90 xl:p-1"
                title={props.tooltip}
              >
                {translate(props.i18nKeys.button)}
              </StyledButton>
            </section>
          )}
        </div>
      </div>
      <div className="fixed bottom-4 flex w-full flex-col items-center justify-center gap-2 px-4">
        <p className="text-sm font-medium text-adlerdarkblue mobile-landscape:text-xs portrait:text-[10px] portrait:leading-normal">
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
                className="text-adleroceanblue underline hover:text-nodehandlecolor"
              >
                {}
              </a>,
            ]}
            values={{ homepageLink: translate("homepage") }}
          />
        </p>

        <p className="text-center text-xs mobile-landscape:text-2xs portrait:text-[8px] portrait:leading-normal">
          {translate("copyright", { ns: "start" })}
        </p>
      </div>
    </div>
  );
}
