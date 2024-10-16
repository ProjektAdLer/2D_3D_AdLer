import React, { useState } from "react";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import StyledContainer from "../../ReactRelated/ReactBaseComponents/StyledContainer";
import StyledInputField from "../../ReactRelated/ReactBaseComponents/StyledInputField";
import StyledModal from "../../ReactRelated/ReactBaseComponents/StyledModal";
import StyledPasswordField from "../../ReactRelated/ReactBaseComponents/StyledPasswordField";
import ILoginComponentController from "./ILoginComponentController";
import LoginComponentViewModel from "./LoginComponentViewModel";
import { useTranslation } from "react-i18next";

export default function LoginModal(props: {
  viewModel: LoginComponentViewModel;
  controller: ILoginComponentController;
}) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useObservable<boolean>(
    props.viewModel.modalVisible
  );
  const [loginFailed] = useObservable<boolean>(props.viewModel.loginFailed);

  const { t } = useTranslation("start");

  const handleSubmit = React.useCallback(() => {
    props.controller.login(userName, password);
  }, [props.controller, userName, password]);

  return (
    <StyledModal
      title={t("loginTitle").toString()}
      showModal={modalVisible}
      onClose={() => setModalVisible(false)}
    >
      <StyledContainer className="bg-gradient-to-br from-adlerbggradientfrom to-adlerbggradientto">
        <form
          className="flex flex-col justify-center gap-2 login-screen"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <StyledInputField
            placeholder={t("userName").toString()}
            defaultValue={userName}
            onChange={(newVal) => {
              setUserName(newVal.target.value);
            }}
          />

          <StyledPasswordField
            placeholder={t("password").toString()}
            defaultValue={password}
            onChange={(newVal) => {
              setPassword(newVal.target.value);
            }}
          />

          {loginFailed && (
            <div className="bg-red-100 rounded-lg">
              <p className="m-1 text-xs font-bold text-center text-red-500">
                {t("loginFail")}
              </p>
              <p className="m-1 text-xs font-bold text-center text-red-500">
                {t("loginFailAdvise")}
              </p>
            </div>
          )}

          <StyledButton shape="freefloatcenter" onClick={handleSubmit}>
            <p>{t("loginButton")}</p>
          </StyledButton>

          {/* <StyledButton
            disabled={true}
            shape="freefloatcenter"
            onClick={() => {
              alert("Hier kannst du bald dein neues Passwort bekommen!");
            }}
          >
            <p className="text-xs">Passwort vergessen?</p>
          </StyledButton> */}
        </form>
      </StyledContainer>
    </StyledModal>
  );
}
