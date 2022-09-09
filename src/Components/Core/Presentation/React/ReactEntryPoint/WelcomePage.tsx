import React from "react";
import { useNavigate } from "react-router-dom";
import StyledButton from "~ReactComponents/ReactBaseComponents/StyledButton";

import logo from "../../../../../Assets/icons/adLerEngine_flat_logo_simple.svg";

export interface IWelcomePageProps {}

// THIS IS A BIG TODO FOR ANOTHER TIME
const WelcomePage: React.FunctionComponent<IWelcomePageProps> = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      <p>This is the welcome page.</p>

      <p>
        <StyledButton
          shape="freefloatleft"
          onClick={() => navigate("/worldmenu")}
        >
          Go to Menu by onclick button
        </StyledButton>
        <StyledButton shape="freefloatleft" onClick={() => navigate("/room")}>
          Go to room by onclick button
        </StyledButton>
      </p>
      <img className="absolute w-full h-full" src={logo} alt="Adler Logo" />
    </div>
  );
};

export default WelcomePage;
