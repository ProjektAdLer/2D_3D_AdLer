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
    <div className="relative grid h-[100svh] mobile-landscape:w-[100dvw] mobile-landscape:h-[100dvh] grid-cols-8 grid-rows-6 mobile-landscape:pb-1 p-2 bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto">
      <img
        className="absolute w-32 m-4 -bottom-3 -right-3 opacity-20"
        src={logo}
        alt="Adler Logo"
      />

      <HelpDeskButton className="col-start-8 row-start-1 justify-self-end" />
      <HelpDeskModal />

      <section className="flex flex-col items-center portrait:row-start-1 portrait:row-span-2 portrait:self-center portrait:col-start-2 portrait:col-span-6 tablet-portrait:col-start-1 tablet-portrait:col-span-8 landscape:col-span-6 landscape:col-start-2 landscape:row-start-1 text-adlerdarkblue lg:landscape:col-span-6 lg:landscape:col-start-2 xl:landscape:col-start-2 xl:landscape:col-span-6 lg:landscape:row-start-1 mobile-portrait:mt-32 tablet-portrait:mt-32">
        <video
          className="scale-75 lg:-mb-16 portrait:hidden mobile-landscape:hidden"
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
          className="lg:landscape:hidden w-64 mobile-landscape:w-96 tablet-portrait:w-full mobile-landscape:block"
          src={welcomePicture}
          alt="3D Welcome Text"
        />
        <LoginComponent className="flex flex-col items-center justify-around col-span-6 col-start-2 tablet-portrait:col-start-1 tablet-portrait:col-span-8 xl:pt-2 lg:pt-8 mobile-portrait:row-start-2 mobile-portrait:justify-start mobile-landscape:pt-0" />
      </section>

      <section className="flex items-center justify-center col-span-6 col-start-2 row-span-3 row-start-3 gap-4 mb-4 portrait:h-1/2 mobile-landscape:h-[60%] mobile-landscape:self-end mobile-landscape:mb-2 portrait:row-start-3 portrait:row-span-3 portrait:col-start-2 portrait:self-center portrait-col-span-6 portrait:gap-6 md:mb-8 md:pt-4">
        <WelcomePageButton
          backgroundVideo={learningWorldButtonBackgroundVideo}
          backgroundPicture={learningWorldMenuButtonBackground}
          historyPath="/worldmenu"
          imageSrc={learningEngineIcon}
        />
        <WelcomePageButton
          backgroundVideo={avatarEditorButtonBackgroundVideo}
          backgroundPicture={avatarButtonBackground}
          historyPath="/avatarEditor"
          imageSrc={avatarEditorIcon}
        />
      </section>

      <LogoutComponent className="relative z-0 flex flex-col self-end col-span-2 col-start-7 row-start-6 gap-2 justify-self-end" />

      {/* <CookieModal /> */}
      <LMSButton className="w-32 mobile-portrait:w-28 col-start-1 row-start-1 col-span-1 row-span-1" />

      <p
        className="self-end p-2 text-2xs md:text-xs text-center rounded-lg portrait:row-start-6 portrait:col-start-1
       portrait:col-span-6 portrait:text-2xs mobile-landscape:text-2xs mobile-landscape:col-start-2 mobile-landscape:col-span-5 landscape:col-span-4 landscape:col-start-3 landscape:row-start-6 text-adlerdarkblue lg:text-md lg:font-semibold font-regular justify-self-center lg:landscape:row-start-6"
      >
        {translate("copyright")}
      </p>
    </div>
  );
}
