import { useState } from "react";
import useObservable from "../CustomHooks/useObservable";
import useViewModelControllerProvider from "../CustomHooks/useViewModelControllerProvider";
import StyledButton from "../ReactBaseComponents/StyledButton";
import StyledContainer from "../ReactBaseComponents/StyledContainer";
import StyledInputField from "../ReactBaseComponents/StyledInputField";
import StyledModal from "../ReactBaseComponents/StyledModal";
import StyledPasswordField from "../ReactBaseComponents/StyledPasswordField";
import MoodleLoginFormController from "./MoodleLoginFormController";
import MoodleLoginFormViewModel from "./MoodleLoginFormViewModel";

export default function MoodleLoginForm() {
  const [viewModels, controllers] = useViewModelControllerProvider<
    MoodleLoginFormViewModel,
    MoodleLoginFormController
  >(MoodleLoginFormViewModel);

  const [modalVisible, setModalVisible] = useObservable<boolean>(
    viewModels[0]?.visible
  );

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    await controllers[0].loginAsync(userName, password);
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

          <StyledButton
            className="flex justify-center"
            shape="free"
            onClick={handleSubmit}
          >
            <p>Login</p>
          </StyledButton>

          <StyledButton
            className="flex justify-center"
            shape="free"
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
