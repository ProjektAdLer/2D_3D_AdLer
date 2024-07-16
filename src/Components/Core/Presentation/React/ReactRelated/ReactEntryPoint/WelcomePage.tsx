import LoginComponent from "~ReactComponents/WelcomePage/SignInAndOutComponent/LoginComponent";
import logo from "../../../../../../Assets/icons/00-engine-logo/adler-engine-logo.svg";
//import learningRoomBg from "../../../../../../Assets/misc/WelcomeScreenButtonBackgrounds/LearningWorldButtonBackground.png";
import HelpDeskButton from "~ReactComponents/GeneralComponents/HelpDeskButton/HelpDeskButton";
import HelpDeskModal from "~ReactComponents/GeneralComponents/HelpDeskModal/HelpDeskModal";
import { useTranslation } from "react-i18next";
import LogoutComponent from "~ReactComponents/WelcomePage/SignInAndOutComponent/LogoutComponent";
import LearningWorldMenuButton from "~ReactComponents/WelcomePage/LearningWorldMenuButton/LearningWorldMenuButtonView";

export default function WelcomePage() {
  const { t: translate } = useTranslation("start");
  return (
    <div className=" relative grid h-[100svh] grid-cols-8 grid-rows-6 p-2 bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto">
      <img
        className="absolute w-32 m-4 -bottom-3 -right-3 opacity-20"
        src={logo}
        alt="Adler Logo"
      />

      <HelpDeskButton className="col-start-8 row-start-1 justify-self-end" />
      <HelpDeskModal />

      <section className="flex flex-col items-center portrait:row-start-1 portrait:row-span-1 portrait:col-start-2 portrait:col-span-6 landscape:col-span-6 landscape:col-start-2 landscape:row-start-1 text-adlerdarkblue lg:landscape:col-span-7 lg:landscape:col-start-1 xl:landscape:col-start-2 xl:landscape:col-span-6 lg:landscape:row-start-1">
        <h1 className="p-2 text-xl font-extrabold text-center justify-self-center portrait:text-xl lg:text-4xl 2xl:text-8xl">
          {translate("welcome")}
        </h1>
        {/* <p className="-mt-3 text-lg text-center portrait:text-xs">
          Loggen Sie sich zunächst in Moodle ein. Wählen Sie dann aus, wie es
          weitergehen soll.
        </p> */}
        <LoginComponent className="flex flex-col items-center justify-around col-span-6 col-start-2 xl:pt-8 lg:pt-4" />
      </section>

      <section className="flex items-center justify-around col-span-6 col-start-2 row-span-3 row-start-3 gap-4 mb-4 portrait:h-full portrait:flex-col portrait:row-start-3 portrait:row-span-3 portrait:col-start-2 portrait:gap-6">
        <LearningWorldMenuButton />
        {/*         <StyledButton
          disabled
          shape="freefloatcenter"
          containerClassName="w-full h-full"
          className="relative !px-0 !py-0 flex flex-col items-center justify-end !w-full !h-full col-span-3 col-start-6 bg-cover !bg-avatarcreatorbg"
        >
          <div className="w-full h-full bg-black opacity-50" />
          <p className="absolute p-4 mx-auto text-2xl font-bold rounded-lg text-center bg-adlerbuttonlocked lg:bottom-[42%] portrait:bottom-[20%] portrait:text-lg bottom-32 text-adlerdeactivatedtext">
            Der Avatar Creator ist demnächst verfügbar!
          </p>
        </StyledButton> */}
      </section>

      <LogoutComponent className="relative z-0 flex flex-col self-end col-span-2 col-start-7 row-start-6 gap-2 justify-self-end" />

      {/* <CookieModal /> */}

      <p className="self-end p-2 text-xs text-center rounded-lg portrait:row-start-6 portrait:col-start-1 portrait:col-span-6 portrait:text-xs landscape:col-span-4 landscape:col-start-3 landscape:row-start-6 text-adlerdarkblue lg:text-md lg:font-semibold font-regular justify-self-center lg:landscape:row-start-6">
        {translate("copyright")}
      </p>
    </div>
  );
}
