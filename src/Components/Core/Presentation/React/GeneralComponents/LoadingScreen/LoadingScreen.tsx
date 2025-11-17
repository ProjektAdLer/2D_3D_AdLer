import logo from "../../../../../../Assets/icons/adler-engine.svg";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import LoadingScreenViewModel from "./LoadingScreenViewModel";
import ILoadingScreenController from "./ILoadingScreenController";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { Trans, useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

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
    <div
      className={
        "fixed left-0 top-0 z-[20000] flex h-screen w-screen items-center justify-center bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto " +
        viewModel.cursorState.Value
      }
    >
      <div className="flex h-full w-full max-w-full flex-col justify-between overflow-hidden p-4 mobile-landscape:p-2 mobile-portrait:p-2 tablet-portrait:p-3">
        {/* Header Section - Logo und Loading Text */}
        <section className="flex flex-shrink-0 items-center justify-center gap-4 pt-8 xl:gap-8 onek:gap-10 twok:gap-12 fourk:gap-16 mobile-landscape:gap-2 mobile-landscape:pt-2 mobile-portrait:gap-2 mobile-portrait:pt-4 tablet-portrait:gap-3 tablet-portrait:pt-6">
          <img
            className="h-12 w-12 animate-wiggle md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24 onek:h-28 onek:w-28 twok:h-32 twok:w-32 fourk:h-40 fourk:w-40 mobile-landscape:h-6 mobile-landscape:w-6 mobile-portrait:h-8 mobile-portrait:w-8 tablet-portrait:h-10 tablet-portrait:w-10"
            src={logo}
            alt="AdlerEngine Logo"
          />
          {loadingText && (
            <p className="text-outline text-sm font-bold text-adlerdarkblue md:text-base lg:text-lg xl:text-2xl onek:text-3xl twok:text-4xl fourk:text-5xl mobile-landscape:text-2xs mobile-portrait:text-2xs tablet-portrait:text-sm">
              {loadingText}
            </p>
          )}
        </section>

        {/* Content Section - Flexibel und scrollbar */}
        <div className="flex min-h-0 w-full max-w-full flex-1 items-center justify-center overflow-auto mobile-landscape:px-2 mobile-landscape:py-1 mobile-portrait:px-2 mobile-portrait:py-2 tablet-portrait:px-3 tablet-portrait:py-3">
          {props.content}
        </div>

        {/* Controls Section - Immer sichtbar am unten */}
        <div className="relative z-10 flex flex-shrink-0 flex-col items-center justify-center gap-4 pb-16 xl:pb-12 onek:pb-28 twok:pb-32 fourk:pb-40 mobile-landscape:gap-1 mobile-landscape:pb-12 mobile-portrait:gap-2 mobile-portrait:pb-20 tablet-portrait:gap-3 tablet-portrait:pb-20">
          {!canClose && (
            <div className="flex gap-1 rounded-lg border-2 border-white p-1 xl:gap-2 xl:p-2 onek:gap-3 onek:p-3 twok:gap-4 twok:p-4 fourk:gap-5 fourk:p-5 mobile-landscape:gap-0.5 mobile-landscape:border mobile-landscape:p-0.5 mobile-portrait:gap-0.5 mobile-portrait:border mobile-portrait:p-0.5 tablet-portrait:gap-1 tablet-portrait:p-1">
              <div className="animateColor h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7 onek:h-8 onek:w-8 twok:h-10 twok:w-10 fourk:h-12 fourk:w-12 mobile-landscape:h-2 mobile-landscape:w-2 mobile-portrait:h-3 mobile-portrait:w-3 tablet-portrait:h-3 tablet-portrait:w-3"></div>
              <div className="animateColor1 h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7 onek:h-8 onek:w-8 twok:h-10 twok:w-10 fourk:h-12 fourk:w-12 mobile-landscape:h-2 mobile-landscape:w-2 mobile-portrait:h-3 mobile-portrait:w-3 tablet-portrait:h-3 tablet-portrait:w-3"></div>
              <div className="animateColor2 h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7 onek:h-8 onek:w-8 twok:h-10 twok:w-10 fourk:h-12 fourk:w-12 mobile-landscape:h-2 mobile-landscape:w-2 mobile-portrait:h-3 mobile-portrait:w-3 tablet-portrait:h-3 tablet-portrait:w-3"></div>
              <div className="animateColor3 h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7 onek:h-8 onek:w-8 twok:h-10 twok:w-10 fourk:h-12 fourk:w-12 mobile-landscape:h-2 mobile-landscape:w-2 mobile-portrait:h-3 mobile-portrait:w-3 tablet-portrait:h-3 tablet-portrait:w-3"></div>
              <div className="animateColor4 h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7 onek:h-8 onek:w-8 twok:h-10 twok:w-10 fourk:h-12 fourk:w-12 mobile-landscape:h-2 mobile-landscape:w-2 mobile-portrait:h-3 mobile-portrait:w-3 tablet-portrait:h-3 tablet-portrait:w-3"></div>
              <div className="animateColor5 h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7 onek:h-8 onek:w-8 twok:h-10 twok:w-10 fourk:h-12 fourk:w-12 mobile-landscape:h-2 mobile-landscape:w-2 mobile-portrait:h-3 mobile-portrait:w-3 tablet-portrait:h-3 tablet-portrait:w-3"></div>
              <div className="animateColor6 h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7 onek:h-8 onek:w-8 twok:h-10 twok:w-10 fourk:h-12 fourk:w-12 mobile-landscape:h-2 mobile-landscape:w-2 mobile-portrait:h-3 mobile-portrait:w-3 tablet-portrait:h-3 tablet-portrait:w-3"></div>
              <div className="animateColor7 h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7 onek:h-8 onek:w-8 twok:h-10 twok:w-10 fourk:h-12 fourk:w-12 mobile-landscape:h-2 mobile-landscape:w-2 mobile-portrait:h-3 mobile-portrait:w-3 tablet-portrait:h-3 tablet-portrait:w-3"></div>
              <div className="animateColor8 h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7 onek:h-8 onek:w-8 twok:h-10 twok:w-10 fourk:h-12 fourk:w-12 mobile-landscape:h-2 mobile-landscape:w-2 mobile-portrait:h-3 mobile-portrait:w-3 tablet-portrait:h-3 tablet-portrait:w-3"></div>
              <div className="animateColor9 h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-7 xl:w-7 onek:h-8 onek:w-8 twok:h-10 twok:w-10 fourk:h-12 fourk:w-12 mobile-landscape:h-2 mobile-landscape:w-2 mobile-portrait:h-3 mobile-portrait:w-3 tablet-portrait:h-3 tablet-portrait:w-3"></div>
            </div>
          )}

          {canClose && !autoClose && (
            <StyledButton
              shape={"freeFloatCenter"}
              onClick={() => controller.closeLoadingScreen()}
              title={props.tooltip}
              className="relative z-20 font-bold"
              data-testid="loadingscreen-close"
            >
              {translate(props.i18nKeys.button)}
            </StyledButton>
          )}
        </div>
      </div>

      {/* Footer - Immer am unteren Rand */}
      <div className="absolute bottom-2 left-0 right-0 z-0 flex flex-col items-center justify-center gap-1 px-4 mobile-landscape:bottom-1 mobile-landscape:gap-0.5 mobile-landscape:px-2 mobile-portrait:bottom-1 mobile-portrait:gap-0.5 mobile-portrait:px-2 tablet-portrait:bottom-1 tablet-portrait:px-3">
        <p className="text-center text-xs font-medium text-adlerdarkblue xl:text-sm onek:text-base twok:text-lg fourk:text-xl mobile-landscape:text-2xs mobile-portrait:text-2xs tablet-portrait:text-2xs">
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

        <p className="text-center text-2xs xl:text-xs onek:text-sm twok:text-base fourk:text-lg mobile-landscape:text-2xs mobile-portrait:text-2xs tablet-portrait:text-2xs">
          {translate("copyright", { ns: "start" })}
        </p>
      </div>
    </div>
  );
}
