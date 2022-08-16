import CustomDropdown from "../ReactBaseComponents/CustomDropdown";
import StyledContainer from "../ReactBaseComponents/StyledContainer";
import MenuBar from "./MenuBar";

import engineLogo from "../../../../../Assets/icons/adLerEngine_flat_logo_simple.svg";

export default function LogoMenuBar() {
  return (
    <StyledContainer className="">
      <CustomDropdown
        headerElement={
          <img
            src={engineLogo}
            className="xl:w-20 lg:w-16 md:w-14 sm:w-12"
            alt="EngineLogo"
          ></img>
        }
        initialOpen={true}
        useAsTriggerOnly={true}
      >
        <MenuBar />
      </CustomDropdown>
    </StyledContainer>
  );
}
