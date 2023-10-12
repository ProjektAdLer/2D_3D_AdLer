import { useState, useCallback, useEffect } from "react";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import tailwindMerge from "../../../Utils/TailwindMerge";

export default function InternetLossModal({ className }: AdLerUIComponent<{}>) {
  const [isOpen, setOpen] = useState<boolean>(false);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    window.navigator.onLine ? setOpen(false) : setOpen(true);
  }, []);

  window.addEventListener("offline", () => {
    setOpen(true);
  });
  window.addEventListener("online", () => {
    setOpen(false);
  });

  if (!isOpen) return null;
  return (
    <div className="z-50">
      <StyledModal
        title={"Internetverbindung verloren!"}
        onClose={closeModal}
        showModal={isOpen}
        className={tailwindMerge(className, "p-5 rounded-lg")}
      >
        <p className="m-1 my-4 font-bold text-adlerdarkblue">
          Die Verbindung ist verloren gegangen.
        </p>
        <p className="m-1 my-4 font-bold text-adlerdarkblue">
          Bitte überprüfe deine Internetverbindung.
        </p>
      </StyledModal>
    </div>
  );
}
