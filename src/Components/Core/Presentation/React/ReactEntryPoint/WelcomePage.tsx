import React from "react";
import { useNavigate } from "react-router-dom";
import StyledButton from "~ReactComponents/ReactBaseComponents/StyledButton";

import logo from "../../../../../Assets/icons/adLerEngine_flat_logo_simple.svg";

export interface IWelcomePageProps {}

// THIS IS A BIG TODO FOR ANOTHER TIME
const WelcomePage: React.FunctionComponent<IWelcomePageProps> = (props) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-5 grid-rows-5 max-h-[100vh] bg-adlerlightblue">
      <p className="self-center col-span-3 col-start-2 row-start-1 p-5 text-2xl font-extrabold text-white border-4 border-white rounded-lg lg:border-8 justify-self-center bg-adlergold text-shadow lg:text-4xl">
        Willkommen bei AdLer!
      </p>

      <p className="flex flex-col items-center justify-center col-start-3 row-start-5 gap-4">
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
        className="animate-pulse col-start-2 col-span-3 row-start-2 row-span-3 w-[70vh] h-[70vh] self-center justify-self-center"
        src={logo}
        alt="Adler Logo"
      />
    </div>
  );
};

export default WelcomePage;
