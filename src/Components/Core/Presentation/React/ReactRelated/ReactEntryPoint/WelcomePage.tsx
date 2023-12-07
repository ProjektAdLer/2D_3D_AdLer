import LoginComponent from "~ReactComponents/WelcomePage/LoginComponent/LoginComponent";
import LearningWorldMenuButton from "~ReactComponents/WelcomePage/LearningWorldMenuButton/LearningWorldMenuButtonView";
import logo from "../../../../../../Assets/icons/00-engine-logo/adler-engine-logo.svg";
import learningRoomBg from "../../../../../../Assets/misc/WelcomeScreenButtonBackgrounds/LearningWorldButtonBackground.png";
import HelpDeskButton from "~ReactComponents/GeneralComponents/HelpDeskButton/HelpDeskButton";
import HelpDeskModal from "~ReactComponents/GeneralComponents/HelpDeskModal/HelpDeskModal";
import { useTranslation } from "react-i18next";
import StyledContainer from "../ReactBaseComponents/StyledContainer";
import StyledButton from "../ReactBaseComponents/StyledButton";

export default function WelcomePage() {
  const { t } = useTranslation("start");
  return (
    <div className="relative grid h-[100svh] grid-cols-8 grid-rows-6 p-6 bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto">
      <img
        className="absolute w-32 m-4 -bottom-3 -right-3 opacity-20"
        src={logo}
        alt="Adler Logo"
      />
      <LoginComponent className="z-0 flex flex-col col-span-2 col-start-1 row-start-5 gap-2 portrait:self-start portrait:justify-self-start" />

      <HelpDeskButton className="col-start-8 row-start-1 justify-self-end" />
      <HelpDeskModal />

      <h1 className="p-2 text-lg font-extrabold rounded-lg portrait:text-2xl portrait:row-start-1 portrait:row-span-1 portrait:col-start-1 portrait:col-span-5 landscape:col-span-2 landscape:col-start-4 landscape:row-start-1 text-adlerdarkblue lg:landscape:col-span-7 lg:landscape:col-start-2 xl:landscape:col-start-2 xl:landscape:col-span-6 lg:landscape:row-start-1 lg:p-5 justify-self-center lg:text-4xl 2xl:text-8xl">
        {t("welcome")}
      </h1>
      {/* Folgende Section ist Platzhalter für den Moodle Login */}
      <section className="flex items-center justify-center col-span-2 col-start-1 row-span-3 row-start-2 text-xl font-bold text-center bg-red-400 rounded-lg">
        Moodle Login Platzhalter
      </section>
      <section className="flex items-center justify-around col-span-6 col-start-3 row-span-4 row-start-2">
        <StyledContainer className="relative flex flex-col items-center justify-end !w-full !h-full col-span-3 col-start-6 bg-cover border-8 rounded-lg border-adlerdarkblue bg-learningworldbg">
          <div className="w-full h-full bg-black opacity-30 hover:opacity-20" />
          <LearningWorldMenuButton className="absolute mx-auto mb-4 bottom-3" />
        </StyledContainer>
        <StyledContainer className="relative flex flex-col items-center justify-end !w-full !h-full col-span-3 col-start-6 bg-contain border-8 rounded-lg border-gray-600 bg-avatarcreatorbg">
          <div className="w-full h-full bg-black opacity-50" />
          <p className="absolute p-4 mx-auto text-2xl font-bold rounded-lg bg-adlerbuttonlocked lg:bottom-[50%] bottom-32 text-adlerdeactivatedtext">
            Demnächst verfügbar!
          </p>
          {/* Button ist Platzhalter für kommenden Avatar-Creator Button */}
          <StyledButton
            shape="freefloatleft"
            disabled
            className="absolute mx-auto mb-4 bottom-3"
          >
            Gehe zum Avatar-Creator
          </StyledButton>
        </StyledContainer>
      </section>

      <p className="self-end p-2 text-xs text-center rounded-lg portrait:row-start-6 portrait:col-start-1 portrait:col-span-5 portrait:text-xs landscape:col-span-8 landscape:col-start-1 landscape:row-start-6 text-adlerdarkblue lg:text-md lg:font-semibold font-regular justify-self-center lg:landscape:row-start-6">
        {t("copyright")}
      </p>
    </div>
  );
}
