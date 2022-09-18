import CustomDropdown from "../../ReactRelated/ReactBaseComponents/CustomDropdown";
import StyledButton from "../../ReactRelated/ReactBaseComponents/StyledButton";
import StyledContainer from "~ReactComponents/ReactRelated/ReactBaseComponents/StyledContainer";
import LoadSpaceButton from "~ReactComponents/GeneralComponents/LoadSpaceButton/LoadSpaceButton";
import FullscreenSwitch from "~ReactComponents/SpaceDisplay/FullscreenSwitch/FullscreenSwitch";
import DebugPanel from "~ReactComponents/SpaceDisplay/DebugPanel/DebugPanel";
import engineLogo from "../../../../../../Assets/icons/adLerEngine_flat_logo_simple.svg";

export default function LogoMenuBar() {
  return (
    <CustomDropdown
      headerPart={
        <StyledButton>
          <img
            src={engineLogo}
            className="lg:w-20 md:w-16 sm:w-14"
            alt="EngineLogo"
          ></img>
        </StyledButton>
      }
      initialOpen={true}
      useAsTriggerOnly={true}
    >
      <StyledContainer className="flex flex-col bg-transparent">
        <LoadSpaceButton />
        <FullscreenSwitch />
        <DebugPanel />
      </StyledContainer>
    </CustomDropdown>
  );
}
