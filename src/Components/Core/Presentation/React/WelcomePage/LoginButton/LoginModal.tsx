import React from "react";
import { useState } from "react";
import useObservable from "~ReactComponents/ReactRelated/CustomHooks/useObservable";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import StyledContainer from "../../ReactRelated/ReactBaseComponents/StyledContainer";
import StyledInputField from "../../ReactRelated/ReactBaseComponents/StyledInputField";
import StyledModal from "../../ReactRelated/ReactBaseComponents/StyledModal";
import StyledPasswordField from "../../ReactRelated/ReactBaseComponents/StyledPasswordField";
import ILoginButtonController from "./ILoginButtonController";
import LoginButtonViewModel from "./LoginButtonViewModel";

export default function LoginModal(props: {
  viewModel: LoginButtonViewModel;
  controller: ILoginButtonController;
}) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useObservable<boolean>(
    props.viewModel.modalVisible
  );

  const handleSubmit = React.useCallback(async () => {
    await props.controller.loginAsync(userName, password);
  }, [userName, password]);

  return (
    <StyledModal
      title="Moodle Login"
      showModal={modalVisible}
      onClose={() => setModalVisible(false)}
    >
      <StyledContainer className="bg-adlergold ">
        <form
          className="flex flex-col justify-center gap-2 login-screen"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <StyledInputField
            placeholder="Nutzername"
            defaultValue={userName}
            onChange={(newVal) => {
              setUserName(newVal.target.value);
            }}
          />

          <StyledPasswordField
            placeholder="Passwort"
            defaultValue={password}
            onChange={(newVal) => {
              setPassword(newVal.target.value);
            }}
          />

          <StyledButton shape="freefloatcenter" onClick={handleSubmit}>
            <p>Login</p>
          </StyledButton>

          <StyledButton
            shape="freefloatcenter"
            onClick={() => {
              alert("Hier kannst du bald dein neues Passwort bekommen!");
            }}
          >
            <p className="text-xs">Passwort vergessen?</p>
          </StyledButton>
        </form>
      </StyledContainer>
    </StyledModal>
  );
}
