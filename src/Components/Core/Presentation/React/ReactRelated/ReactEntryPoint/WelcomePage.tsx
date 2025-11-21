import React, { useEffect } from "react";
import LoginComponent from "~ReactComponents/WelcomePage/SignInAndOutComponent/LoginComponent";
import logo from "../../../../../../Assets/icons/adler-engine.svg";
import welcomeVideo from "../../../../../../Assets/graphics/anim-adler-welcome.webm";
import welcomePicture from "../../../../../../Assets/graphics/welcome-screen-greeting.png";
import learningEngineStringImage from "../../../../../../Assets/graphics/learning-engine.png";
import avatarEditorStringImage from "../../../../../../Assets/graphics/avatar-editor.png";
import settingsIcon from "../../../../../../Assets/icons/settings.svg";
import privacyIcon from "../../../../../../Assets/icons/locked.svg";
import worldManagementIcon from "../../../../../../Assets/icons/world.svg";
import avatarButtonBackground from "../../../../../../Assets/misc/WelcomeScreenButtonBackgrounds/AvatarEditorButtonBackground.jpg";
import learningWorldMenuButtonBackground from "../../../../../../Assets/misc/WelcomeScreenButtonBackgrounds/LearningWorldButtonBackground.jpg";
import HelpDeskButton from "~ReactComponents/GeneralComponents/HelpDeskButton/HelpDeskButton";
import HelpDeskModal from "~ReactComponents/GeneralComponents/HelpDeskModal/HelpDeskModal";
import { useTranslation } from "react-i18next";
import LogoutComponent from "~ReactComponents/WelcomePage/SignInAndOutComponent/LogoutComponent";
import WelcomePageButton from "~ReactComponents/WelcomePage/WelcomePageButton/WelcomePageButtonView";
import LMSButton from "~ReactComponents/WelcomePage/LMSButton/LMSButtonView";
import learningWorldButtonBackgroundVideo from "../../../../../../Assets/misc/WelcomeScreenButtonBackgrounds/BackgroundVideoLernweltButton.mp4";
import avatarEditorButtonBackgroundVideo from "../../../../../../Assets/misc/WelcomeScreenButtonBackgrounds/BackgroundVideoAvatarEditorButton.mp4";
import { useInjection } from "inversify-react";
import ILoginUseCase from "src/Components/Core/Application/UseCases/Login/ILoginUseCase";
import ILoadAvatarConfigUseCase from "src/Components/Core/Application/UseCases/LoadAvatarConfig/ILoadAvatarConfigUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import StyledButton from "../ReactBaseComponents/StyledButton";
import history from "history/browser";
import CookieModal from "~ReactComponents/WelcomePage/CookieModal/CookieModal";
import WorldManagerModal from "~ReactComponents/LearningWorldMenu/WorldManagement/WorldManagerModal";
import WorldManagerModalViewModel from "~ReactComponents/LearningWorldMenu/WorldManagement/WorldManagerModalViewModel";
import type IWorldManagerModalController from "~ReactComponents/LearningWorldMenu/WorldManagement/IWorldManagerModalController";
import useBuilder from "../CustomHooks/useBuilder";

