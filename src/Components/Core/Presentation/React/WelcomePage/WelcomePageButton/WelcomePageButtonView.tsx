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
import React, { useEffect, useRef } from "react";

type WelcomePageButtonProps = {
  backgroundVideo: string;
  historyPath: string;
  label: string;
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

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setUserLoggedIn(getLoginStatusUseCase.execute().isLoggedIn);
  }, [getLoginStatusUseCase, setUserLoggedIn]);

  return (
    <StyledButton
      shape="freeFloatCenterNoPadding"
      containerClassName=" h-full portrait:w-1/2 aspect-square"
      onClick={() => history.push(props.historyPath)}
      disabled={!userLoggedIn}
      className={tailwindMerge(
        `relative !px-0 !py-0 flex flex-col items-center justify-end !w-full !h-full col-span-3 col-start-6 bg-cover`,
        props.backgroundVideo,
        props.className ?? "",
      )}
    >
      {userLoggedIn ? (
        <div className="w-full h-full flex justify-center align-center bg-gray-100 opacity-90 hover:opacity-100">
          <video
            ref={videoRef}
            src={props.backgroundVideo}
            onMouseEnter={() => videoRef.current?.play()}
            onMouseLeave={() => videoRef.current?.pause()}
            loop={true}
            className="object-cover w-full h-full"
          >
            <track kind="captions"></track>
          </video>
          <p className="absolute p-4 mx-auto font-bold rounded-lg !text-xs lg:text-2xl text-center bg-buttonbgblue lg:bottom-[42%] portrait:bottom-[20%] bottom-32 text-adlerdarkblue ">
            {props.label}
          </p>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center align-center bg-gray-100 opacity-90">
          <video
            ref={videoRef}
            src={props.backgroundVideo}
            className="object-cover w-full h-full grayscale"
          >
            <track kind="captions"></track>
          </video>
        </div>
      )}
    </StyledButton>
  );
}
