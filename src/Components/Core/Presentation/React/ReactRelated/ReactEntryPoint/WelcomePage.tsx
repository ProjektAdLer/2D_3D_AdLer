import React from "react";
import { useNavigate } from "react-router-dom";
import MoodleLoginButton from "~ReactComponents/MoodleLoginButton/MoodleLoginButton";
import MoodleLoginForm from "~ReactComponents/MoodleLoginForm/MoodleLoginForm";
import StyledButton from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledButton";

import logo from "../../../../../../Assets/icons/adLerEngine_flat_logo_simple.svg";

export interface IWelcomePageProps {}

// THIS IS A BIG TODO FOR ANOTHER TIME
const WelcomePage: React.FunctionComponent<IWelcomePageProps> = (props) => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <div className="z-10">
        <MoodleLoginForm />
      </div>
      <div className="grid grid-cols-5 grid-rows-5 max-h-[100vh] bg-adlerlightblue p-6">
        <MoodleLoginButton />
        <p className="self-center col-span-2 col-start-4 row-start-1 p-2 text-xl font-extrabold text-white rounded-lg lg:col-span-3 lg:col-start-2 lg:row-start-1 lg:p-5 justify-self-center bg-adlergold text-shadow lg:text-4xl">
          Willkommen bei AdLer!
        </p>

        <p className="flex flex-col items-center justify-center col-span-2 col-start-4 row-span-3 row-start-2 gap-4 lg:col-span-3 lg:col-start-2 lg:row-start-5">
          <StyledButton
            shape="freefloatleft"
            onClick={() => navigate("/worldmenu")}
          >
            Gehe zum Lernraum Menü
          </StyledButton>
          <StyledButton shape="freefloatleft" onClick={() => navigate("/room")}>
            Gehe zum Lernraum
          </StyledButton>
        </p>
        <img
          className="col-start-1 row-start-1 col-span-3 row-span-4 m-4 lg:col-start-2 lg:col-span-3 lg:row-start-2 lg:row-span-3 w-[60vw] h-[60vh] self-center justify-self-center"
          src={logo}
          alt="Adler Logo"
        />
        <p className="self-end col-span-5 col-start-1 row-start-5 p-2 text-xs text-center text-white rounded-lg lg:text-lg lg:font-semibold lg:text-shadow-sm font-regular justify-self-center bg-adlergold">
          © Projekt AdLer, Technische Hochschule Aschaffenburg, Hochschule für
          angewandte Wissenschaften Kempten, ZFH - Zentrum für Fernstudien im
          Hochschulverbund
        </p>
      </div>
    </React.Fragment>
  );
};

export default WelcomePage;
