import ICookieModalController from "./ICookieModalController";
import CookieModalViewModel from "./CookieModalViewModel";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import StyledModal from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledModal";
import { Trans, useTranslation } from "react-i18next";
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
      title={translate("cookieTitle").toString()}
      data-testid="cookieModal"
    >
      <div className="max-w-6xl">
        <p>{<Trans i18nKey="cookieText" ns="start" />}</p>

        <div className="flex justify-end gap-2">
          <StyledButton
            shape="freeFloatCenter"
            data-testid="cookieDecline"
            title={translate("cookieTitle").toString()}
            onClick={() => {
              setShowModal(false);
              controller.decline();
            }}
          >
            {translate("cookieDecline")}
          </StyledButton>
          <StyledButton
            shape="freeFloatCenter"
            data-testid="cookieAcceptAll"
            title={translate("cookieTitle").toString()}
            onClick={() => {
              setShowModal(false);
              controller.accept();
            }}
          >
            {translate("cookieAcceptAll")}
          </StyledButton>
        </div>
      </div>
    </StyledModal>
  );
}
