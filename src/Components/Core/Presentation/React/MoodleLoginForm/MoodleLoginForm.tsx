import { useState } from "react";
import BUILDER_TYPES from "~DependencyInjection/Builders/BUILDER_TYPES";
import useBuilder from "~ReactComponents/ReactRelated/CustomHooks/useBuilder";
import useObservable from "../ReactRelated/CustomHooks/useObservable";
import StyledButton from "../ReactRelated/ReactBaseComponents/StyledButton";
import StyledContainer from "../ReactRelated/ReactBaseComponents/StyledContainer";
import StyledInputField from "../ReactRelated/ReactBaseComponents/StyledInputField";
import StyledModal from "../ReactRelated/ReactBaseComponents/StyledModal";
import StyledPasswordField from "../ReactRelated/ReactBaseComponents/StyledPasswordField";
import MoodleLoginFormController from "./MoodleLoginFormController";
import MoodleLoginFormViewModel from "./MoodleLoginFormViewModel";

export default function MoodleLoginForm() {
  const [viewModel, controller] = useBuilder<
    MoodleLoginFormViewModel,
    MoodleLoginFormController
  >(BUILDER_TYPES.IMoodleLoginFormBuilder);

  const [modalVisible, setModalVisible] = useObservable<boolean>(
    viewModel?.visible
  );

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  if (!viewModel || !controller) return null;

  const handleSubmit = async () => {
    await controller.loginAsync(userName, password);
  };

  return (
    <StyledModal
      title="Moodle Login"
      showModal={modalVisible}
      onClose={() => {
        setModalVisible(false);
      }}
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