export default function WelcomePage() {
  const { t: translate } = useTranslation("start");
  const isFileBasedBackend =
    process.env.REACT_APP_USE_FILEBASED_BACKEND === "true";
  const loginUseCase = useInjection<ILoginUseCase>(USECASE_TYPES.ILoginUseCase);
  const loadAvatarConfigUseCase = useInjection<ILoadAvatarConfigUseCase>(
    USECASE_TYPES.ILoadAvatarConfigUseCase,
  );

  // WorldManager Modal
  const [worldManagerViewModel, worldManagerController] = useBuilder<
    WorldManagerModalViewModel,
    IWorldManagerModalController
  >(BUILDER_TYPES.IWorldManagerModalBuilder);

  // Automatic login in file-based backend mode
  useEffect(() => {
    if (isFileBasedBackend) {
      const performAutoLogin = async () => {
        try {
          await loginUseCase.executeAsync({
            username: "filebased",
            password: "filebased",
          });
          // Load avatar configuration after successful login
          await loadAvatarConfigUseCase.executeAsync();
        } catch (error) {
          console.error("Auto-login failed:", error);
        }
      };

      performAutoLogin();
    }
  }, [isFileBasedBackend, loginUseCase, loadAvatarConfigUseCase]);

  return (
    <div
      className="relative grid h-[100svh] grid-cols-8 grid-rows-6 bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto p-2 mobile-landscape:h-[100dvh] mobile-landscape:w-[100dvw] mobile-landscape:pb-1"
      data-testid="welcomepage"
    >
      <img
        className="absolute -bottom-3 -right-3 m-4 w-32 opacity-20"
        src={logo}
        alt="Adler Logo"
      />

      {/* WorldManager Button - Top Left (file-based backend only) */}
      {isFileBasedBackend && (
        <StyledButton
          shape="freeFloatCenter"
          containerClassName="w-full h-full"
          onClick={() => worldManagerController?.onOpenModal()}
          className="relative col-span-1 col-start-1 row-span-1 row-start-1 m-2 flex w-32 gap-2 2xl:w-44 mobile-portrait:w-24"
          title="Weltenverwaltung"
          data-testid="worldManagerButton"
        >
          <img
            className="w-8 lg:w-12 onek:w-14"
            src={worldManagementIcon}
            alt="icon"
          />
          <p className="text-2xs font-bold xl:text-sm 2xl:pl-2 2xl:text-lg">
            {translate("worldManagerButton")}
          </p>
        </StyledButton>
      )}

      {/* HelpDesk Button - Top Right */}
      <div className="col-start-8 row-start-1 flex gap-2 justify-self-end">
        <HelpDeskButton />
      </div>
      <HelpDeskModal />
      <CookieModal />

      {/* WorldManager Modal */}
      {worldManagerController && worldManagerViewModel && (
        <WorldManagerModal
          viewModel={worldManagerViewModel}
          controller={worldManagerController}
        />
      )}

      <section className="flex flex-col items-center text-adlerdarkblue tablet-portrait:col-span-8 tablet-portrait:col-start-1 portrait:col-span-6 portrait:col-start-2 portrait:row-span-2 portrait:row-start-1 portrait:mt-32 portrait:self-center landscape:col-span-6 landscape:col-start-2 landscape:row-start-1 lg:landscape:col-span-6 lg:landscape:col-start-2 lg:landscape:row-start-1 xl:landscape:col-span-6 xl:landscape:col-start-2">
        <video
          className="scale-75 lg:visible lg:-mb-16 mobile-landscape:hidden portrait:hidden"
          src={welcomeVideo}
          autoPlay
          loop
        >
          <track
            kind="captions"
            srcLang="en"
            src="path/to/captions.vtt"
            default
          />
        </video>
        <img
          className="mobile-landscape:w-88 w-64 lg:hidden mobile-landscape:block tablet-portrait:w-full"
          src={welcomePicture}
          alt="3D Welcome Text"
        />
        {!isFileBasedBackend && (
          <>
            <LoginComponent className="col-span-6 col-start-2 flex flex-col items-center justify-around lg:pt-8 xl:pt-3 mobile-landscape:pt-0 mobile-portrait:row-start-2 mobile-portrait:justify-start tablet-portrait:col-span-8 tablet-portrait:col-start-1" />
          </>
        )}
      </section>

      <section className="portrait-col-span-6 col-span-6 col-start-2 row-span-3 row-start-3 mb-4 flex items-center justify-center gap-4 md:mb-8 md:pt-4 mobile-landscape:mb-2 mobile-landscape:h-[75%] mobile-landscape:self-end mobile-portrait:mt-16 portrait:col-start-2 portrait:row-span-3 portrait:row-start-3 portrait:h-1/2 portrait:gap-6 portrait:self-center">
        <WelcomePageButton
          backgroundVideo={learningWorldButtonBackgroundVideo}
          backgroundPicture={learningWorldMenuButtonBackground}
          historyPath="/worldmenu"
          imageSrc={learningEngineStringImage}
          toolTip={translate("LearningWorldsToolTip").toString()}
          datatestid="worldmenu"
        />
        <WelcomePageButton
          backgroundVideo={avatarEditorButtonBackgroundVideo}
          backgroundPicture={avatarButtonBackground}
          historyPath="/avatarEditor"
          imageSrc={avatarEditorStringImage}
          toolTip={translate("AvatarEditorToolTip").toString()}
          datatestid="avatarEditor"
        />
      </section>

      {!isFileBasedBackend && (
        <LogoutComponent className="relative z-0 col-span-2 col-start-7 row-start-6 flex flex-col gap-2 self-end justify-self-end mobile-landscape:mb-10 mobile-portrait:mb-10" />
      )}

      {!isFileBasedBackend && (
        <LMSButton className="col-span-1 col-start-1 row-span-1 row-start-1 w-32 2xl:w-44 mobile-portrait:w-24" />
      )}

      <p className="lg:text-md row-start-6 self-end justify-self-center rounded-lg p-2 text-center text-2xs text-adlerdarkblue md:text-xs lg:col-span-4 lg:col-start-3 lg:font-semibold mobile-landscape:col-span-6 mobile-landscape:col-start-2 mobile-portrait:col-start-1 portrait:col-span-6 portrait:col-start-2 portrait:row-start-6 portrait:text-2xs">
        {translate("copyright")}
      </p>

      <div className="absolute bottom-8 left-4 flex flex-col gap-2 mobile-landscape:bottom-2 mobile-landscape:left-2 mobile-portrait:bottom-2 mobile-portrait:left-2 mobile-portrait:flex-col">
        <StyledButton
          className="!px-2 !py-1 text-xs font-bold mobile-portrait:!pr-0"
          onClick={() => {
            history.push("/privacy");
          }}
          icon={privacyIcon}
          data-testid="privacyButton"
          title={translate("privacyButtonToolTip").toString()}
          shape={"freeFloatCenter"}
        >
          <p className="mobile-portrait:hidden">{translate("privacyTitle")}</p>
        </StyledButton>
        <StyledButton
          className="!px-2 !py-1 text-xs font-bold mobile-portrait:!pr-0"
          onClick={() => {
            history.push("/settings");
          }}
          icon={settingsIcon}
          data-testid="settingsButton"
          title={translate("settingButtonToolTip").toString()}
          shape={"freeFloatCenter"}
        >
          <p className="mobile-portrait:hidden">{translate("settingTitle")}</p>
        </StyledButton>
      </div>
    </div>
  );
}
