import LoginComponent from "~ReactComponents/WelcomePage/LoginComponent/LoginComponent";
import LearningWorldMenuButton from "~ReactComponents/WelcomePage/LearningWorldMenuButton/LearningWorldMenuButtonView";
import logo from "../../../../../../Assets/icons/00-engine-logo/adler-engine-logo.svg";
//import learningRoomBg from "../../../../../../Assets/misc/WelcomeScreenButtonBackgrounds/LearningWorldButtonBackground.png";
import HelpDeskButton from "~ReactComponents/GeneralComponents/HelpDeskButton/HelpDeskButton";
import HelpDeskModal from "~ReactComponents/GeneralComponents/HelpDeskModal/HelpDeskModal";
import { useTranslation } from "react-i18next";
import StyledContainer from "../ReactBaseComponents/StyledContainer";
import StyledButton from "../ReactBaseComponents/StyledButton";
import StyledInputField from "../ReactBaseComponents/StyledInputField";
import StyledPasswordField from "../ReactBaseComponents/StyledPasswordField";

export default function WelcomePage() {
  const { t } = useTranslation("start");
  return (
    <div className="relative grid h-[100svh] grid-cols-8 grid-rows-6 p-6 bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto">
      <img
        className="absolute w-32 m-4 -bottom-3 -right-3 opacity-20"
        src={logo}
        alt="Adler Logo"
      />
      <LoginComponent className="relative z-0 flex flex-col self-end col-span-2 col-start-7 row-start-6 gap-2 justify-self-end" />

      <HelpDeskButton className="col-start-8 row-start-1 justify-self-end" />
      <HelpDeskModal />

      <section className="flex flex-col items-center portrait:row-start-1 portrait:row-span-1 portrait:col-start-2 portrait:col-span-6 landscape:col-span-6 landscape:col-start-2 landscape:row-start-1 text-adlerdarkblue lg:landscape:col-span-7 lg:landscape:col-start-1 xl:landscape:col-start-2 xl:landscape:col-span-6 lg:landscape:row-start-1">
        <h1 className="p-2 text-xl font-extrabold text-center justify-self-center portrait:text-xl lg:text-4xl 2xl:text-8xl">
          {t("welcome")}
        </h1>
        <p className="-mt-3 text-lg text-center portrait:text-xs">
          Loggen Sie sich zunächst in Moodle ein. Wählen Sie dann aus, wie es
          weitergehen soll.
        </p>
      </section>
      <h2 className="col-span-6 col-start-2 row-start-2 pt-2 text-xl font-extrabold text-center justify-self-center portrait:text-sm lg:text-xl text-adlerdarkblue portrait:row-start-1 portrait:self-end portrait:col-start-1 portrait:col-span-8">
        {t("moodleLoginSubheading")}
      </h2>
      {/* Folgende Section ist Platzhalter für den Moodle Login */}
      <section className="flex items-center justify-center col-span-6 col-start-2 row-start-2 gap-2 m-4 text-xl font-bold text-center rounded-lg portrait:self-end portrait:row-start-1 portrait:scale-50 portrait:col-start-1 portrait:col-span-8">
        <StyledInputField
          placeholder="Benutzername"
          className="text-adlerdarkblue"
        />
        <StyledPasswordField
          placeholder="Passwort"
          className="text-adlerdarkblue"
        />
        <StyledButton shape="freefloatcenter">
          <p>{t("loginButton")}</p>
        </StyledButton>
      </section>
      <section className="flex items-center justify-around col-span-6 col-start-2 row-span-3 row-start-3 mb-4 portrait:flex-col portrait:row-start-2 portrait:row-span-4 portrait:col-start-2 portrait:gap-6">
        <StyledContainer className="relative flex flex-col items-center justify-end !w-full !h-full col-span-3 col-start-6 bg-cover border-8 rounded-lg border-adlerdarkblue bg-learningworldbg">
          <div className="w-full h-full bg-black opacity-30 hover:opacity-20" />
          <LearningWorldMenuButton className="absolute mx-auto mb-4 bottom-3 portrait:scale-125" />
        </StyledContainer>
        <StyledContainer className="relative flex flex-col items-center justify-end !w-full !h-full col-span-3 col-start-6 bg-cover border-8 rounded-lg border-gray-600 bg-avatarcreatorbg">
          <div className="w-full h-full bg-black opacity-50" />
          <p className="absolute p-4 mx-auto text-2xl font-bold rounded-lg text-center bg-adlerbuttonlocked lg:bottom-[42%] portrait:bottom-[20%] portrait:text-lg bottom-32 text-adlerdeactivatedtext">
            Der Avatar Creator ist demnächst verfügbar!
          </p>
        </StyledContainer>
      </section>

      <p className="self-end p-2 text-xs text-center rounded-lg portrait:row-start-6 portrait:col-start-1 portrait:col-span-6 portrait:text-xs landscape:col-span-6 landscape:col-start-2 landscape:row-start-6 text-adlerdarkblue lg:text-md lg:font-semibold font-regular justify-self-center lg:landscape:row-start-6">
        {t("copyright")}
      </p>
    </div>
  );
}
