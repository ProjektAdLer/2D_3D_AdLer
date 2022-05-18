import StyledButton from "../ReactBaseComponents/StyledButton";
import StyledContainer from "../ReactBaseComponents/StyledContainer";
import StyledInputField from "../ReactBaseComponents/StyledInputField";
import StyledPasswordField from "../ReactBaseComponents/StyledPasswordField";

export default function MoodleLoginForm() {
  return (
    <StyledContainer className="top-0 right-0 flex">
      <div className="login-screen flex flex-col justify-center gap-2">
        <div className="app-title flex justify-center text-white lg:text-2xl font-bold">
          <h1>Moodle Login</h1>
        </div>

        <StyledInputField></StyledInputField>

        <StyledPasswordField></StyledPasswordField>

        <StyledButton
          onClick={() => {
            alert("Du wirst nun in moodle angemeldet!");
          }}
        >
          <p>Login</p>
        </StyledButton>

        <StyledButton
          onClick={() => {
            alert("Dann mach' dir e' neuesch du Saubeidel!");
          }}
        >
          <p className="text-xs">
            Bruda! <br></br> Du hasch dein <br></br> Passwort vergesse?!
          </p>
        </StyledButton>
      </div>
    </StyledContainer>
  );
}
