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
      containerClassName="w-full lg:w-1/2 h-full"
      onClick={() => history.push(props.historyPath)}
      disabled={!userLoggedIn}
      className={tailwindMerge(
        `relative !px-0 !py-0 flex flex-col items-center justify-end !w-full !h-full col-span-3 col-start-6 bg-cover`,
        props.backgroundVideo,
        props.className ?? "",
      )}
    >
      {userLoggedIn ? (
        <>
          <video
            ref={videoRef}
            src={props.backgroundVideo}
            onMouseEnter={() => videoRef.current?.play()}
            onMouseLeave={() => videoRef.current?.pause()}
            loop
            className="w-full h-full object-cover"
          ></video>
          <p className="absolute p-4 mx-auto text-2xl font-bold rounded-lg text-center bg-buttonbgblue lg:bottom-[42%] portrait:bottom-[20%] portrait:text-lg bottom-32 text-adlerdarkblue ">
            {props.label}
          </p>
        </>
      ) : (
        <>
          <video
            ref={videoRef}
            src={props.backgroundVideo}
            className="w-full h-full object-cover grayscale"
          ></video>
        </>
      )}
    </StyledButton>
  );
}
