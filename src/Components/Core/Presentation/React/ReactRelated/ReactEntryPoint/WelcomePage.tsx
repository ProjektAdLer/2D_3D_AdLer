import LoginComponent from "~ReactComponents/WelcomePage/SignInAndOutComponent/LoginComponent";
import logo from "../../../../../../Assets/icons/adler-engine.svg";
import welcomeVideo from "../../../../../../Assets/graphics/anim-adler-welcome.webm";
import welcomePicture from "../../../../../../Assets/graphics/welcome-screen-greeting.png";
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
    <div className=" relative grid h-[100svh] mobile-landscape:w-[100dvw] mobile-landscape:h-[100dvh] grid-cols-8 grid-rows-6 p-2 bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto">
      <img
        className="absolute w-32 m-4 -bottom-3 -right-3 opacity-20"
        src={logo}
        alt="Adler Logo"
      />

      <HelpDeskButton className="col-start-8 row-start-1 justify-self-end" />
      <HelpDeskModal />

      <section className="flex flex-col items-center portrait:row-start-1 portrait:row-span-2 portrait:self-center portrait:col-start-2 portrait:col-span-6 tablet-portrait:col-start-1 tablet-portrait:col-span-8 landscape:col-span-6 landscape:col-start-2 landscape:row-start-1 text-adlerdarkblue lg:landscape:col-span-6 lg:landscape:col-start-2 xl:landscape:col-start-2 xl:landscape:col-span-6 lg:landscape:row-start-1 mobile-portrait:mt-10">
        {/*<h1 className="p-2 text-xl font-extrabold text-center landscape:hidden justify-self-center mobile-portrait:text-2xl tablet-portrait:text-8xl lg:text-4xl 2xl:text-6xl">
          {translate("welcome")}
        </h1>*/}
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
          className="lg:landscape:hidden w-64 tablet-portrait:w-full mobile-landscape:block"
          src={welcomePicture}
          alt="3D Welcome Text"
        />
        <LoginComponent className="flex flex-col items-center justify-around col-span-6 col-start-2 tablet-portrait:col-start-1 tablet-portrait:col-span-8 xl:pt-8 lg:pt-4" />
      </section>

      <section className="flex items-center justify-center col-span-6 col-start-2 row-span-3 row-start-3 gap-4 mb-4 portrait:h-3/4 mobile-landscape:items-end mobile-landscape:h-1/2 mobile-landscape:row-start-4 portrait:row-start-3 portrait:row-span-3 portrait:col-start-2 portrait:self-center portrait-col-span-6 portrait:gap-6">
        <WelcomePageButton
          backgroundVideo={learningWorldButtonBackgroundVideo}
          backgroundPicture={learningWorldMenuButtonBackground}
          historyPath="/worldmenu"
          label={translate("learningWorldButton")}
        />
        <WelcomePageButton
          backgroundVideo={avatarEditorButtonBackgroundVideo}
          backgroundPicture={avatarButtonBackground}
          historyPath="/avatarEditor"
          label={translate("avatarEditorButton")}
        />
      </section>

      <LogoutComponent className="relative z-0 flex flex-col self-end col-span-2 col-start-7 row-start-6 gap-2 justify-self-end" />

      {/* <CookieModal /> */}
      <LMSButton className="w-32 mobile-portrait:w-28 col-start-1 row-start-1 col-span-1 row-span-1" />

      <p
        className="self-end p-2 text-xs text-center rounded-lg portrait:row-start-6 portrait:col-start-1
       portrait:col-span-6 portrait:text-2xs mobile-landscape:col-start-2 mobile-landscape:col-span-5 landscape:col-span-4 landscape:col-start-3 landscape:row-start-6 text-adlerdarkblue lg:text-md lg:font-semibold font-regular justify-self-center lg:landscape:row-start-6"
      >
        {translate("copyright")}
      </p>
    </div>
  );
}
