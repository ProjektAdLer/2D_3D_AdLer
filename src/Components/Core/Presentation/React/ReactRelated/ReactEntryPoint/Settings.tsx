import HelpDeskButton from "~ReactComponents/GeneralComponents/HelpDeskButton/HelpDeskButton";
import HelpDeskModal from "~ReactComponents/GeneralComponents/HelpDeskModal/HelpDeskModal";
import logo from "../../../../../../Assets/icons/adler-engine.svg";

export default function Settings() {
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

      <HelpDeskButton className="col-start-8 row-start-1 justify-self-end" />
      <HelpDeskModal />
    </div>
  );
}
