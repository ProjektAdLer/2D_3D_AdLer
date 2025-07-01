import { useState, useCallback, useEffect } from "react";
import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import tailwindMerge from "../../../Utils/TailwindMerge";
import { useTranslation } from "react-i18next";

export default function InternetLossModal({ className }: AdLerUIComponent<{}>) {
  const { t: translate } = useTranslation(["internetLoss", "helpMenu"]);
  const [isOpen, setOpen] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    window.navigator.onLine ? closeModal() : openModal();
    window.addEventListener("offline", openModal);
    window.addEventListener("online", closeModal);

    return () => {
      window.removeEventListener("offline", openModal);
      window.removeEventListener("online", closeModal);
    };
  }, [openModal, closeModal]);

  if (!isOpen) return null;
  return (
    <div className="z-50">
      <StyledModal
        title={"Internetverbindung verloren!"}
        onClose={closeModal}
        showModal={isOpen}
        className={tailwindMerge(className, "p-5 rounded-lg")}
        closeButtonToolTip={translate("closeToolTip").toString()}
      >
        <p className="m-1 my-4 font-bold text-adlerdarkblue">
          {translate("info")}
        </p>
        <p className="m-1 my-4 font-bold text-adlerdarkblue">
          {translate("advise")}
        </p>
      </StyledModal>
    </div>
  );
}
