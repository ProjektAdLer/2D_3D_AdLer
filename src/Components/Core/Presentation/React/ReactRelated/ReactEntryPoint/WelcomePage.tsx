import LoginComponent from "~ReactComponents/WelcomePage/SignInAndOutComponent/LoginComponent";
import logo from "../../../../../../Assets/icons/adler-engine.svg";
import welcomeVideo from "../../../../../../Assets/graphics/anim-adler-welcome.webm";
import welcomePicture from "../../../../../../Assets/graphics/welcome-screen-greeting.png";
import learningEngineIcon from "../../../../../../Assets/graphics/learning-engine.png";
import avatarEditorIcon from "../../../../../../Assets/graphics/avatar-editor.png";
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

export default function WelcomePage() {
  const { t: translate } = useTranslation("start");
  return (
    <div className="relative grid h-[100svh] grid-cols-8 grid-rows-6 bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto p-2 mobile-landscape:h-[100dvh] mobile-landscape:w-[100dvw] mobile-landscape:pb-1">
      <img
        className="absolute -bottom-3 -right-3 m-4 w-32 opacity-20"
        src={logo}
        alt="Adler Logo"
      />

      <HelpDeskButton className="col-start-8 row-start-1 justify-self-end" />
      <HelpDeskModal />

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
        <LoginComponent className="col-span-6 col-start-2 flex flex-col items-center justify-around lg:pt-8 xl:pt-3 mobile-landscape:pt-0 mobile-portrait:row-start-2 mobile-portrait:justify-start tablet-portrait:col-span-8 tablet-portrait:col-start-1" />
      </section>

      <section className="portrait-col-span-6 col-span-6 col-start-2 row-span-3 row-start-3 mb-4 flex items-center justify-center gap-4 md:mb-8 md:pt-4 mobile-landscape:mb-2 mobile-landscape:h-[75%] mobile-landscape:self-end mobile-portrait:mt-16 portrait:col-start-2 portrait:row-span-3 portrait:row-start-3 portrait:h-1/2 portrait:gap-6 portrait:self-center">
        <WelcomePageButton
          backgroundVideo={learningWorldButtonBackgroundVideo}
          backgroundPicture={learningWorldMenuButtonBackground}
          historyPath="/worldmenu"
          imageSrc={learningEngineIcon}
          toolTip={translate("LearningWorldsToolTip").toString()}
        />
        <WelcomePageButton
          backgroundVideo={avatarEditorButtonBackgroundVideo}
          backgroundPicture={avatarButtonBackground}
          historyPath="/avatarEditor"
          imageSrc={avatarEditorIcon}
          toolTip={translate("AvatarEditorToolTip").toString()}
        />
      </section>

      <LogoutComponent className="relative z-0 col-span-2 col-start-7 row-start-6 flex flex-col gap-2 self-end justify-self-end mobile-landscape:mb-10 mobile-portrait:mb-10" />

      {/* <CookieModal /> */}
      <LMSButton className="col-span-1 col-start-1 row-span-1 row-start-1 w-32 2xl:w-44 mobile-portrait:w-24" />

      <p className="lg:text-md row-start-6 self-end justify-self-center rounded-lg p-2 text-center text-2xs text-adlerdarkblue md:text-xs lg:col-span-4 lg:col-start-3 lg:font-semibold mobile-landscape:col-span-6 mobile-landscape:col-start-2 mobile-portrait:col-start-1 portrait:col-span-6 portrait:col-start-2 portrait:row-start-6 portrait:text-2xs">
        {translate("copyright")}
      </p>
    </div>
  );
}
