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
        `relative !px-0 !py-0 flex flex-col items-center justify-end !w-full !h-full col-span-3 col-start-6 bg-cover`,
        props.backgroundVideo,
        props.className ?? "",
      )}
    >
      {!props.isPlaceholder && userLoggedIn ? (
        <div className="relative flex justify-center w-full h-full bg-gray-100 align-center opacity-90 hover:opacity-100">
          <video
            ref={videoRef}
            src={props.backgroundVideo}
            onMouseEnter={() => videoRef.current?.play()}
            onMouseLeave={() => videoRef.current?.pause()}
            loop={true}
            muted={true}
            className="object-cover w-full h-full mobile-landscape:hidden"
            title={props.toolTip}
          >
            <track kind="captions"></track>
          </video>
          <img
            className="object-cover w-full h-full landscape:lg:hidden"
            ref={pictureRef}
            src={props.backgroundPicture}
            alt="Avatar Editor"
          />
          <img
            src={props.imageSrc}
            className="absolute p-4 mx-auto rounded-lg lg:bottom-[42%] portrait:bottom-[20%] mobile-landscape:bottom-6 bottom-32"
            alt={props.label}
            onMouseEnter={() => videoRef.current?.play()}
            onMouseLeave={() => videoRef.current?.pause()}
            title={props.toolTip}
          />
        </div>
      ) : (
        <div className="flex justify-center w-full h-full bg-gray-100 align-center opacity-90">
          <video
            ref={videoRef}
            src={props.backgroundVideo}
            className="object-cover w-full h-full grayscale"
            title={translate("DisabledButtonTooltip").toString()}
          >
            <track kind="captions"></track>
          </video>
        </div>
      )}
    </StyledButton>
  );
}
