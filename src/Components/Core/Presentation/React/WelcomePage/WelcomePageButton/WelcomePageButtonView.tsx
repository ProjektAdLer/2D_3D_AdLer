import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import WelcomePageButtonViewModel from "./WelcomePageButtonViewModel";
import history from "history/browser";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import { useInjection } from "inversify-react";
import IGetLoginStatusUseCase from "src/Components/Core/Application/UseCases/GetLoginStatus/IGetLoginStatusUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

type WelcomePageButtonProps = {
  backgroundVideo: string;
  backgroundPicture: string;
  label?: string;
  historyPath: string;
  imageSrc: string;
  toolTip?: string;
  isPlaceholder?: boolean;
} & AdLerUIComponent;

export default function WelcomePageButton(props: WelcomePageButtonProps) {
  const [viewModel] = useBuilder<WelcomePageButtonViewModel, undefined>(
    BUILDER_TYPES.ILearningWorldMenuButtonBuilder,
  );
  const getLoginStatusUseCase = useInjection<IGetLoginStatusUseCase>(
    USECASE_TYPES.IGetLoginStatusUseCase,
  );

  const [userLoggedIn, setUserLoggedIn] = useObservable<boolean>(
    viewModel?.userLoggedIn,
  );

  const translate = useTranslation("start").t;

  const videoRef = useRef<HTMLVideoElement>(null);
  const pictureRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setUserLoggedIn(getLoginStatusUseCase.execute().isLoggedIn);
  }, [getLoginStatusUseCase, setUserLoggedIn]);

  return (
    <StyledButton
      shape="freeFloatCenterNoPadding"
      containerClassName="h-full portrait:w-1/2 mobile-landscape:w-1/3 aspect-square"
      onClick={() => history.push(props.historyPath)}
      disabled={props.isPlaceholder ?? !userLoggedIn}
      feedback="nothing"
      className={tailwindMerge(
        `relative col-span-3 col-start-6 flex !h-full !w-full flex-col items-center justify-end bg-cover !px-0 !py-0`,
        props.className ?? "",
      )}
      style={{
        backgroundImage: `url(${props.backgroundPicture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!props.isPlaceholder && userLoggedIn ? (
        <div className="align-center relative flex h-full w-full justify-center hover:opacity-100">
          <video
            ref={videoRef}
            src={props.backgroundVideo}
            onMouseEnter={() => videoRef.current?.play()}
            onMouseLeave={() => videoRef.current?.pause()}
            loop={true}
            muted={true}
            playsInline={true}
            preload="metadata"
            className="absolute inset-0 hidden h-full w-full bg-black object-cover lg:block"
            title={props.toolTip}
            style={{ backgroundColor: "black" }}
          >
            <track kind="captions"></track>
          </video>
          <img
            src={props.imageSrc}
            className="absolute bottom-32 z-10 mx-auto rounded-lg p-4 lg:bottom-[42%] mobile-landscape:bottom-6 portrait:bottom-[20%]"
            alt={props.label}
            onMouseEnter={() => videoRef.current?.play()}
            onMouseLeave={() => videoRef.current?.pause()}
            title={props.toolTip}
          />
        </div>
      ) : (
        <div
          className="align-center flex h-full w-full justify-center bg-gray-500 bg-opacity-60"
          style={{
            backgroundImage: `url(${props.backgroundPicture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <video
            ref={videoRef}
            src={props.backgroundVideo}
            className="absolute inset-0 hidden h-full w-full object-cover grayscale lg:block"
            title={translate("DisabledButtonTooltip").toString()}
            muted={true}
            playsInline={true}
          >
            <track kind="captions"></track>
          </video>
        </div>
      )}
    </StyledButton>
  );
}
