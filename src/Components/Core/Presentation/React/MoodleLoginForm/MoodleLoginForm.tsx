import { useState } from "react";
import useObservable from "../CustomHooks/useObservable";
import useViewModelControllerProvider from "../CustomHooks/useViewModelControllerProvider";
import StyledButton from "../ReactBaseComponents/StyledButton";
import StyledContainer from "../ReactBaseComponents/StyledContainer";
import StyledInputField from "../ReactBaseComponents/StyledInputField";
import StyledPasswordField from "../ReactBaseComponents/StyledPasswordField";
import MoodleLoginFormController from "./MoodleLoginFormController";
import MoodleLoginFormViewModel from "./MoodleLoginFormViewModel";

export default function MoodleLoginForm() {
  const [viewModels, controllers] = useViewModelControllerProvider<
    MoodleLoginFormViewModel,
    MoodleLoginFormController
  >(MoodleLoginFormViewModel);

  const [userToken] = useObservable<string>(viewModels[0]?.userToken);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <StyledContainer className="bg-adlergold bottom-0 left-0 flex">
      <div className="login-screen flex flex-col justify-center gap-2">
        <div className="app-title flex justify-center text-white lg:text-2xl font-bold">
          <h1>{viewModels[0]?.test.Value}</h1>
        </div>

        <StyledInputField
          placeholder="Nutzername"
          onChange={(newVal) => {
            setUserName(newVal.target.value);
          }}
        />

        <StyledPasswordField
          placeholder="Passwort"
          onChange={(newVal) => {
            setPassword(newVal.target.value);
          }}
        />

        <StyledButton
          onClick={async () => {
            await controllers[0].loginAsync(userName, password);
          }}
        >
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
      </div>
    </StyledContainer>
  );
}
