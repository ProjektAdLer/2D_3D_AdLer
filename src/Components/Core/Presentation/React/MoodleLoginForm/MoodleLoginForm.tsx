import { useEffect, useState } from "react";
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

  const [userToken] = useObservable<string>(viewModels[0]?.userToken);

  const [modalVisible, setModalVisible] = useObservable<boolean>(
    viewModels[0]?.visible
  );

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [debug_UserName, setDebug_UserName] = useState("");
  const [debug_Password, setDebug_Password] = useState("");
  // Used for Debug Values
  useEffect(() => {
    if (process.env.REACT_APP_IS_DEBUG === "true") {
      setDebug_UserName(process.env.REACT_APP_DEBUG_USERNAME || "");
      setDebug_Password(process.env.REACT_APP_DEBUG_PASSWORD || "");
      setUserName("test");
      setPassword("test");
      console.log(process.env.REACT_APP_DEBUG_USERNAME || "kaputt");
    }
  }, []);

  const handeSubmit = async () => {
    await controllers[0].loginAsync(userName, password);
  };

  return (
    <StyledModal
      showModal={modalVisible}
      onClose={() => {
        setModalVisible(false);
      }}
    >
      <StyledContainer className="bg-adlergold ">
        <form
          className="login-screen flex flex-col justify-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handeSubmit();
          }}
        >
          <div className="app-title flex justify-center text-white lg:text-2xl font-bold">
            <h1>In Moodle einloggen</h1>
          </div>

          <StyledInputField
            placeholder="Nutzername"
            defaultValue={debug_UserName}
            onChange={(newVal) => {
              setUserName(newVal.target.value);
            }}
          />

          <StyledPasswordField
            placeholder="Passwort"
            defaultValue={debug_Password}
            onChange={(newVal) => {
              setPassword(newVal.target.value);
            }}
          />

          <StyledButton onClick={handeSubmit}>
            <p>Login</p>
          </StyledButton>

          <StyledButton
            onClick={() => {
              alert("Hier kannst du bald dein neues Passwort bekommen!");
            }}
          >
            <p className="text-xs">Passwort vergessen?</p>
          </StyledButton>
          <h3>User-Token: {userToken}</h3>
        </form>
      </StyledContainer>
    </StyledModal>
  );
}
