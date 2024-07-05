import ICookieModalController from "./ICookieModalController";
import CookieModalViewModel from "./CookieModalViewModel";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import { useTranslation } from "react-i18next";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";
import { useState } from "react";

export default function CookieModal() {
  const [viewModel, controller] = useBuilder<
    CookieModalViewModel,
    ICookieModalController
  >(BUILDER_TYPES.ICookieModalBuilder);
  const { t: translate } = useTranslation("start");

  const [showModal, setShowModal] = useState(true);

  if (!viewModel || !controller) return null;

  return (
    <StyledModal
      canClose={false}
      showModal={showModal}
      data-testid="cookieModal"
    >
      <div>
        <h1>{translate("cookieTitle")}</h1>
        <p>{translate("cookieText")}</p>

        <StyledButton
          data-testid="cookieDecline"
          onClick={() => {
            setShowModal(false);
            controller.decline();
          }}
        >
          {translate("cookieDecline")}
        </StyledButton>
        <StyledButton
          data-testid="cookieAcceptAll"
          onClick={() => {
            setShowModal(false);
            controller.accept();
          }}
        >
          {translate("cookieAcceptAll")}
        </StyledButton>
      </div>
    </StyledModal>
  );
}
